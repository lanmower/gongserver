<?php

namespace api\controllers;

use api\components\Cors;
use api\models\User;
use api\models\GoogleToken;
use filsh\yii2\oauth2server\controllers\DefaultController;
use filsh\yii2\oauth2server\models\OauthAccessTokens;

use Firebase\JWT\JWT;
use yii;

class OauthController extends DefaultController
{
    public function init(){
        parent::init();
        $this->module = Yii::$app->getModule('oauth2');
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return yii\helpers\ArrayHelper::merge(parent::behaviors(), [
            'corsFilter' => [
                'class' => Cors::className(), // some custom config inside the class
                    "cors"=>[
                        'Origin' => ['http://gong:3000'],
                        'Access-Control-Allow-Credentials' => true,
                        'Access-Control-Request-Headers' => ['Content-Type','Authorization']
                    ]
            ]
        ]);
    }

    public function actionLogin() {
        $user = User::find($_POST['username'])->one();
        if($user->validatePassword($_POST['password'])) {
            $private_key = file_get_contents('id_rsa');
            $client_id   = 'TestClient';
            $user_id     = $user->id;
            $grant_type  = 'urn:ietf:params:oauth:grant-type:jwt-bearer';
            $jwt = this.generateJWT($private_key, $client_id, $user_id, 'https://gong');
        }

        passthru("curl https://api.mysite.com/token -d 'grant_type=$grant_type&assertion=$jwt'");
    }


    public function actionToken() {
        $return = parent::actionToken();
        $connection = Yii::$app->getDb();
        if(isset($return['refresh_token'])) {
            unset($return['refresh_token']);
        }
        if(isset($return['access_token'])) {
            $command = $connection->createCommand('
                SELECT user_id
                FROM oauth_access_tokens
                WHERE access_token = :access_token', [':access_token' => $return['access_token']]);

            $result = $command->queryOne();
            $return['roles'] = [];
            foreach( \Yii::$app->authManager->getRolesByUser($result['user_id']) as $role) {
                $return['roles'][] = $role->name;
            }
        }
        return $return;
    }
    public function actionLogout() {
        $request = Yii::$app->getRequest();
        $authHeader = $request->getHeaders()->get('Authorization');
        if ($authHeader !== null && preg_match("/^Bearer\\s+(.*?)$/", $authHeader, $matches)) {
            $token = OauthAccessTokens::find()->where(['access_token' => $matches[1]])->one();
            if($token) {
                $cookies = Yii::$app->response->cookies;
                $cookies->remove('auth');
                $token->delete();
                return $token;
            }
        }
        throw new yii\web\UnauthorizedHttpException('Unauthorized request.', 401);
    }

    protected function generateAccessToken()
    {
        $tokenLen = 40;
        if (@file_exists('/dev/urandom')) { // Get 100 bytes of random data
            $randomData = file_get_contents('/dev/urandom', false, null, 0, 100) . uniqid(mt_rand(), true);
        } else {
            $randomData = mt_rand() . mt_rand() . mt_rand() . mt_rand() . microtime(true) . uniqid(mt_rand(), true);
        }

        return substr(hash('sha512', $randomData), 0, $tokenLen);
    }

    public function actionStore() {
        $code = $_POST['code'];
        $client = new \Google_Client();
        $client->setClientId(Yii::$app->params['GClientID']);
        $client->setClientSecret(Yii::$app->params['GClientSecret']);
        $client->setRedirectUri(Yii::$app->params['redirect_uri']);
        $client->setAccessType('offline');
        $client->authenticate($_POST['code']);
        $access_token = yii\helpers\Json::decode($client->getAccessToken());

        $ticket = $client->verifyIdToken($access_token['id_token']);
        $ticketData = $ticket->getAttributes()['payload'];
        if($ticketData['email']) {
            $user = User::find()->where('email = :email', [':email' => $ticketData['email']])->one();
            //store google token
            $token = null;//GoogleToken::find(['user_id' => $user->id])->one();
            if (!$token) {
                $token = new GoogleToken();
            }
            $token->attributes = $access_token;
            $token->user_id = $user->id;
            $token->save();
            $code = $this->generateAccessToken();
            $data = [':access_token'=>$code, ':client_id'=>"testclient", ':expires'=> date( "Y-m-d H:i:s", time()+4*60*60 ), ':user_id'=>$user->id, ':scope'=>'custom'];
            \Yii::$app->db->createCommand('INSERT INTO oauth_access_tokens (access_token, client_id, user_id, expires, scope) VALUES (:access_token, :client_id, :user_id, :expires, :scope)', $data)->execute();
            $roles = [];
            foreach( \Yii::$app->authManager->getRolesByUser($user->id) as $role) {
                $roles[] = $role->name;
            }
            return ['access_token'=>$code, 'expires'=> 3600, 'roles'=>$roles];
        } else {
            return false;
        }
    }

    /**
     * Exchange an authorization code for OAuth 2.0 credentials.
     *
     * @param String $authorizationCode Authorization code to exchange for OAuth 2.0
     *                                  credentials.
     * @return String Json representation of the OAuth 2.0 credentials.
     * @throws CodeExchangeException An error occurred.
     */
    function exchangeCode($authorizationCode) {
        try {
            $CLIENT_ID = "669341428356-e1mvt5nrvietmq1hl5lpqv4kacs1s2oe.apps.googleusercontent.com";
            $CLIENT_SECRET = "6am8AfnKsyeUoYV97W6bnBzu";
            $client = new Google_Client();
            $client->setClientId($CLIENT_ID);
            $client->setClientSecret($CLIENT_SECRET);
            $_GET['code'] = $authorizationCode;
            return $client->authenticate();
        } catch (Google_Auth_Exception $e) {
            print 'An error occurred: ' . $e->getMessage();
            throw new CodeExchangeException(null);
        }
    }

    public function actionOptions()
    {
       Yii::$app->getResponse()->getHeaders()->set('Allow', implode(', ', ['OPTIONS', 'POST']));
    }

}
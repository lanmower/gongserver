<?php

namespace api\controllers;

use api\components\Cors;
use filsh\yii2\oauth2server\controllers\DefaultController;
use filsh\yii2\oauth2server\models\OauthAccessTokens;
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
                'class' => Cors::className() // some custom config inside the class
            ]
        ]);
    }

    public function actionToken() {
        $ret = parent::actionToken();
        $cookies = Yii::$app->response->cookies;

        $cookies->add(new \yii\web\Cookie(['name'=>'auth', 'value'=>$ret,'httpOnly'=>true]));

        return $ret;
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

    public function actionOptions()
    {
       Yii::$app->getResponse()->getHeaders()->set('Allow', implode(', ', ['OPTIONS', 'POST']));
    }

}
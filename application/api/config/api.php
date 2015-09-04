<?php
return [
    'id' => 'app-api',
	'name' => '',

    'controllerNamespace' => 'api\controllers',
	'defaultRoute' => 'product',
    'components' => [
        'authManager' => [
            'class' => 'yii\rbac\DbManager',
        ],
		'urlManager' => [
			'enablePrettyUrl' => true,
            'rules' => [
                'OPTIONS /oauth2/<action:\w+>' => 'oauth/options',
                'POST /oauth2/<action:\w+>' => 'oauth/<action>',
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/post',
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/page',
                    'pluralize' => false,
                ],
				[
					'class' => 'yii\rest\UrlRule',
					'controller' => 'v1/product',
					'extraPatterns' => [
						'GET custom' => 'custom',
						'GET protected' => 'protected',
					],
				],
			]
		],
		'request' => [
            'enableCookieValidation' => false,
			'parsers' => [
				'application/json' => 'yii\web\JsonParser',
			]
		],
		'response' => [
			'class' => 'yii\web\Response',
			'formatters' => [
				yii\web\Response::FORMAT_HTML => '\api\components\HtmlResponseFormatter',
			],
			'on beforeSend' => function (\yii\base\Event $event) {
				/** @var \yii\web\Response $response */
				$response = $event->sender;
				// catch situation, when no controller hasn't been loaded
				// so no filter wasn't loaded too. Need to understand in which format return result
				if(empty(Yii::$app->controller)) {
					$content_neg = new \yii\filters\ContentNegotiator();
					$content_neg->response = $response;
					$content_neg->formats = Yii::$app->params['formats'];
					$content_neg->negotiate();
				}
				if ($response->data !== null && Yii::$app->request->get('suppress_response_code')) {
					$response->data = [
						'success' => $response->isSuccessful,
						'data' => $response->data,
					];
					$response->statusCode = 200;
				}
			},
		],
		'user' => [
			'identityClass' => 'api\models\User',
			'loginUrl' => null,
			'enableSession' => false
        ],
    ],
    'params' => [],
    'modules' => [
        'oauth2' => [
            'class' => 'filsh\yii2\oauth2server\Module',
            'options' => [
                'token_param_name' => 'access_token',
                'access_lifetime' => 3600 * 24
            ],
            'storageMap' => [
                'user_credentials' => 'api\models\User'
            ],
            'grantTypes' => [
                'jwt_bearer' => [
                    'class' => 'OAuth2\GrantType\JwtBearer',
                ],
                'user_credentials' => [
                    'class' => 'OAuth2\GrantType\UserCredentials'
                ],
            ],
        ],
        'v1' => [
            'class' => 'api\versions\v1\Module',
        ],

    ],
    //'modules' => ['gii'=>['class' => 'yii\gii\Module']]
];

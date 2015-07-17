<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-m2m',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log','gii'],
    'modules' => ['gii' => 'yii\gii\Module'],
    'controllerNamespace' => 'm2m\controllers',
    'components' => [
        'db'=>require(__DIR__ . '/mysql.php'),
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'request' => [
            'cookieValidationKey' => 'almagestfraternite',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'urlManager' => [
        						'class' => 'yii\web\UrlManager',
        						// Disable index.php
        						'showScriptName' => false,
        						// Disable r= routes
        						'enablePrettyUrl' => true,
        						'rules' => array (
                                        ['class' => 'yii\rest\UrlRule',
                                            'controller' => 'site',
                                            'extraPatterns' => ['GET test' => 'test'],
                                            //'extraPatterns' => ['OPTIONS test' => 'options']
                                        ],
                                        'GET site/test'=>'site/test',
                                        'site/test'=>'site/allow',
                                        ['class' => 'yii\rest\UrlRule',
                                            'controller' => 'post',
                                            'extraPatterns' => ['GET search' => 'search']
                                        ],
                                        ['class' => 'yii\rest\UrlRule',
                                            'controller' => 'page',
                                            'extraPatterns' => ['GET search' => 'search']
                                        ],
        								'<controller:\w+>/<id:\d+>' => '<controller>/view',
        								'<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
        								'<controller:\w+>/<action:\w+>' => '<controller>/<action>',
        								'/<module:backend>/debug/default/toolbar' => 'debug/default/toolbar',
        								'/' => 'site/index',
        						)
        				],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
    ],
    'params' => $params,
];

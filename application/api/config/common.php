<?php
Yii::setAlias('api', dirname(__DIR__));
$params = require(__DIR__ . '/params.php');
return [
	'version' => "0.0.0",
    'basePath' => dirname(__DIR__),
	'timeZone' => 'Europe/Kiev',

	'vendorPath' => dirname(dirname(dirname(__DIR__))) . '/vendor',

	'bootstrap' => ['log'],
    'components' => [
		'db' => [
			'class' => 'yii\db\Connection',
			'dsn' => 'mysql:host=localhost;dbname=api',
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
		],
		'authManager' => [
			'class' => 'yii\rbac\DbManager',
		],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error','trace','info','warning'],
                ],
            ],
        ],
    ],
    'params' => $params,
];

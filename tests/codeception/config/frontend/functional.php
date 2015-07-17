<?php
$_SERVER['SCRIPT_FILENAME'] = m2m_ENTRY_FILE;
$_SERVER['SCRIPT_NAME'] = m2m_ENTRY_URL;

/**
 * Application configuration for m2m functional tests
 */
return yii\helpers\ArrayHelper::merge(
    require(YII_APP_BASE_PATH . '/common/config/main.php'),
    require(YII_APP_BASE_PATH . '/common/config/main-local.php'),
    require(YII_APP_BASE_PATH . '/m2m/config/main.php'),
    require(YII_APP_BASE_PATH . '/m2m/config/main-local.php'),
    require(dirname(__DIR__) . '/config.php'),
    require(dirname(__DIR__) . '/functional.php'),
    require(__DIR__ . '/config.php'),
    [
    ]
);

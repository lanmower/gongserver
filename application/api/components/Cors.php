<?php
/**
 * Created by PhpStorm.
 * @author Ihor Karas <ihor@karas.in.ua>
 */

namespace api\components;


class Cors extends \yii\filters\Cors
{
    public $cors = [
        'Origin'=>['http://gong:3000'],
        'Access-Control-Request-Headers' => ['Content-Type', 'Authorization'],
        'Access-Control-Allow-Credentials' => true,
        'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    ];
}
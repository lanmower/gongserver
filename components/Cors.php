<?php
/**
 * Created by PhpStorm.
 * @author Ihor Karas <ihor@karas.in.ua>
 */

namespace app\components;


class Cors extends \yii\filters\Cors
{
    public $cors = [
        'Origin'=>['http://localhost:3000'],
        'Access-Control-Request-Headers' => ['Content-Type', 'Authorization'],
        'Access-Control-Allow-Credentials' => true,
        'Access-Control-Request-Method' => ['POST','GET','PUT', 'PATCH'],
    ];
}
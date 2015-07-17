<?php
namespace m2m\controllers;

use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class PageController extends ActiveController
{
public $modelClass = 'm2m\models\Page';

    public function verbs() {
        $verbs = [
            'search'   => ['GET']
        ];
        return array_merge(parent::verbs(), $verbs);
    }

    public function actions() {

        $actions = [
            'search' => [
                'class'       => 'm2m\actions\SearchAction',
                'modelClass'  => $this->modelClass,
                'params'      => \Yii::$app->request->get()
            ],
        ];

        return array_merge(parent::actions(), $actions);
    }

    public function behaviors()
    {
        $ret =  parent::behaviors();
        $ret['corsFilter'] = [
        'class' => \yii\filters\Cors::className(),
        'cors' => [
            // restrict access to
            'Origin' => ['http://localhost:3000','http://advanced'],
            'Access-Control-Request-Method' => ['POST','GET','PUT'],
            // Allow only POST and PUT methods
            'Access-Control-Request-Headers' => ['X-Wsse', 'Content-Type', 'Authorization'],
            // Allow only headers 'X-Wsse'
            'Access-Control-Allow-Credentials' => true,
            // Allow OPTIONS caching
            'Access-Control-Max-Age' => 3600,
            // Allow the X-Pagination-Current-Page header to be exposed to the browser.
            'Access-Control-Expose-Headers' => ['X-Pagination-Current-Page'],
        ],

    ];
        $ret['bearerAuth'] = [
        'class' => \yii\filters\auth\HttpBearerAuth::className(),
        'except' => ['options', 'allow']
    ];

        return $ret;
    }
}
?>
<?php
/**
 * Controller for manage Pages
 *
 * @author ihor@karas.in.ua
 * Date: 03.04.15
 * Time: 00:35
 */

namespace app\common\controllers;
use \Yii as Yii;


class PageController extends \app\components\ActiveController
{
	public $modelClass = '\app\common\models\Page';

    public function accessRules()
    {
        return [
            [
                'allow' => true,
                'roles' => ['?'],
            ],
            [
                'allow' => true,
                'actions' => [
                    'view',
                    'create',
                    'update',
                    'delete',
                    'index'
                ],
                'roles' => ['@'],
            ],
            [
                'allow' => true,
                'actions' => ['custom'],
                'roles' => ['@'],
                'scopes' => ['custom'],
            ],
            [
                'allow' => true,
                'actions' => ['protected'],
                'roles' => ['@'],
                'scopes' => ['protected'],
            ]
        ];
    }
    public function actions() {

        $actions = [
            'search' => [
                'class'       => 'app\common\actions\SearchAction',
                'modelClass'  => $this->modelClass,
                'params'      => \Yii::$app->request->get()
            ],
        ];

        return array_merge(parent::actions(), $actions);
    }

    public function actionUpdate() {
        return ['bla'];
    }
}
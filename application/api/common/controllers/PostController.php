<?php
/**
 * Controller for manage Posts
 *
 * @author ihor@karas.in.ua
 * Date: 03.04.15
 * Time: 00:35
 */

namespace api\common\controllers;
use \Yii as Yii;


class PostController extends \api\components\ActiveController
{
	public $modelClass = '\api\common\models\Post';

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
                'actions' => ['search'],
                'roles' => ['@'],
                'scopes' => ['search'],
            ],
        ];
    }

	public function actionCustom()
	{
		return ['status' => 'ok', 'underScope' => 'custom'];
	}

	public function actionProtected()
	{
		return ['status' => 'ok', 'underScope' => 'protected'];
	}
}
<?php
/**
 * PostController v1
 * @author Ihor Karas <ihor@karas.in.ua>
 * Date: 03.04.15
 * Time: 00:35
 */

namespace app\versions\v1\controllers;


class PostController extends \app\common\controllers\PostController
{
	public $modelClass = '\app\versions\v1\models\Post';

}
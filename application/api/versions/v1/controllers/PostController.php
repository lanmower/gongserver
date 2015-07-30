<?php
/**
 * PostController v1
 * @author Ihor Karas <ihor@karas.in.ua>
 * Date: 03.04.15
 * Time: 00:35
 */

namespace api\versions\v1\controllers;


class PostController extends \api\common\controllers\PostController
{
	public $modelClass = '\api\versions\v1\models\Post';

}
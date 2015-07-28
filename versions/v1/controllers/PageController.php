<?php
/**
 * PageController v1
 * @author Ihor Karas <ihor@karas.in.ua>
 * Date: 03.04.15
 * Time: 00:35
 */

namespace app\versions\v1\controllers;

use app\components\Cors;
use yii\helpers\ArrayHelper;

class PageController extends \app\common\controllers\PageController
{
    public $modelClass = '\app\versions\v1\models\Page';

}
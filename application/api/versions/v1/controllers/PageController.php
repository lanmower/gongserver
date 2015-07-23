<?php
/**
 * PageController v1
 * @author Ihor Karas <ihor@karas.in.ua>
 * Date: 03.04.15
 * Time: 00:35
 */

namespace api\versions\v1\controllers;

use api\components\Cors;
use yii\helpers\ArrayHelper;

class PageController extends \api\common\controllers\PageController
{
    public $modelClass = '\api\versions\v1\models\Page';

}
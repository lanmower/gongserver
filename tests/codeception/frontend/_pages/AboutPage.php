<?php

namespace tests\codeception\m2m\_pages;

use yii\codeception\BasePage;

/**
 * Represents about page
 * @property \codeception_m2m\AcceptanceTester|\codeception_m2m\FunctionalTester $actor
 */
class AboutPage extends BasePage
{
    public $route = 'site/about';
}

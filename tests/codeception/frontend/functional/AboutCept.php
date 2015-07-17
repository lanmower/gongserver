<?php
use tests\codeception\m2m\FunctionalTester;
use tests\codeception\m2m\_pages\AboutPage;

/* @var $scenario Codeception\Scenario */

$I = new FunctionalTester($scenario);
$I->wantTo('ensure that about works');
AboutPage::openBy($I);
$I->see('About', 'h1');

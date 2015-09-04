<?php
/**
 * Parents active query class for all ones
 */

namespace api\components\db;

use yii\helpers\Json;
use yii\helpers\VarDumper;

class ActiveQuery extends \yii\db\ActiveQuery
{
    public function addConditions($target, $inputConditions = []) {
        $roles = [];
        $conditions = [];
        $tmp = [];
        foreach(\Yii::$app->user->identity->getUserRoles() as $role){
            $roles[] = $role->name;
        }
        $inputConditions[] = '*';
        if (!\Yii::$app->user->isGuest)
            $inputConditions[] = ['@'];
        else
            $inputConditions[] = ['G'];
        $conditions[] = 'or';
        foreach($inputConditions as $input) {
            $conditions[]=[$target=>$input];
        }
        $this->andFilterWhere($conditions);
    }
}
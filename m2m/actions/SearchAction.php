<?php

namespace m2m\actions;

use Yii;
use yii\data\ActiveDataProvider;
use yii\rest\Action;


class SearchAction extends Action {

    /**
     * @var callable a PHP callable that will be called to prepare a data provider that
     * should return a collection of the models. If not set, [[prepareDataProvider()]] will be used instead.
     * The signature of the callable should be:
     *
     * ```php
     * function ($action) {
     *     // $action is the action object currently running
     * }
     * ```
     *
     * The callable should return an instance of [[ActiveDataProvider]].
     */
    public $prepareDataProvider;
    public $params;

    /**
     * @return ActiveDataProvider
     */
    public function run() {
        if ($this->checkAccess) {
            call_user_func($this->checkAccess, $this->id);
        }

        return $this->prepareDataProvider();
    }

    /**
     * Prepares the data provider that should return the requested collection of the models.
     * @return ActiveDataProvider
     */
    protected function prepareDataProvider() {
        if ($this->prepareDataProvider !== null) {
            return call_user_func($this->prepareDataProvider, $this);
        }

        /**
         * @var \yii\db\BaseActiveRecord $modelClass
         */
        $modelClass = $this->modelClass;

        $model = new $this->modelClass([
        ]);

        $safeAttributes = $model->safeAttributes();
        $params = array();

        foreach($this->params as $key => $value){
            if(in_array($key, $safeAttributes)){
                $params[$key] = $value;
            }
        }

        $query = $modelClass::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        if (empty($params)) {
            return $dataProvider;
        }


        foreach ($params as $param => $value) {
            $query->andFilterWhere([
                $param => $value,
            ]);
        }

        return $dataProvider;
    }

}
<?php

namespace m2m\models;

use Yii;

/**
 * This is the model class for table "page".
 *
 * @property integer $id
 * @property string $title
 * @property string $content
 * @property integer $user_id
 */
class Page extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'page';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'page', 'user_id', 'location'], 'required'],
            [['title', 'page'], 'string'],
            [['title', 'page', 'location'], 'safe'],
            [['user_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'content' => 'Content',
            'user_id' => 'User ID',
        ];
    }
}

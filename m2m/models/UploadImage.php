<?php

namespace m2m\models;

use Yii;

/**
 * This is the model class for table "upload_image".
 *
 * @property integer $id
 * @property integer $upload_id
 */
class UploadImage extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'upload_image';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['upload_id'], 'required'],
            [['upload_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'upload_id' => 'Upload ID',
        ];
    }
}

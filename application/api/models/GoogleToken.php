<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "google_tokens".
 *
 * @property string $id
 * @property integer $expires_in
 * @property string $refresh_token
 * @property integer $created
 * @property string $access_token
 * @property string $id_token
 */
class GoogleToken extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'google_token';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['expires_in', 'refresh_token', 'created', 'access_token', 'id_token'], 'required'],
            [['expires_in', 'created'], 'integer'],
            [['id_token'], 'string'],
            [['refresh_token', 'access_token'], 'string', 'max' => 4096],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'expires_in' => 'Expires In',
            'refresh_token' => 'Refresh Token',
            'created' => 'Created',
            'access_token' => 'Access Token',
            'id_token' => 'Id Token',
        ];
    }
}

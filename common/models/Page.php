<?php
/**
 * Model for working with Pages
 *
 * @author ihor@karas.in.ua
 * Date: 04.05.15
 * Time: 22:57
 */

namespace app\common\models;

class Page extends \app\components\db\ActiveRecord
{
	/**
	 * @inheritdoc
	 */
	public static function tableName()
	{
		return '{{page}}';
	}

    public function actionCreate() {
        return 'test';
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
	public static function find() {
		return new PageQuery(get_called_class());
	}
}

class PageQuery extends \app\components\db\ActiveQuery
{
}
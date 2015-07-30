<?php
/**
 * Model for working with Posts
 *
 * @author ihor@karas.in.ua
 * Date: 04.05.15
 * Time: 22:57
 */

namespace app\common\models;

class Post extends \app\components\db\ActiveRecord
{
	/**
	 * @inheritdoc
	 */
	public static function tableName()
	{
		return '{{post}}';
	}

	public static function find() {
		return new PostQuery(get_called_class());
	}
}

class PostQuery extends \app\components\db\ActiveQuery
{
}
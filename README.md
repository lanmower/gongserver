<<<<<<< HEAD
# REST API application with OAuth2 server on [Yii2](https://github.com/yiisoft/yii2)

This is Yii2 Rest App template with configured OAuth2 server (using https://github.com/Filsh/yii2-oauth2-server). Resolved all problems on adaptation OAuth2 server extension, built directory structure with versions (as recommended in [official guide](http://www.yiiframework.com/doc-2.0/guide-rest-versioning.html)), added some ready-to-use features for increase developing. 

You can use this template as start poing to create API side of your service.

## Run on [Docker](https://docs.docker.com/)
To quick run for testing code I've create this https://github.com/ikaras/yii2-oauth2-rest-docker - it using [Docker Compose](https://docs.docker.com/compose/) to up LEMP stack with all need configurations and ready for requests. Just follow instructions in there.

## Installation

**Install via Composer**

If you do not have [Composer](http://getcomposer.org/), you may install it by following the
[instructions at getcomposer.org](https://getcomposer.org/doc/00-intro.md).

You can then install the application using the following commands:
```
composer global require "fxp/composer-asset-plugin:~1.0.0"
composer create-project --stability="dev" --prefer-source ikaras/yii2-oauth2-rest-template .
```

## Configurations

1. Configure your Webservice, nginx or apache (see how [here](http://www.yiiframework.com/doc-2.0/guide-start-installation.html#configuring-web-servers)), to look at the `application/api/www` directory. I used domain `api.loc` in my tests.
2. Change connection to your db in `application/api/common.php`
3. Run migrations
```
php application/api/yiic migrate --migrationPath=@yii/rbac/migrations --interactive=0 \
php application/api/yiic migrate --migrationPath=@vendor/filsh/yii2-oauth2-server/migrations --interactive=0 \
php application/api/yiic migrate --interactive=0 \
```

## Structure
```
\application              # root folder for environment (frontend, backend, api, etc.)
  \api                   # here is code for build REST API with OAuth2 server
  | \common              # common controllers and models for versions
  | | \controllers       # for tests created only one ProductController
  | | \models            # and one model Product
  | \components          # global for API components (parents for project's controllers, models, filters)
  | |-APIModule.php      # parent for all module/versions
  | |-ActiveController.php # child of yii's rest ActiveController, parent for all ones in project
  | |-Controller.php     # child of yii's rest Controller
  | | \db                # contain parents for all project's ActiveRecord and ActiveQuery
  | | \filters           
  | | | -OAuth2AccessFilter.php # MAIN IMPROVEMENT: analyze action publicity and scopes to attach filter
  | | |                          # to authorize by access token
  | | \traits            # contain ControllersCommonTrait.php with configuration of filters, used in both rest controllers
  | \config
  | \migrations          # contain migrations for create users table, filling demo products and scopes
  | \models              # have User model
  | \versions            # directory for versions, each version is module as recommend in official yii2 guide
  | | \v1                # created for test 1st version with childs of ProductController and Product model
  | \www                 # public directory, containt index.php
```  

## Tests
### Conditions

- _Domain_: `api.loc`
- _Version_: `v1`
- _API point_: `/products`, `/products/<id>`, `/products/custom`, `/products/protected`
- _User_: login: `admin@api.loc`, pass: `123123123`
- _Scopes_: default (default scope, CO :)), custom, protected - for accessing to /products/custom and /products/protected point

### Description
For test have been created [active rest controller](http://www.yiiframework.com/doc-2.0/guide-rest-controllers.html) ProductController for manage Product model.

This controller has the following access rules (in [yii2 format](http://www.yiiframework.com/doc-2.0/guide-security-authorization.html)):
```
	public function accessRules()
	{
		return [
			['allow' => true, 'roles' => ['?']],
			[
			  'allow' => true, 
			  'actions' => ['view','create','update','delete'],
				'roles' => ['@'],
			],
			[
				'allow' => true,
				'actions' => ['custom'],
				'roles' => ['@'],
				'scopes' => ['custom'],
			],
			[
				'allow' => true,
				'actions' => ['protected'],
				'roles' => ['@'],
				'scopes' => ['protected'],
			]
		];
	}
```
Each controller in the api can override method `accessRules` with access rules for itself. Rule can contain additional property - _scope_, this means access token should have addtional permissions.

So, from the rules, we understand that:
* all actions of controller are opened (requests cab be without access token), but
* actions `view`, `create`, `update`, `delete` - available only for authorized users
* and for actions `custom` and `protected` needs additional scopes
 
### Test requests
1\. Request to public api points
```
    curl -i -H "Accept:application/json" -H "Content-Type:application/json" "http://api.loc/v1/products"
```

2\. Request to get access token
```
curl -i -H "Accept:application/json" -H "Content-Type:application/json" "http://api.loc/oauth2/token" -XPOST \
-d '{"grant_type":"password","username":"admin@api.loc","password":"123123123","client_id":"testclient","client_secret":"testpass"}'
```

3\. Request to get access token with scopes
```
curl -i -H "Accept:application/json" -H "Content-Type:application/json" "http://api.loc/oauth2/token" -XPOST \
-d '{"grant_type":"password","username":"admin@api.loc","password":"123123123","client_id":"testclient","client_secret":"testpass","scope":"custom"}'
```

4\. Request to protected api point 
```
curl -i -H "Accept:application/json" -H "Content-Type:application/json" \
"http://api.loc/v1/products/1?access_token=76f4c0d40347f24a73799335cefb495be9ea364b"
```
=======
Yii 2 Basic Project Template
============================

Yii 2 Basic Project Template is a skeleton [Yii 2](http://www.yiiframework.com/) application best for
rapidly creating small projects.

The template contains the basic features including user login/logout and a contact page.
It includes all commonly used configurations that would allow you to focus on adding new
features to your application.

[![Latest Stable Version](https://poser.pugx.org/yiisoft/yii2-app-basic/v/stable.png)](https://packagist.org/packages/yiisoft/yii2-app-basic)
[![Total Downloads](https://poser.pugx.org/yiisoft/yii2-app-basic/downloads.png)](https://packagist.org/packages/yiisoft/yii2-app-basic)
[![Build Status](https://travis-ci.org/yiisoft/yii2-app-basic.svg?branch=master)](https://travis-ci.org/yiisoft/yii2-app-basic)

DIRECTORY STRUCTURE
-------------------

      assets/             contains assets definition
      commands/           contains console commands (controllers)
      config/             contains application configurations
      controllers/        contains Web controller classes
      mail/               contains view files for e-mails
      models/             contains model classes
      runtime/            contains files generated during runtime
      tests/              contains various tests for the basic application
      vendor/             contains dependent 3rd-party packages
      views/              contains view files for the Web application
      web/                contains the entry script and Web resources



REQUIREMENTS
------------

The minimum requirement by this project template that your Web server supports PHP 5.4.0.


INSTALLATION
------------

### Install from an Archive File

Extract the archive file downloaded from [yiiframework.com](http://www.yiiframework.com/download/) to
a directory named `basic` that is directly under the Web root.

You can then access the application through the following URL:

~~~
http://localhost/basic/web/
~~~


### Install via Composer

If you do not have [Composer](http://getcomposer.org/), you may install it by following the instructions
at [getcomposer.org](http://getcomposer.org/doc/00-intro.md#installation-nix).

You can then install this project template using the following command:

~~~
php composer.phar global require "fxp/composer-asset-plugin:~1.0.0"
php composer.phar create-project --prefer-dist --stability=dev yiisoft/yii2-app-basic basic
~~~

Now you should be able to access the application through the following URL, assuming `basic` is the directory
directly under the Web root.

~~~
http://localhost/basic/web/
~~~


CONFIGURATION
-------------

### Database

Edit the file `config/db.php` with real data, for example:

```php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=yii2basic',
    'username' => 'root',
    'password' => '1234',
    'charset' => 'utf8',
];
```

**NOTE:** Yii won't create the database for you, this has to be done manually before you can access it.

Also check and edit the other files in the `config/` directory to customize your application.
>>>>>>> ba2d298964e211c6534a962e677e394836cef3c6

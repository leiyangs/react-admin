# cms-api

```npm
$ npm i egg-init -g
$ egg-init cms-api --type=simple
$ cd cms-api
$ npm i
$ npm run dev
```

## 使用mysql

数据库脚本
```mysql
CREATE TABLE user (
 id int(11) PRIMARY KEY AUTO_INCREMENT,
 username varchar(255) NULL,
 password varchar(255) NULL,
 email varchar(255) NULL,
 phone varchar(255) NULL,
 gender tinyint(255) NULL,
 birthday datetime NULL,
 address varchar(255) NULL
);

CREATE TABLE role (
 id int(11) PRIMARY KEY AUTO_INCREMENT,
 name varchar(255) NULL
);

CREATE TABLE role_user (
role_id int(11) NOT NULL,
user_id int(11) NOT NULL,
PRIMARY KEY (user_id, role_id) 
);

CREATE TABLE resource (
id int(11) PRIMARY KEY AUTO_INCREMENT,
name varchar(255) NOT NULL
);

CREATE TABLE role_resource (
role_id int(11) NOT NULL,
resource_id int(255) NOT NULL,
PRIMARY KEY (role_id, resource_id) 
);
```

```npm
cnpm i egg-mysql -S
```

### 配置config

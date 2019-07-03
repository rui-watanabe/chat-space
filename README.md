# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :group_users
- has_many :users, through: :group_users
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|references|foreign_key: true, index: true|
|user_id|references|foreign_key: true, index: true|

### Association
- belongs_to :user
- belongs_to :group

### group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true, null: false, index: true|
|group_id|references|foreign_key: true, null: false, index: true|

### Association
- belongs_to :user
- belongs_to :group
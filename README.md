# Бэкенд веб-приложения News Explorer

URL: https://api.the-news-explorer.tk  
Фротненд: https://the-news-explorer.tk  

## Методы API, не требующие аутентификации

* [Регистрация](docs/sign_up.md) : `POST api.the-news-explorer.tk/signup`
* [Вход](docs/sign_in.md) : `POST api.the-news-explorer.tk/signin`

## Методы API, требующие аутентификации

Данные методы требуют валидный токен, который будет включен в заголовок запроса.  
Токен может быть получен после успешной авторизации.  
Браузер автоматически сохранит токен и подставит его в каждый запрос.

### User

Методы для работы с данными пользователей.

* [Получить информацию о пользователе](docs/user/get_user.md) : `GET api.the-news-explorer.tk/users/me`

### Article

Методы для работы со статьями.

* [Получить список всех статей](docs/article/get_articles.md) : `GET api.the-news-explorer.tk/articles`
* [Добавить новую статью](docs/article/add_article.md) : `POST api.the-news-explorer.tk/articles`
* [Удалить статью](docs/article/delete_article.md) : `DELETE api.the-news-explorer.tk/articles/:articleId`

### Выход из аккаунта

Метод для выхода из аккаунта. Требуется токен в заголовке запроса.

* [Выйти из аккаунта](docs/logout.md) : `POST api.the-news-explorer.tk/logout`

### Преавторизационный метод

Данный метод используется для проверки авторизации при доступе на страницу сохраненных статей.  

* [Преавторизационный запрос](docs/savednews_auth.md) : `POST api.the-news-explorer.tk/savednews-auth`

## Установка

#### 1. Загрузите исходный код проекта:

   ```bash
git clone https://github.com/jellythefish/backend-mesto.git
   ```

#### 2. Установите Node.js и MongoDB Community Server:

  1. Node.js: https://nodejs.org/en/download/
  2. MongoDB: https://www.mongodb.com/download-center/community
  
   
#### 3. Создайте папку для базы данных (для пользователей Windows):

```bash
cd /C
mkdir -p data/db
```

#### 4.  Запустите mongod сервис для функционирования базы данных с помощью команды в консоли:

   ```bash
C:\Program Files\MongoDB\Server\4.2\bin\mongod # (для пользователей Windows)
mongod # (для пользователей Mac)
   ```

#### 5. В консоли перейдите в папку с загруженным проектом и установите зависимости node:

   ```bash
cd backend-mesto
npm i
   ```
   
#### 6. Запустите веб-сервер с помощью команды в консоли: 

```bash
npm run start
```
Сервер будет запущен по адресу localhost:3000, и вы можете успешно отправлять запросы по этому адресу.

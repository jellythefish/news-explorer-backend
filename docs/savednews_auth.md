# Предавторизационный запрос

Используется для доступа авторизованного пользователя на страницу /savednews.  
  
Требуется настройка переадресации запроса статической страницы /savednews на запрос /savednews-auth, отправляемый на Node сервер.
Для реализации используется nginx.
При попытке захода на страницу /savednews с фронтенда, на сервер посылается запрос /savednews.
Nginx в конфигурации ниже обрабатывает запрос, перенаправляя его на /savednews-auth на Node сервер,  
который запущен в примере на localhost:3000. В случае успеха авторизации, Nginx ответит пользователю
на запрос /savednews требуемой страницей, иначе перенаправит на главную страницу.

Пример настройки на nginx (часть настроек конфигурационного файла):

```bash
  location /savednews {
        auth_request     /savednews-auth;
        auth_request_set $auth_status $upstream_status;
        add_header      'Cache-Control' 'no-cache';
        error_page 401 = @redirect;
    }
    
    location = /savednews-auth {
        internal;
        proxy_pass              http://localhost:3000;
        proxy_pass_request_body off;
        proxy_set_header        Content-Length "";
        proxy_set_header        X-Original-URI $request_uri;
    }

    location @redirect {
        return 307 https://the-news-explorer.tk;
    }
```

**URL** : `POST api.the-news-explorer.tk/savednews-auth`

**Метод** : `POST`

**Аутентификация** : НЕТ

## Успешный ответ

**Код ответа** : `200 OK`

## Ответ с ошибкой

**Условие** : если пользователь не авторизован.

**Код ответа** : `401 Unathorized`

**Тело ответа** :

```json
{
    "statusCode": 401,
    "message": "Необходимо пройти авторизацию"
}
```

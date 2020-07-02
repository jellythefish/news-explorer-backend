# Вход

Используется для получения токена зарегистрированным пользователем.

**URL** : `POST api.the-news-explorer.tk/signin`

**Метод** : `POST`

**Аутентификация** : НЕТ

**Данные, отправляемые в теле запроса**

```json
{
    "email": "[валидный email адрес]",
    "password": "[пароль пользователя]"
}
```

**Пример данных**

```json
{
    "email": "test@example.com",
    "password": "12345678qQ"
}
```

## Успешный ответ

**Код ответа** : `200 OK`

**Ответ**  
В ответе присылается токен, находящийся в заголовке:  
`Set-Cookie: jwt=ey2bGciOfas1UzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWvcxwrOTMzNjkxMDUzYWUyZTQzZTIiLCJpYXQiOjE1ODc3NTk4ODAsImV4cCI6MTU4ODM2NDY4MH0.1MUnSEuc0TlBD_Ovcxre2VRrWREC_-5J2xWBvNXjKU9Y_A; Max-Age=604800; Path=/; Expires=Fri, 01 May 2020 20:24:40 GMT; HttpOnly; SameSite=Strict  
`

**Тело ответа**
```json
{
    "name": "test",
    "token": "eyJhbGciOiJIUzI1NiIsInR5.JnPe2ERtMrOk88YXY8QZTlGM1jdaiAl5V8_0_RGDHuY"
}
```

## Ответ с ошибкой

**Условие** : если логин или пароль не верно введены.

**Код ответа** : `401 Unathorized`

**Тело ответа** :

```json
{
    "statusCode": 401,
    "message": "Неправильные почта или пароль"
}
```

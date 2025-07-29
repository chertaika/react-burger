# React Burger

Учебный проект на курсе React-разработчик от Яндекс.Практикум. Реализован на Vite + React + TypeScript. Приложение позволяет собирать бургеры из ингредиентов, оформлять заказы и управлять профилем пользователя.

#### [Ссылка на репозиторий](https://github.com/chertaika/react-burger)

#### [Ссылка на деплой](https://chertaika.github.io/react-burger/)

## Установка и запуск

- Клонируйте репозиторий:

```
git clone https://github.com/chertaika/react-burger.git
cd react-burger
```

- Установите зависимости:

```
npm i
```

- Запустите проект:

```
npm run dev
```

## Тесты

`npm run test` — запуск unit-тестов
`npm run cypress` — запуск E2E-тестов
`npm run cypress:open` — запуск интерфейса Cypress Test Runner

## Структура проекта

- src/ — основная папка проекта.
- components/ — React-компоненты.
- utils/ — утилиты.
- services/ — хранилище Redux Toolkit.
- pages/ — страницы приложения.
- assets/ — изображения и другие ресурсы.

## Стек технологий

- Vite
- React
- TypeScript
- Redux Toolkit
- React Router
- WebSocket
- Cypress (E2E-тесты)
- Jest (unit-тесты)

## Функционал

- Регистрация и авторизация пользователей
- Редактированием данных пользователя
- Просмотр личных заказов
- Сборка бургера с использованирем drag and drop
- Отправка заказов
- Просмотр ленты заказов

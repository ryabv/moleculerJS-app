# moleculerJS-app

## Как запустить проект

1. Сначала необходимо запустить `MongoDB`. На Windows это делается так:
    1. В консоль ввести `"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"`
    1. В другой консоли `"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"`
1. Далее необходимо поднять `Redis`. Так как официально Redis не поддерживает Windows, то чтобы использовать его на данной ОС, необходимо выполнить всё так, как написано по этой ссылке https://riptutorial.com/ru/redis/example/29962/установка-и-запуск-redis-server-в-windows
1. Выполните команду `cd frontend`, затем `npm install`, затем `npm start`
1. Перейдите в папку `backend` и выполните `npm install`, затем `npm run dev`

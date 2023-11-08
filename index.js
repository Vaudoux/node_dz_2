//Подключаем модуль express
const express = require("express");
//Подключаем модуль path
const path = require("path");
//Подключаем модуль fs
const fs = require("fs");

//Используем метод path.join
const fPath = path.join(__dirname, "index.json");
//Используем синхронный метод чтения
const data = fs.readFileSync(fPath, "utf-8");
const write = JSON.parse(data);
const app = express();
const port = 3000;

function saveCount() {
  fs.writeFile(fPath, JSON.stringify(write, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

app.get("/", (req, res) => {
  write.index++;
  saveCount();
  res.send(`<h1>Добро пожаловать на мою страницу!</h1>
    <h4>Просмотров: ${write.index}</h4>
    <a href="/about">Перейти на страницу about</a>`);
});
app.get("/about", (req, res) => {
  write.about++;
  saveCount();
  res.send(`<h1>Добро пожаловать на страницу about</h1>
    <h4>Просмотров: ${write.about} </h4>
    <a href="/">Перейти на Стартовую страницу</a>`);
});
app.listen(port, () => {
  console.log(`Программа запущена на порту ${port}!`);
});

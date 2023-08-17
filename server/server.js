const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const uslugiList = [
  { name: "Кузов", prices: { "Легковая": 2500, "Кроссовер": 3000, "Внедорожник": 3500 } },
  { name: "Салон", prices: { "Легковая": 2000, "Кроссовер": 2500, "Внедорожник": 3000 } },
  { name: "Кузов Салон", prices: { "Легковая": 3500, "Кроссовер": 4000, "Внедорожник": 5000 } },
  { name: "Багажник", prices: { "Легковая": 500, "Кроссовер": 700, "Внедорожник": 1000 } },
  { name: "Нанесение воска", prices: { "Легковая": 700, "Кроссовер": 1000, "Внедорожник": 1000 } },
  { name: "Детейлинг химчистка", prices: { "Легковая": 50000, "Кроссовер": 55000, "Внедорожник": 70000 } },
  { name: "Отбивка радиатора", prices: { "Легковая": 700, "Кроссовер": 700, "Внедорожник": 1000 } },
  { name: "Сухой туман", prices: { "Легковая": 2000, "Кроссовер": 2500, "Внедорожник": 3000 } },
  { name: "Балон", prices: { "Легковая": 600, "Кроссовер": 700, "Внедорожник": 700 } },
  { name: "Балон с диском", prices: { "Легковая": 1000, "Кроссовер": 1000, "Внедорожник": 1000 } },
  { name: "Комплексная мойка", prices: { "Легковая": 4800, "Кроссовер": 5500, "Внедорожник": 6500 } },
  { name: "Чернение шин", prices: { "Легковая": 500, "Кроссовер": 500, "Внедорожник": 500 } },
  { name: "Отбивка кузова без пены", prices: { "Легковая": 1200, "Кроссовер": 1500, "Внедорожник": 2000 } },
  { name: "Отбивка с пеной", prices: { "Легковая": 1500, "Кроссовер": 1800, "Внедорожник": 2500 } },
  { name: "Двигатель", prices: { "Легковая": 3000, "Кроссовер": 4000, "Внедорожник": 6000 } },
  { name: "Полировка салона", prices: { "Легковая": 1000, "Кроссовер": 1500, "Внедорожник": 2000 } },
  { name: "Химчистка салона", prices: { "Легковая": 25000, "Кроссовер": 35000, "Внедорожник": 45000 } },
  { name: "Полики", prices: { "Легковая": 500, "Кроссовер": 500, "Внедорожник": 500 } }
];

mongoose.connect('mongodb://127.0.0.1:27017/Moika', { useNewUrlParser: true, useUnifiedTopology: true });

const ZakazSchema = new mongoose.Schema({
  carBrand: String,
  carNumber: String,
  carType: String,
  uslugi: [String] 
});


const Zakaz = mongoose.model('Zakaz', ZakazSchema, 'Zakaz');

const UslugaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  prices: {
    "Легковая": Number,
    "Кроссовер": Number,
    "Внедорожник": Number
  }
});

const Usluga = mongoose.model('Usluga', UslugaSchema);
async function initializeUslugi() {
  for (let uslugaData of uslugiList) {
    const existingUsluga = await Usluga.findOne({ name: uslugaData.name });
    if (existingUsluga) {
      existingUsluga.prices = uslugaData.prices;
      await existingUsluga.save();
    } else {
      const newUsluga = new Usluga(uslugaData);
      await newUsluga.save();
    }
  }
  console.log("Uslugi initialized/updated in the database.");
}

// Вызовите эту функцию при запуске сервера (можно раскомментировать следующую строку):
 initializeUslugi();

app.post('/add', async (req, res) => {
  console.log("Получен запрос:", req.body);
  const newZakaz = new Zakaz(req.body); // Создаем новый заказ при каждом запросе

  try {
    const savedZakaz = await newZakaz.save();
    console.log("Запись успешно сохранена:", savedZakaz);
    res.status(200).send(savedZakaz);
  } catch (err) {
    console.error("Ошибка при сохранении:", err);
    res.status(500).send(err);
  }
});

app.get('/uslugi', async (req, res) => {
  try {
    const uslugi = await Usluga.find();
    res.status(200).json(uslugi);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении списка услуг", error: err });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

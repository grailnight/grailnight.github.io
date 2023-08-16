const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Moika', { useNewUrlParser: true, useUnifiedTopology: true });


const ZakazSchema = new mongoose.Schema({
  carBrand: String,
  carNumber: String,
  carType: String
});

const Zakaz = mongoose.model('Zakaz', ZakazSchema, 'Zakaz');


app.post('/add', async (req, res) => {
  console.log("Получен запрос:", req.body); // Логирование полученных данных

  const newZakaz = new Zakaz(req.body);
  
  try {
    const savedZakaz = await newZakaz.save();
    console.log("Запись успешно сохранена:", savedZakaz); // Логирование сохраненной записи
    res.status(200).send(savedZakaz);
  } catch (err) {
    console.error("Ошибка при сохранении:", err); // Логирование ошибки
    res.status(500).send(err);
  }
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

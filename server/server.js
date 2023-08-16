const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moika', { useNewUrlParser: true, useUnifiedTopology: true });

const ZakazSchema = new mongoose.Schema({
  carBrand: String,
  carNumber: String,
  carType: String
});

const Zakaz = mongoose.model('Zakaz', ZakazSchema);

app.post('/add', (req, res) => {
  const newZakaz = new Zakaz(req.body);
  newZakaz.save((err, zakaz) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(zakaz);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

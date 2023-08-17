<template>
  <div>
    <h1>Учет автомойки</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label>Марка:</label>
        <input v-model="carBrand" type="text" required />
      </div>
      <div>
        <label>Гос номер:</label>
        <input v-model="carNumber" type="text" required />
      </div>
      <div>
        <label>Вид кузова:</label>
        <select v-model="carType">
          <option value="Легковая">Легковая</option>
          <option value="Универсал">Универсал</option>
          <option value="S class">S class</option>
          <option value="Кроссовер">Кроссовер</option>
          <option value="Минивен">Минивен</option>
          <option value="Внедорожник">Внедорожник</option>
        </select>
      </div>
      <Multiselect
        v-model="selectedUslugi"
        :options="uslugi"
        :multiple="true"
        track-by="name"
        label="name"
        placeholder="Выберите услуги"
      ></Multiselect>

      <button type="submit">Добавить</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      carBrand: "",
      carNumber: "",
      carType: "",
      uslugi: [],
      selectedUslugi: [],
      selectedPrice: 0, // Массив для хранения выбранных услуг
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://localhost:3001/add", {
          carBrand: this.carBrand,
          carNumber: this.carNumber,
          carType: this.carType,
          uslugi: this.selectedUslugi,
        })
        .then((response) => {
          console.log("Данные успешно добавлены:", response.data);
        })
        .catch((error) => {
          console.error("Ошибка при добавлении данных:", error);
        });
    },
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3001/uslugi");
      this.uslugi = response.data;
    } catch (err) {
      console.error("Ошибка при получении списка услуг:", err);
    }
  },
};
</script>
<style scoped>
div {
  font-family: "Arial", sans-serif;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

div > div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

div > div.uslugi {
  display: grid;
  grid-template-columns: repeat(
    2,
    1fr
  ); /* Разделите список услуг на две колонки */
  gap: 10px; /* Отступ между элементами */
}
</style>

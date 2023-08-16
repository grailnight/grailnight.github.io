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
      <button type="submit">Добавить</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carBrand: "",
      carNumber: "",
      carType: "",
    };
  },
  methods: {
    submitForm() {
      // Здесь будет код для отправки данных в MongoDB
    },
  },
};
</script>

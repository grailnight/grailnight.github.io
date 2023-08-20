<template>
  <div>
    <h1>Arnau</h1>
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
        <label>Мойщик:</label>
        <select v-model="selectedWasher">
          <option v-for="washer in washers" :key="washer" :value="washer">
            {{ washer }}
          </option>
        </select>
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
        v-model="selectedUslugiObjects"
        :options="uslugi"
        :multiple="true"
        track-by="_id"
        label="name"
        placeholder="Выберите услуги"
      ></Multiselect>
      <div>Итоговая стоимость: {{ totalPrice }} tg.</div>
      <div>
        <label>Способ оплаты:</label>
        <div v-for="paymentMethod in paymentMethods" :key="paymentMethod">
          <input
            type="radio"
            :value="paymentMethod"
            v-model="selectedPaymentMethod"
          />
          {{ paymentMethod }}
        </div>
      </div>
      <div v-if="selectedPaymentMethod === 'Раздельный'">
        <label>Наличные:</label>
        <input type="number" v-model="cashPayment" />
        <label>Перевод:</label>
        <input type="number" v-model="transferPayment" />
        <label>QR:</label>
        <input type="number" v-model="qrPayment" />
      </div>
      <button type="submit">Добавить</button>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </form>
    <div>
      <h2>История заказов</h2>
      <table>
        <thead>
          <tr>
            <th>Марка</th>
            <th>Гос номер</th>
            <th>Тип кузова</th>
            <th>Услуги</th>
            <th>Итоговая стоимость</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in formattedOrderHistory" :key="order._id">
            <td>{{ order.carBrand }}</td>
            <td>{{ order.carNumber }}</td>
            <td>{{ order.carType }}</td>
            <td>{{ order.uslugi.join(", ") }}</td>
            <td>{{ order.totalPrice }} tg</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      selectedPrice: 0,
      totalPrice: 0,
      selectedUslugiObjects: [],
      successMessage: "",
      errorMessage: "",
      orderHistory: [],
      selectedWasher: "",
      washers: ["Мойщик 1", "Мойщик 2", "Мойщик 3"], // Массив для хранения выбранных услуг
      selectedPaymentMethod: "",
      paymentMethods: ["Наличные", "Перевод", "QR", "Раздельный"],
      cashPayment: 0,
      transferPayment: 0,
      qrPayment: 0,
    };
  },
  watch: {
    selectedUslugi: "calculateTotalPrice",
    carType: "calculateTotalPrice",
  },
  computed: {
    selectedUslugiIds() {
      return this.selectedUslugiObjects.map((usluga) => usluga._id);
    },
    formattedOrderHistory() {
      return this.orderHistory.map((order) => {
        return {
          ...order,
          uslugi: order.uslugi.map((uslugaId) => {
            const foundUsluga = this.uslugi.find((u) => u._id === uslugaId);
            return foundUsluga ? foundUsluga.name : "Неизвестная услуга";
          }),
        };
      });
    },
  },
  methods: {
    isValidSplitPayment() {
      const totalSplitPayment =
        this.cashPayment + this.transferPayment + this.qrPayment;
      return totalSplitPayment === this.totalPrice;
    },
    async loadOrderHistory() {
      try {
        const response = await axios.get("http://localhost:3001/orders");
        this.orderHistory = response.data;
      } catch (err) {
        console.error("Ошибка при загрузке истории заказов:", err);
      }
    },
    submitForm() {
      if (
        this.selectedPaymentMethod === "Раздельный" &&
        !this.isValidSplitPayment()
      ) {
        this.errorMessage =
          "Сумма раздельных платежей не соответствует итоговой стоимости!";
        return;
      }
      axios
        .post("http://localhost:3001/add", {
          carBrand: this.carBrand,
          carNumber: this.carNumber,
          carType: this.carType,
          uslugi: this.selectedUslugiIds,
          totalPrice: this.totalPrice,
          washer: this.selectedWasher,
          paymentMethod: this.selectedPaymentMethod,
          cashPayment: this.cashPayment,
          transferPayment: this.transferPayment,
          qrPayment: this.qrPayment,
        })
        .then((response) => {
          console.log("Данные успешно добавлены:", response.data);
          this.successMessage = "Запись успешно добавлена!";
          this.errorMessage = "";
        })
        .catch((error) => {
          console.error("Ошибка при добавлении данных:", error.message);
          this.errorMessage = "Ошибка при добавлении данных!";
          this.successMessage = "";
        });
    },

    calculateTotalPrice() {
      let price = 0;
      this.selectedUslugiIds.forEach((uslugaId) => {
        const usluga = this.uslugi.find((u) => u._id === uslugaId);
        if (usluga && usluga.prices[this.carType]) {
          price += usluga.prices[this.carType];
        }
      });
      this.totalPrice = price;
    },
  },

  async mounted() {
    console.log(this.uslugi);
    try {
      const response = await axios.get("http://localhost:3001/uslugi");
      this.uslugi = response.data;
      console.log(
        "All available uslugi IDs:",
        this.uslugi.map((u) => u._id)
      );
      this.loadOrderHistory();
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
.success-message {
  padding: 10px;
  margin-top: 20px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
}

.error-message {
  padding: 10px;
  margin-top: 20px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table,
th,
td {
  border: 1px solid #ccc;
}

th,
td {
  padding: 8px 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>

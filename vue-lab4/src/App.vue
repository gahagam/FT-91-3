<template>
  <div class="app">
    <h1>Учет расходов</h1>
    
    <div class="balance-info" v-if="history.length > 0">
      <div class="balance-item">
        <h3>Баланс:</h3>
        <span :class="totalBalance >= 0 ? 'income' : 'outcome'">{{ totalBalance }} ₽</span>
      </div>
      <div class="balance-item">
        <h3>Расходы:</h3>
        <span class="outcome">{{ outcomeBalance }} ₽</span>
      </div>
      <div class="balance-item">
        <h3>Доходы:</h3>
        <span class="income">{{ incomeBalance }} ₽</span>
      </div>
    </div>
    <p v-else>Вы не совершали финансовых операций</p>
    
    <div class="form-container">
      <h2>Добавить операцию</h2>
      <form @submit.prevent="addOperation">
        <div class="form-group">
          <label for="title">Название:</label>
          <input 
            type="text" 
            id="title" 
            v-model.trim="title" 
            required
          >
        </div>
        <div class="form-group">
          <label for="amount">Сумма:</label>
          <input 
            type="number" 
            id="amount" 
            v-model.number="amount" 
            required
            step="0.01"
          >
        </div>
        <button type="submit">Добавить</button>
      </form>
    </div>
    
    <!-- Переместили историю операций сюда -->
    <div class="history" v-if="history.length > 0">
      <h2>История операций</h2>
      <ul>
        <li 
          v-for="item in history" 
          :key="item.id"
          :class="item.amount >= 0 ? 'income' : 'outcome'"
        >
          <span class="text">{{ item.text }}</span>
          <span class="amount">{{ item.amount }} ₽</span>
          <button @click="removeOperation(item.id)" class="remove-btn">×</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const title = ref('');
    const amount = ref(0);
    const history = ref([]);
    
    const addOperation = () => {
      if (title.value && amount.value !== 0) {
        history.value.push({
          text: title.value,
          amount: Number(amount.value),
          id: Date.now()
        });
        title.value = '';
        amount.value = 0;
      }
    };
    
    const removeOperation = (id) => {
      history.value = history.value.filter(item => item.id !== id);
    };
    
    const incomeBalance = computed(() => {
      return history.value
        .filter(item => item.amount > 0)
        .reduce((sum, item) => sum + item.amount, 0)
        .toFixed(2);
    });
    
    const outcomeBalance = computed(() => {
      return Math.abs(history.value
        .filter(item => item.amount < 0)
        .reduce((sum, item) => sum + item.amount, 0))
        .toFixed(2);
    });
    
    const totalBalance = computed(() => {
      return history.value
        .reduce((sum, item) => sum + item.amount, 0)
        .toFixed(2);
    });
    
    return {
      title,
      amount,
      history,
      addOperation,
      removeOperation,
      incomeBalance,
      outcomeBalance,
      totalBalance
    };
  }
};
</script>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #000;
}

h1, h2, h3 {
  color: #000;
}

.balance-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.balance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.form-container {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #000;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  color: #000;
}

button {
  padding: 8px 15px;
  background-color: #42a5f5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1e88e5;
}

.remove-btn {
  padding: 2px 6px;
  background-color: #ff4444;
  margin-left: 10px;
}

.remove-btn:hover {
  background-color: #cc0000;
}

.history ul {
  list-style: none;
  padding: 0;
}

.history li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: #000;
}

.income {
  color: #42b983;
}

.outcome {
  color: #ff4444;
}

.text {
  flex-grow: 1;
}

.amount {
  margin-left: 20px;
}
</style>
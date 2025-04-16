<template>
  <div class="app">
    <h1>Факты о числах</h1>
    
    <div class="search-container">
      <input
        type="number"
        v-model.number="number"
        @keyup.enter="fetchFact"
        placeholder="Введите число"
      >
      
      <select v-model="category">
        <option value="trivia">Случайный факт</option>
        <option value="math">Математический факт</option>
        <option value="year">Факт о годе</option>
      </select>
      
      <button @click="fetchFact" :disabled="isLoading">
        {{ isLoading ? 'Загрузка...' : 'Поиск' }}
      </button>
    </div>
    
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="fact" class="fact-container">
      <p class="fact-text">{{ fact.text }}</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ number }} - {{ category === 'year' ? 'скучный год' : 'скучное число' }}</p>
    </div>
    
    <div v-else class="placeholder">
      <p>Введите число и выберите категорию</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const number = ref('');
    const category = ref('trivia');
    const fact = ref(null);
    const error = ref(false);
    const isLoading = ref(false);
    
    const fetchFact = async () => {
      if (!number.value && number.value !== 0) return;
      
      isLoading.value = true;
      error.value = false;
      fact.value = null;
      
      try {
        const response = await fetch(
          `http://numbersapi.com/${number.value}/${category.value}?json`
        );
        const data = await response.json();
        
        if (data.found) {
          fact.value = data;
        } else {
          error.value = true;
        }
      } catch (err) {
        console.error('Ошибка при получении данных:', err);
        error.value = true;
      } finally {
        isLoading.value = false;
      }
    };
    
    return {
      number,
      category,
      fact,
      error,
      isLoading,
      fetchFact
    };
  }
};
</script>
<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 25px;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
  background-color: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

h1 {
  text-align: center;
  color: #1e293b;
  margin-bottom: 25px;
  font-weight: 600;
  font-size: 28px;
}

.search-container {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background-color: #ffffff;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

select {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

select:focus {
  outline: none;
  border-color: #6366f1;
}

button {
  padding: 12px 24px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #4f46e5;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
}

button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #e2e8f0;
  border-top: 5px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fact-container {
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #6366f1;
}

.fact-text {
  font-size: 18px;
  line-height: 1.6;
  color: #334155;
  margin: 0;
}

.error-message {
  padding: 20px;
  background-color: #fee2e2;
  border-radius: 8px;
  margin-top: 20px;
  color: #dc2626;
  text-align: center;
  border-left: 4px solid #dc2626;
}

.placeholder {
  padding: 30px 20px;
  text-align: center;
  color: #64748b;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.category-tag {
  display: inline-block;
  padding: 4px 8px;
  background-color: #e0e7ff;
  color: #4338ca;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}
</style>
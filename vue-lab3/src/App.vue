<template>
  <form @submit.prevent="register">
    <!-- Поля формы -->
    <input v-model="user.firstName" type="text" placeholder="Имя">
    <input v-model="user.lastName" type="text" placeholder="Фамилия">
    
    <!-- Радиокнопки для пола -->
    <label>
      <input v-model="user.gender" type="radio" value="male"> Мужской
    </label>
    <label>
      <input v-model="user.gender" type="radio" value="female"> Женский
    </label>
    
    <!-- Поля пароля -->
    <input 
      v-model="user.password" 
      :type="showPassword ? 'text' : 'password'" 
      placeholder="Пароль"
    >
    <input 
      v-model="user.confirmPassword" 
      :type="showPassword ? 'text' : 'password'" 
      placeholder="Подтвердите пароль"
    >
    
    <!-- Кнопки -->
    <button 
      type="submit" 
      :disabled="user.password !== user.confirmPassword"
    >
      Зарегистрироваться
    </button>
    
    <button 
      @mousedown="showPassword = true" 
      @mouseup="showPassword = false"
    >
      Показать пароль
    </button>
  </form>

  <!-- Вывод информации о пользователе -->
  <p v-if="user.firstName">
    Пользователь: {{ user.firstName }} {{ user.lastName }}. 
    {{ user.gender === 'male' ? 'Мужского' : 'Женского' }} пола.
  </p>
</template>

<script setup>
import { ref, reactive } from 'vue';

const user = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  password: '',
  confirmPassword: ''
});

const showPassword = ref(false);

function register() {
  console.log('Данные пользователя:', user);
}
</script>

<style>
form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input, button {
  display: block;
  margin: 10px 0;
  width: 100%;
  padding: 8px;
}
button:disabled {
  opacity: 0.5;
}
</style>
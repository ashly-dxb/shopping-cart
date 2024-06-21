<template>
    <button class="dark-mode-toggle" @click="toggleDarkMode">
        {{ isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
        <span class="icon" v-html="isDarkMode ? moonIcon : sunIcon" />
    </button>
</template>




<script setup>
import { ref, computed, onMounted } from 'vue';

const isDarkMode = ref(JSON.parse(localStorage.getItem('darkMode') ?? 'false'))

const styleProperties = computed( () => ({
  '--background-color'  : isDarkMode.value ? '#000' : '#fff',
  '--text-color'        : isDarkMode.value ? '#fff' : '#000'
}) );

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
  <path d="M8 4.41a3.59 3.59 0 1 1 0 7.18 3.59 3.59 0 0 1 0-7.18zM8 1a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0V1.5A.5.5 0 0 1 8 1zm0 12a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0v-1.5a.5.5 0 0 1 .5-.5zm6-6a.5.5 0 0 1 .5.5h1.5a.5.5 0 0 1 0 1H14.5a.5.5 0 0 1-.5-.5zm-12 0A.5.5 0 0 1 2 8H.5a.5.5 0 0 1 0-1H2a.5.5 0 0 1 .5.5zm9.396 5.106a.5.5 0 0 1 .708 0l1.06 1.06a.5.5 0 1 1-.708.708l-1.06-1.06a.5.5 0 0 1 0-.708zM3.146 3.854a.5.5 0 0 1 .708 0L4.914 5.56a.5.5 0 1 1-.708.708L3.146 4.562a.5.5 0 0 1 0-.708zm9.708 9.292a.5.5 0 0 1 .708 0L14.06 14.44a.5.5 0 0 1-.708.708l-1.06-1.06a.5.5 0 0 1 0-.708zM3.146 14.44a.5.5 0 0 1 0 .708l-1.06 1.06a.5.5 0 1 1-.708-.708l1.06-1.06a.5.5 0 0 1 .708 0z"/>
</svg>`

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
  <path d="M14.53 11.29c.801-1.422.852-3.108.172-4.614-.679-1.506-1.946-2.578-3.465-2.932a.5.5 0 0 0-.568.271A5.023 5.023 0 0 0 9 9.75c0 1.01.374 1.93.973 2.628a.5.5 0 0 0 .567.274 5.538 5.538 0 0 0 4.257-2.064.5.5 0 0 0-.267-.79z"/>
</svg>`

function applyStyles () {
  for (const [key, value] of Object.entries(styleProperties.value)) {
    document.documentElement.style.setProperty(key, value)
  }
}

function toggleDarkMode () {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value));
  applyStyles();
}

// On component mount, apply the stored or default styles
onMounted(applyStyles);
</script>



<style scoped>
.dark-mode-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 16px;
  
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  border-radius: 5px;

  cursor: pointer;
}

.icon {
  display: inline-block;
  margin-left: 10px;
}

:root {
  --background-color: #FFF;
  --text-color: #333;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}
</style>

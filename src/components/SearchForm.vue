<template>
  <div class="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-4">Find Your Perfect Tee Time</h2>
        <p class="text-primary-100 text-lg">Book golf courses at the best prices near you</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-xl p-6">
        <form @submit.prevent="handleSearch" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              v-model="searchForm.location"
              placeholder="City, State or ZIP"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
          
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              v-model="searchForm.date"
              :min="today"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
          
          <div>
            <label for="time" class="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <select
              id="time"
              v-model="searchForm.time"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any Time</option>
              <option value="morning">Morning (6AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 6PM)</option>
              <option value="twilight">Twilight (After 6PM)</option>
            </select>
          </div>
          
          <div>
            <label for="players" class="block text-sm font-medium text-gray-700 mb-1">Players</label>
            <select
              id="players"
              v-model="searchForm.players"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option :value="1">1 Player</option>
              <option :value="2">2 Players</option>
              <option :value="3">3 Players</option>
              <option :value="4">4 Players</option>
            </select>
          </div>
          
          <div class="flex items-end">
            <button
              type="submit"
              class="w-full bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
              Search Tee Times
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const emit = defineEmits(['search']);

const searchForm = ref({
  location: 'San Francisco, CA',
  date: '',
  time: '',
  players: 2
});

const today = new Date().toISOString().split('T')[0];

const handleSearch = () => {
  emit('search', { ...searchForm.value });
};

onMounted(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  searchForm.value.date = tomorrow.toISOString().split('T')[0];
});
</script>
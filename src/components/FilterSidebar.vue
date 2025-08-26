<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
    
    <!-- Price Range -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
      <div class="space-y-2">
        <div class="flex justify-between text-sm text-gray-600">
          <span>${{ filters.priceRange[0] }}</span>
          <span>${{ filters.priceRange[1] }}</span>
        </div>
        <input
          type="range"
          :min="0"
          :max="1000"
          v-model="filters.priceRange[0]"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          @input="updateFilters"
        >
        <input
          type="range"
          :min="0"
          :max="1000"
          v-model="filters.priceRange[1]"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          @input="updateFilters"
        >
      </div>
    </div>
    
    <!-- Course Type -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Course Type</h4>
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            type="checkbox"
            value="18"
            v-model="filters.holes"
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            @change="updateFilters"
          >
          <span class="ml-2 text-sm text-gray-600">18 Holes</span>
        </label>
        <label class="flex items-center">
          <input
            type="checkbox"
            value="9"
            v-model="filters.holes"
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            @change="updateFilters"
          >
          <span class="ml-2 text-sm text-gray-600">9 Holes</span>
        </label>
      </div>
    </div>
    
    <!-- Difficulty -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Difficulty</h4>
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            type="checkbox"
            value="Easy"
            v-model="filters.difficulty"
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            @change="updateFilters"
          >
          <span class="ml-2 text-sm text-gray-600">Easy</span>
        </label>
        <label class="flex items-center">
          <input
            type="checkbox"
            value="Moderate"
            v-model="filters.difficulty"
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            @change="updateFilters"
          >
          <span class="ml-2 text-sm text-gray-600">Moderate</span>
        </label>
        <label class="flex items-center">
          <input
            type="checkbox"
            value="Difficult"
            v-model="filters.difficulty"
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            @change="updateFilters"
          >
          <span class="ml-2 text-sm text-gray-600">Difficult</span>
        </label>
      </div>
    </div>
    
    <!-- Amenities -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Amenities</h4>
      <div class="space-y-2">
        <label class="flex items-center" v-for="amenity in popularAmenities" :key="amenity">
          <input
            type="checkbox"
            :value="amenity"
            v-model="filters.amenities"
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            @change="updateFilters"
          >
          <span class="ml-2 text-sm text-gray-600">{{ amenity }}</span>
        </label>
      </div>
    </div>
    
    <!-- Distance -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Distance</h4>
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            type="radio"
            value="10"
            v-model="filters.radius"
            class="text-primary-600 focus:ring-primary-500"
            @change="updateFilters"
          >
          <span class="ml-2 text-sm text-gray-600">Within 10 miles</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="25"
            v-model="filters.radius"
            class="text-primary-600 focus:ring-primary-500"
            @change="updateFilters"
          >
          <span class="ml-2 text-sm text-gray-600">Within 25 miles</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="50"
            v-model="filters.radius"
            class="text-primary-600 focus:ring-primary-500"
            @change="updateFilters"
          >
          <span class="ml-2 text-sm text-gray-600">Within 50 miles</span>
        </label>
      </div>
    </div>
    
    <button
      @click="clearFilters"
      class="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
    >
      Clear All Filters
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SearchFilters } from '../types/golf';

const emit = defineEmits(['filtersChanged']);

const filters = ref<SearchFilters>({
  location: '',
  date: '',
  time: '',
  players: 2,
  priceRange: [0, 1000],
  radius: 25,
  holes: [],
  amenities: [],
  difficulty: []
});

const popularAmenities = [
  'Pro Shop',
  'Restaurant',
  'Cart Rental',
  'Driving Range',
  'Putting Green',
  'Caddie Service'
];

const updateFilters = () => {
  emit('filtersChanged', { ...filters.value });
};

const clearFilters = () => {
  filters.value = {
    location: '',
    date: '',
    time: '',
    players: 2,
    priceRange: [0, 1000],
    radius: 25,
    holes: [],
    amenities: [],
    difficulty: []
  };
  updateFilters();
};
</script>
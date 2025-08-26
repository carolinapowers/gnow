<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="relative">
      <img 
        :src="course.image" 
        :alt="course.name"
        class="w-full h-48 object-cover"
      >
      <div class="absolute top-3 left-3">
        <div class="flex items-center space-x-1">
          <div class="flex items-center bg-white rounded-full px-2 py-1 text-xs font-medium">
            <svg class="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span>{{ course.rating }}</span>
            <span class="text-gray-500 ml-1">({{ course.reviewCount }})</span>
          </div>
        </div>
      </div>
      <div class="absolute top-3 right-3" v-if="course.deals && course.deals.length > 0">
        <div class="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          DEAL
        </div>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ course.name }}</h3>
      <p class="text-sm text-gray-600 mb-2">{{ course.location.city }}, {{ course.location.state }}</p>
      <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ course.description }}</p>
      
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-4 text-xs text-gray-500">
          <span>{{ course.holes }} Holes</span>
          <span>Par {{ course.par }}</span>
          <span class="px-2 py-1 bg-gray-100 rounded-full">{{ course.difficulty }}</span>
        </div>
      </div>
      
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-baseline space-x-1">
            <span class="text-lg font-bold text-gray-900">${{ course.priceRange.min }}</span>
            <span class="text-sm text-gray-500">- ${{ course.priceRange.max }}</span>
          </div>
          <p class="text-xs text-gray-500">per person</p>
        </div>
        <button 
          @click="viewTeeTimes"
          class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          View Times
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GolfCourse } from '../types/golf';

interface Props {
  course: GolfCourse;
}

defineProps<Props>();

const emit = defineEmits(['viewTeeTimes']);

const viewTeeTimes = () => {
  emit('viewTeeTimes');
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
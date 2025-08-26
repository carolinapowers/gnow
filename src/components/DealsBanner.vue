<template>
  <div class="bg-gradient-to-r from-accent-400 to-accent-600 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Today's Best Deals</h2>
        <p class="text-accent-100">Limited time offers on premium golf courses</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="deal in featuredDeals" 
          :key="deal.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-accent-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {{ deal.discount }}% OFF
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-gray-900">${{ deal.dealPrice }}</div>
                <div class="text-sm text-gray-400 line-through">${{ deal.originalPrice }}</div>
              </div>
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ deal.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ deal.description }}</p>
            
            <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Valid until {{ formatDate(deal.validUntil) }}</span>
              <span v-if="deal.restrictions">*Restrictions apply</span>
            </div>
            
            <button class="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { mockCourses } from '../data/mockData';

const featuredDeals = computed(() => {
  return mockCourses
    .filter(course => course.deals && course.deals.length > 0)
    .slice(0, 3)
    .map(course => course.deals![0]);
});

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>
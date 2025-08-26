<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click.self="closeModal"
  >
    <div class="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-gray-900">{{ course?.name }}</h3>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Course Info -->
        <div class="lg:col-span-1">
          <img 
            :src="course?.image" 
            :alt="course?.name"
            class="w-full h-48 object-cover rounded-lg mb-4"
          >
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm text-gray-600">{{ course?.location.address }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span class="text-sm text-gray-600">{{ course?.phoneNumber }}</span>
            </div>
            <div class="flex flex-wrap gap-1 mt-3">
              <span 
                v-for="amenity in course?.amenities.slice(0, 4)" 
                :key="amenity"
                class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {{ amenity }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Available Tee Times -->
        <div class="lg:col-span-2">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Available Tee Times</h4>
          
          <div class="mb-4">
            <input
              type="date"
              v-model="selectedDate"
              :min="today"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            <div 
              v-for="teeTime in availableTeeTimes" 
              :key="teeTime.id"
              class="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer"
              :class="{ 'border-primary-500 bg-primary-50': selectedTeeTime?.id === teeTime.id }"
              @click="selectTeeTime(teeTime)"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="text-lg font-semibold text-gray-900">{{ teeTime.time }}</div>
                <div v-if="teeTime.deal" class="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  DEAL
                </div>
              </div>
              
              <div class="space-y-1">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Price per person:</span>
                  <div class="flex items-center space-x-2">
                    <span v-if="teeTime.originalPrice" class="text-sm text-gray-400 line-through">
                      ${{ teeTime.originalPrice }}
                    </span>
                    <span class="font-bold text-gray-900">${{ teeTime.price }}</span>
                  </div>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Available spots:</span>
                  <span class="text-sm text-gray-900">{{ teeTime.maxPlayers - teeTime.players }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-6 pt-6 border-t border-gray-200" v-if="selectedTeeTime">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h5 class="text-lg font-semibold text-gray-900">Total</h5>
                <p class="text-sm text-gray-600">{{ playersCount }} {{ playersCount === 1 ? 'player' : 'players' }}</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-gray-900">${{ selectedTeeTime.price * playersCount }}</div>
                <div v-if="selectedTeeTime.originalPrice" class="text-sm text-gray-400 line-through">
                  ${{ selectedTeeTime.originalPrice * playersCount }}
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <label for="players" class="block text-sm font-medium text-gray-700 mb-1">Number of Players</label>
              <select
                id="players"
                v-model="playersCount"
                :max="selectedTeeTime.maxPlayers - selectedTeeTime.players"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option 
                  v-for="n in (selectedTeeTime.maxPlayers - selectedTeeTime.players)" 
                  :key="n" 
                  :value="n"
                >
                  {{ n }} {{ n === 1 ? 'Player' : 'Players' }}
                </option>
              </select>
            </div>
            
            <button 
              @click="bookTeeTime"
              class="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium text-lg transition-colors duration-200"
            >
              Book This Tee Time
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { GolfCourse, TeeTime } from '../types/golf';
import { mockTeeTimes } from '../data/mockData';

interface Props {
  isOpen: boolean;
  course: GolfCourse | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'book']);

const selectedDate = ref('');
const selectedTeeTime = ref<TeeTime | null>(null);
const playersCount = ref(1);
const today = new Date().toISOString().split('T')[0];

const availableTeeTimes = computed(() => {
  if (!props.course || !selectedDate.value) return [];
  
  return mockTeeTimes.filter(teeTime => 
    teeTime.courseId === props.course?.id && 
    teeTime.date === selectedDate.value && 
    teeTime.available
  );
});

const closeModal = () => {
  emit('close');
  selectedTeeTime.value = null;
  playersCount.value = 1;
};

const selectTeeTime = (teeTime: TeeTime) => {
  selectedTeeTime.value = teeTime;
  playersCount.value = Math.min(1, teeTime.maxPlayers - teeTime.players);
};

const bookTeeTime = () => {
  if (selectedTeeTime.value) {
    emit('book', {
      teeTime: selectedTeeTime.value,
      players: playersCount.value,
      total: selectedTeeTime.value.price * playersCount.value
    });
    closeModal();
  }
};

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    selectedDate.value = tomorrow.toISOString().split('T')[0];
  }
});
</script>
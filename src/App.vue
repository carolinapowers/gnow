<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <AppHeader />
    <SearchForm @search="handleSearch" />
    <DealsBanner />
    
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:w-1/4">
          <FilterSidebar @filters-changed="handleFiltersChanged" />
        </aside>
        
        <!-- Course Listings -->
        <div class="lg:w-3/4">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Available Courses</h2>
              <p class="text-sm text-gray-600">{{ filteredCourses.length }} courses found</p>
            </div>
            
            <select 
              v-model="sortBy"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="distance">Closest First</option>
            </select>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CourseCard
              v-for="course in sortedCourses"
              :key="course.id"
              :course="course"
              @view-tee-times="openTeeTimeModal(course)"
            />
          </div>
          
          <!-- Pagination -->
          <div class="mt-8 flex justify-center">
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :disabled="currentPage === 1"
              >
                Previous
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                :class="[
                  page === currentPage
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :disabled="currentPage === totalPages"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Tee Time Modal -->
    <TeeTimeModal
      :is-open="isTeeTimeModalOpen"
      :course="selectedCourse"
      @close="closeTeeTimeModal"
      @book="handleBooking"
    />
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">GolfTime</h3>
            <p class="text-gray-400">Find and book the best golf courses at unbeatable prices.</p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white">Tee Times</a></li>
              <li><a href="#" class="hover:text-white">Courses</a></li>
              <li><a href="#" class="hover:text-white">Deals</a></li>
              <li><a href="#" class="hover:text-white">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white">Help Center</a></li>
              <li><a href="#" class="hover:text-white">Contact Us</a></li>
              <li><a href="#" class="hover:text-white">Cancellation Policy</a></li>
              <li><a href="#" class="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Connect</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white">Facebook</a></li>
              <li><a href="#" class="hover:text-white">Twitter</a></li>
              <li><a href="#" class="hover:text-white">Instagram</a></li>
              <li><a href="#" class="hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 GolfTime. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { GolfCourse, SearchFilters } from './types/golf';
import { mockCourses } from './data/mockData';

import AppHeader from './components/AppHeader.vue';
import SearchForm from './components/SearchForm.vue';
import DealsBanner from './components/DealsBanner.vue';
import FilterSidebar from './components/FilterSidebar.vue';
import CourseCard from './components/CourseCard.vue';
import TeeTimeModal from './components/TeeTimeModal.vue';

// State
const searchQuery = ref('');
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

const sortBy = ref('price-low');
const currentPage = ref(1);
const itemsPerPage = 6;
const isTeeTimeModalOpen = ref(false);
const selectedCourse = ref<GolfCourse | null>(null);

// Computed
const filteredCourses = computed(() => {
  let filtered = [...mockCourses];
  
  // Apply price range filter
  filtered = filtered.filter(course => 
    course.priceRange.min >= filters.value.priceRange[0] &&
    course.priceRange.max <= filters.value.priceRange[1]
  );
  
  // Apply holes filter
  if (filters.value.holes.length > 0) {
    filtered = filtered.filter(course => 
      filters.value.holes.includes(course.holes.toString())
    );
  }
  
  // Apply difficulty filter
  if (filters.value.difficulty.length > 0) {
    filtered = filtered.filter(course => 
      filters.value.difficulty.includes(course.difficulty)
    );
  }
  
  // Apply amenities filter
  if (filters.value.amenities.length > 0) {
    filtered = filtered.filter(course => 
      filters.value.amenities.every(amenity => course.amenities.includes(amenity))
    );
  }
  
  return filtered;
});

const sortedCourses = computed(() => {
  const sorted = [...filteredCourses.value];
  
  switch (sortBy.value) {
    case 'price-low':
      return sorted.sort((a, b) => a.priceRange.min - b.priceRange.min);
    case 'price-high':
      return sorted.sort((a, b) => b.priceRange.max - a.priceRange.max);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'distance':
      // Mock distance sorting
      return sorted.sort(() => Math.random() - 0.5);
    default:
      return sorted;
  }
});

const totalPages = computed(() => Math.ceil(sortedCourses.value.length / itemsPerPage));

// Methods
const handleSearch = (searchData: any) => {
  searchQuery.value = searchData.location;
  console.log('Search:', searchData);
};

const handleFiltersChanged = (newFilters: SearchFilters) => {
  filters.value = { ...newFilters };
  currentPage.value = 1;
};

const openTeeTimeModal = (course: GolfCourse) => {
  selectedCourse.value = course;
  isTeeTimeModalOpen.value = true;
};

const closeTeeTimeModal = () => {
  isTeeTimeModalOpen.value = false;
  selectedCourse.value = null;
};

const handleBooking = (bookingData: any) => {
  console.log('Booking:', bookingData);
  // Here you would handle the actual booking logic
  alert(`Booking confirmed! Total: $${bookingData.total}`);
};
</script>
<template>
  <div class="tab-container">
    <div class="tab-list">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="$emit('filter-change', filter.value)"
        :class="{ active: currentFilter === filter.value }"
        class="tab-button"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Filter {
  label: string;
  value: string;
}

interface Props {
  currentFilter: string;
  filters: Filter[];
}

defineProps<Props>();
defineEmits<{
  'filter-change': [value: string];
}>();
</script>

<style scoped>
.tab-container {
  margin-bottom: 30px;
}

.tab-list {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  background-color: #f8f9fa;
  border-radius: 8px 8px 0 0;
  padding: 0;
  margin: 0;
}

.tab-button {
  flex: 1;
  padding: 12px 20px;
  background-color: transparent;
  color: #666;
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 3px solid transparent;
}

.tab-button:hover {
  background-color: #e9ecef;
  color: #495057;
}

.tab-button.active {
  background-color: #4CAF50;
  color: white;
  border-bottom-color: #4CAF50;
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #4CAF50;
}
</style>

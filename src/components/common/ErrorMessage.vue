<template>
  <div class="flex flex-col items-center gap-4 p-6 text-red-600 bg-red-50 rounded-lg">
    <div class="flex items-center gap-2">
      <AlertCircle class="w-5 h-5" />
      <span class="font-medium">{{ message }}</span>
    </div>
    <button
      v-if="$slots.retry"
      @click="$emit('retry')"
      class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
    >
      <RefreshCw class="w-4 h-4" />
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, RefreshCw } from 'lucide-vue-next';

defineProps<{
  message: string;
}>();

defineEmits(['retry']);
</script>
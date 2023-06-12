<template>
  <span class="toggle-wrapper">
    <input id="sw" v-model="refOnOff" type="checkbox" />
    <label class="toggle" for="sw"><span class="toggle-handler"></span></label>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const refOnOff = ref(true)
</script>

<style>
@import '../css/config.css';
</style>

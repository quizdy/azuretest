<template>
  <div>
    google tag manager id: {{ id }}
  </div>
</template>

<script setup lang="ts">
const $config = useRuntimeConfig()
const id = $config.public.GTM_ID
</script>

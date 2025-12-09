<template>
  <v-app-bar
    density="compact"
    class="app-default-layout-header header"
  >
    <object
      class="header__logo logo ml-12 mr-4"
      data="https://storage.yandexcloud.net/forlogo/logo.svg"
    />

    <v-app-bar-title>Управление задачами</v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.app-default-layout-header {
  .header {
    &__logo {
      height: 100%;
    }
  }
}
</style>

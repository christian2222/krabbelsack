<script setup>
import Krabbelsack from './components/Krabbelsack.vue'
</script>

<template>
  <header>
    <div class="wrapper">
    </div>
  </header>

  <main>
    <div class="wrapper">
    <h1 class="green">Krabbelsack</h1>
      <Krabbelsack />
    </div>
</main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

<script setup lang="ts">
import ListingsSlider from '~/modules/listing/components/shared/ListingsSlider.vue'
import About from '~/modules/mainPage/About.vue'
import Advantages from '~/modules/mainPage/Advantages.vue'
import ContactsBlock from '~/modules/mainPage/ContactsBlock.vue'
import HeroSection from '~/modules/mainPage/HeroSection.vue'

useSeoMeta({
  title: 'Сдать квартиру посуточно в Москве. Полное управление, высокая доходность',
  description:
      'Сдача квартир посуточно в Москве с гарантией надежности и стабильного дохода. Обеспечу профессиональный подход, безопасное управление и высокую заполняемость.',
  ogTitle: 'Сдать квартиру посуточно в Москве. Полное управление, высокая доходность',
  ogDescription:
      'Сдача квартир посуточно в Москве с гарантией надежности и стабильного дохода. Обеспечу профессиональный подход, безопасное управление и высокую заполняемость.',
  ogImage: '/hero.jpeg'
})
</script>

<template>
  <div>
    <HeroSection />
    <main>
      <ListingsSlider />
      <About />

      <Advantages />
      <ContactsBlock class="mt-10" />
    </main>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  import WorkIcon from '~/modules/mainPage/icons/adv/WorkIcon.vue';
  import KeyIcon from '~/modules/mainPage/icons/adv/KeyIcon.vue';
  import GraphIcon from '~/modules/mainPage/icons/adv/GraphIcon.vue';
  import SupportIcon from '~/modules/mainPage/icons/adv/SupportIcon.vue';
</script>

<template>
  <section class="wrapper text-center pt-14">
    <p class="font-semibold text-accent">Мои Преимущества</p>
    <h2 class="font-bold text-2xl sm:text-3xl mb-8">Почему выбирают меня?</h2>

    <ul class="advantages">
      <li class="advantage">
        <WorkIcon class="advantage__icon" />
        <h3 class="advantage__title">Полный цикл работы</h3>
        <p class="advantage__text">От фотосессии до заселения клиентов.</p>
      </li>
      <li class="advantage">
        <KeyIcon class="advantage__icon" />
        <h3 class="advantage__title">Гарантия безопасности</h3>
        <p class="advantage__text">Проверка арендаторов и страхование.</p>
      </li>
      <li class="advantage">
        <GraphIcon class="advantage__icon" />
        <h3 class="advantage__title">Высокая прибыльность</h3>
        <p class="advantage__text">Заполняемость квартир до 95%.</p>
      </li>
      <li class="advantage">
        <SupportIcon class="advantage__icon" />
        <h3 class="advantage__title">Поддержка 24/7</h3>
        <p class="advantage__text">Всегда на связи с клиентами.</p>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
  import useBurgerMenu from '~/modules/menu/composables/useBurgerMenu';
  import MainLogo from '~/modules/menu/icons/MainLogo.vue';
  import BurgerIcon from '~/modules/menu/icons/BurgerIcon.vue';
  import useLinks from '~/modules/menu/composables/useLinks';
  import AddressIcon from '~/modules/mainPage/icons/contacts/AddressIcon.vue';
  import WhatsUpIcon from '~/modules/mainPage/icons/WhatsUpIcon.vue';
  import MailIcon from '~/modules/mainPage/icons/contacts/MailIcon.vue';
  import TelegramIcon from '~/modules/mainPage/icons/TelegramIcon.vue';
  import PhoneIcon from '~/modules/mainPage/icons/contacts/PhoneIcon.vue';
  import useModals from '~/common/composables/useModals';
  import useAuthUser from '~/modules/auth/composables/useAuthUser';
  import ContactsBlock from '~/modules/mainPage/ContactsBlock.vue';

  const { burgerMenuIsOpen, open, close } = useBurgerMenu();
  const links = useLinks();

  async function goToLink(link: string) {
    burgerMenuIsOpen.value = false;
    await navigateTo({
      path: link,
    });
  }

  const authUser = useAuthUser();

  const { openCallSubmitModal } = useModals();

  const openSubmitModal = () => {
    burgerMenuIsOpen.value = false;
    openCallSubmitModal();
  };
</script>

<template>
  <USlideover v-model:open="burgerMenuIsOpen" side="left" fullscreen :ui="{ wrapper: 'z-[1000]' }">
    <template #header>
      <div class="flex justify-between w-full">
        <MainLogo />
        <button class="block p-0 ml-auto" @click="close()">
          <UIcon class="h-7 w-7" name="i-material-symbols:close-rounded" />
        </button>
      </div>
    </template>

    <template #body>
      <div
        v-for="link of links"
        :key="link.to"
        :class="[
          'flex items-center gap-4 text-lg py-2 px-4 rounded-full mb-2 active:bg-gray-50 transition-all',
          link.isActive && 'bg-gray-100',
        ]"
        @click="goToLink(link.to)"
      >
        <UIcon class="h-6 w-6" :name="link.icon" />
        <span>{{ link.label }}</span>
      </div>
      <div class="px-4 mt-8">
        <UButton
          v-if="authUser && authUser.role === 'ADMIN'"
          variant="soft"
          block
          class="mb-4"
          to="/admin/create-listing"
          >Создать объект</UButton
        >
        <UButton block class="mb-4" @click="openSubmitModal">Заявка на звонок</UButton>
      </div>
      <div class="px-4 mt-6">
        <h3 class="font-semibold text-xl mb-6">Мои контакты</h3>
        <div class="contact">
          <PhoneIcon class="contact__icon" />
          <div class="contact__info">
            <div class="contact__title">Телефон</div>
            <NuxtLink to="tel:/+79816981100" class="contact__data">+7 (981) 698-11-00</NuxtLink>
            <NuxtLink to="tel:/+79939163454" class="contact__data">+7 (993) 916-34-54</NuxtLink>
            <div class="flex gap-4 mt-3 flex-wrap">
              <UButton class="rounded-full py-1" to="https://wa.me/79816981100">
                <template #leading>
                  <WhatsUpIcon fill="white" />
                </template>
                Whats up
              </UButton>
              <UButton class="rounded-full py-1" to="https://t.me/Mir_durov">
                <template #leading>
                  <TelegramIcon fill="white" />
                </template>
                Telegram
              </UButton>
            </div>
          </div>
        </div>
        <div class="contact">
          <AddressIcon class="contact__icon" />
          <div class="contact__info">
            <div class="contact__title">Адрес</div>
            <div class="contact__data">Овражная улица, 47А, Новоивановское, Московская Область</div>
          </div>
        </div>
        <div class="contact">
          <MailIcon class="contact__icon" />
          <div class="contact__info">
            <div class="contact__title">Почта</div>
            <div class="contact__data">sheikhov.amin@mail.ru</div>
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<style scoped lang="scss"></style>

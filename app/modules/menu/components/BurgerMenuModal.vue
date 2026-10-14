<script setup lang="ts">
import useModals from '~/common/composables/useModals'
import useAuthUser from '~/modules/auth/composables/useAuthUser'
import TelegramIcon from '~/modules/mainPage/icons/TelegramIcon.vue'
import WhatsUpIcon from '~/modules/mainPage/icons/WhatsUpIcon.vue'
import useBurgerMenu from '~/modules/menu/composables/useBurgerMenu'
import useLinks from '~/modules/menu/composables/useLinks'
import MainLogo from '~/modules/menu/icons/MainLogo.vue'

const links = useLinks()

const { burgerMenuIsOpen } = useBurgerMenu()

async function goToLink(link: string) {
  burgerMenuIsOpen.value = false
  await navigateTo({
    path: link
  })
}

const authUser = useAuthUser()

const { openCallSubmitModal } = useModals()

function openSubmitModal() {
  burgerMenuIsOpen.value = false
  openCallSubmitModal()
}

function getLinkIcon(to: string) {
  const icons: Record<string, string> = {
    '/': 'i-lucide-house',
    '/contacts': 'i-lucide-phone-call',
    '/catalog': 'i-lucide-building-2'
  }

  return icons[to] ?? 'i-lucide-circle'
}
</script>

<template>
  <UDrawer
    v-model:open="burgerMenuIsOpen"
    direction="left"
    :handle="false"
    handle-only
    :content="{ style: { touchAction: 'pan-y pinch-zoom' } }"
    :close="{ 'aria-label': 'Закрыть меню', 'title': 'Закрыть меню', 'square': true }"
    :ui="{
      overlay: 'z-[1000] bg-black/40 backdrop-blur-xs',
      content: 'z-[1000] h-dvh w-screen max-w-[380px] overflow-hidden rounded-r-2xl shadow-xl sm:max-w-[420px]',
      container: 'h-full min-h-0 min-w-0 gap-0 overflow-hidden p-0',
      header: 'shrink-0 border-b border-gray-200 px-4 py-4 sm:px-5',
      body: 'min-h-0 min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-5'
    }"
  >
    <template #title>
      <MainLogo />
      <span class="sr-only">Главное меню</span>
    </template>

    <template #body>
      <div class="flex min-h-full flex-col">
        <div class="space-y-2">
          <UButton
            v-for="link of links"
            :key="link.to"
            :variant="link.isActive ? 'soft' : 'ghost'"
            :color="link.isActive ? 'primary' : 'neutral'"
            class="w-full justify-start text-base"
            :icon="getLinkIcon(link.to)"
            :aria-label="link.label"
            :title="link.label"
            :aria-current="link.isActive ? 'page' : undefined"
            @click="goToLink(link.to)"
          >
            {{ link.label }}
          </UButton>
        </div>

        <div class="mt-6 space-y-3">
          <UButton
            v-if="authUser && authUser.role === 'ADMIN'"
            variant="soft"
            color="primary"
            block
            icon="i-lucide-plus"
            @click="goToLink('/admin/create-listing')"
          >
            Создать объект
          </UButton>
          <UButton block icon="i-lucide-phone-call" @click="openSubmitModal">
            Заявка на звонок
          </UButton>
        </div>

        <section aria-labelledby="menu-contacts-title" class="mt-8 rounded-3xl border border-gray-200/80 bg-white p-4 shadow-card sm:p-5">
          <div class="mb-4">
            <h3 id="menu-contacts-title" class="text-lg font-semibold tracking-tight">
              Будем на связи
            </h3>
            <p class="mt-1 text-sm text-secondary">
              Поможем с выбором апартаментов
            </p>
          </div>

          <div class="rounded-2xl bg-accent-50 p-2">
            <NuxtLink
              to="tel:+79816981100"
              external
              aria-label="Позвонить по телефону +7 (981) 698-11-00"
              class="contact-action gap-3 rounded-xl px-2 hover:bg-white"
            >
              <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-accent-700" aria-hidden="true">
                <UIcon name="i-lucide-phone" class="size-4" />
              </span>
              <span class="text-[17px] font-semibold tracking-tight tabular-nums">+7 (981) 698-11-00</span>
            </NuxtLink>
            <NuxtLink
              to="tel:+79939163454"
              external
              aria-label="Позвонить по телефону +7 (993) 916-34-54"
              class="contact-action gap-3 rounded-xl px-2 hover:bg-white"
            >
              <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-accent-700" aria-hidden="true">
                <UIcon name="i-lucide-phone" class="size-4" />
              </span>
              <span class="text-[17px] font-semibold tracking-tight tabular-nums">+7 (993) 916-34-54</span>
            </NuxtLink>
          </div>

          <div class="mt-3 grid grid-cols-2 gap-2">
            <NuxtLink
              to="https://wa.me/79816981100"
              external
              aria-label="Написать в WhatsApp"
              class="contact-action justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 text-sm font-medium text-emerald-800 hover:border-emerald-200 hover:bg-emerald-100"
            >
              <WhatsUpIcon fill="currentColor" class="size-4 shrink-0" aria-hidden="true" />
              WhatsApp
            </NuxtLink>
            <NuxtLink
              to="https://t.me/Mir_durov"
              external
              aria-label="Написать в Telegram"
              class="contact-action justify-center gap-2 rounded-xl border border-sky-100 bg-sky-50 text-sm font-medium text-sky-800 hover:border-sky-200 hover:bg-sky-100"
            >
              <TelegramIcon fill="currentColor" class="size-4 shrink-0" aria-hidden="true" />
              Telegram
            </NuxtLink>
          </div>

          <div class="mt-5 space-y-1 border-t border-gray-100 pt-3">
            <NuxtLink
              to="https://yandex.com/maps/-/CHUZZD6-"
              external
              aria-label="Открыть адрес на карте"
              class="contact-action group gap-3 rounded-xl px-2 py-3 hover:bg-light-gray"
            >
              <UIcon name="i-lucide-map-pin" class="size-4 shrink-0 text-secondary group-hover:text-accent-700" aria-hidden="true" />
              <span class="min-w-0 text-sm leading-relaxed">
                <span class="block font-medium">Овражная улица, 47А</span>
                <span class="text-secondary">Новоивановское, Московская область</span>
              </span>
            </NuxtLink>
            <NuxtLink
              to="mailto:sheikhov.amin@mail.ru"
              external
              class="contact-action group gap-3 rounded-xl px-2 py-3 hover:bg-light-gray"
            >
              <UIcon name="i-lucide-mail" class="size-4 shrink-0 text-secondary group-hover:text-accent-700" aria-hidden="true" />
              <span class="min-w-0 break-all text-sm">sheikhov.amin@mail.ru</span>
            </NuxtLink>
          </div>
        </section>

        <div class="mt-auto pt-6 text-sm text-gray-500">
          Sky Apartments
        </div>
      </div>
    </template>
  </UDrawer>
</template>

<style scoped lang="scss">
  .contact-action {
    display: flex;
    align-items: center;
    min-height: 48px;
    transition: background-color 0.2s, border-color 0.2s;

    &:focus-visible {
      outline: 2px solid var(--color-accent-700);
      outline-offset: 3px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .contact-action {
      transition: none;
    }
  }
</style>

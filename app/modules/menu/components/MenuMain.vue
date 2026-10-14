<script setup lang="ts">
import useAuthUser from '~/modules/auth/composables/useAuthUser'
import useBurgerMenu from '~/modules/menu/composables/useBurgerMenu'
import useLinks from '~/modules/menu/composables/useLinks'
import MainLogo from '~/modules/menu/icons/MainLogo.vue'

const { open } = useBurgerMenu()

const authUser = useAuthUser()

const links = useLinks()

function getLinkIcon(to: string) {
  const icons: Record<string, string> = {
    '/': 'i-lucide-house',
    '/contacts': 'i-lucide-phone-call',
    '/catalog': 'i-lucide-building-2'
  }

  return icons[to] ?? 'i-lucide-circle'
}

const navigationItems = computed(() =>
  links.value.map(link => ({
    label: link.label,
    to: link.to,
    icon: getLinkIcon(link.to),
    active: link.isActive,
    class: 'min-h-9'
  }))
)
</script>

<template>
  <nav class="menu-main w-full border-b border-black/10">
    <div class="wrapper h-14 flex items-center gap-3">
      <NuxtLink
        to="/"
        external
        title="Главная страница"
        aria-label="Главная страница"
        class="block shrink-0 pr-3 lg:pr-4"
      >
        <MainLogo />
      </NuxtLink>

      <UNavigationMenu
        :items="navigationItems"
        color="neutral"
        class="hidden lg:flex min-w-0"
        :ui="{
          root: 'min-w-0',
          list: 'gap-1',
          link: 'px-3 py-2 text-sm'
        }"
      />

      <div class="hidden lg:flex items-center gap-1.5 ml-auto">
        <UButton
          v-if="authUser && authUser.role === 'ADMIN'"
          to="/admin/create-listing"
          icon="i-lucide-plus"
          variant="soft"
          color="primary"
          size="sm"
        >
          Создать
        </UButton>

        <UButton
          v-else
          variant="soft"
          color="neutral"
          icon="i-lucide-phone"
          to="tel:/+79816981100"
          title="Позвонить"
          aria-label="Позвонить"
          size="sm"
        >
          <span class="max-[1320px]:hidden">+7 (981) 698-11-00</span>
        </UButton>

        <UButton
          to="https://wa.me/79816981100"
          variant="soft"
          color="primary"
          icon="i-lucide-message-circle"
          class="h-9 w-9 justify-center"
          aria-label="Написать в WhatsApp"
          title="Написать в WhatsApp"
          size="sm"
        />

        <UButton
          to="https://t.me/Mir_durov"
          variant="soft"
          color="primary"
          icon="i-lucide-send"
          class="h-9 w-9 justify-center"
          aria-label="Написать в Telegram"
          title="Написать в Telegram"
          size="sm"
        />
      </div>

      <UButton
        class="lg:hidden ml-auto"
        color="neutral"
        variant="ghost"
        icon="i-lucide-menu"
        size="sm"
        square
        aria-label="Открыть меню"
        title="Открыть меню"
        @click="open()"
      />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .menu-main {
    box-shadow: var(--shadow-card);
    background: color-mix(in srgb, white 92%, var(--color-block-gray));
    backdrop-filter: blur(10px);
  }
</style>

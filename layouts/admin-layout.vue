<script setup lang="ts">
  const { width } = useWindowSize()

  const menus = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      route: '/admin',
    },
    {
      label: 'Produtos',
      icon: 'pi pi-fw pi-shopping-bag',
      route: '/admin/produtos',
    },
    {
      label: 'Categorias',
      icon: 'pi pi-fw pi-list',
      route: '/admin/categorias',
    },
    {
      label: 'Tags',
      icon: 'pi pi-fw pi-tags',
      route: '/admin/tags',
    },
    {
      label: 'Pedidos',
      icon: 'pi pi-fw pi-shopping-cart',
      route: '/admin/pedidos',
    },
  ]
  const { logout } = useAuth()
</script>

<template>
  <div class="flex h-screen w-full flex-col">
    <Toast :position="width < 768 ? 'bottom-center' : 'top-right'" />
    <Menubar :model="menus">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <NuxtLink v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </NuxtLink>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Button text icon="pi pi-user" label="Meu Perfil" class="rounded" />
          <Button label="Sair" text icon="pi pi-sign-out" class="rounded" @click="logout" />
        </div>
      </template>
    </Menubar>
    <slot />
  </div>
</template>

<style scoped></style>

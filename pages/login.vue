<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
  })

  const { login, error } = useAuth()

  const form = ref({
    email: '',
    password: '',
  })

  const handleLogin = async () => {
    await login(form.value)
  }
</script>

<template>
  <div class="flex w-full flex-col justify-center border">
    <div>{{ error }}</div>
    <Card class="card-login">
      <template #title>
        <h3 class="card-login__title"> Login </h3>
      </template>
      <template #content>
        <form class="card-login__form" @submit.prevent="handleLogin">
          <div class="card-login__form-group">
            <InputText
              id="email"
              v-model="form.email"
              type="text"
              class="w-full"
              placeholder="Email"
            />
            <small id="email-help" class="invisible text-red-500">
              Enter your username to reset your password.
            </small>
          </div>
          <div class="flex flex-col gap-1">
            <InputText
              id="password"
              v-model="form.password"
              type="password"
              class="w-full"
              placeholder="Senha"
            />
          </div>
          <Button type="submit" label="Entrar" class="w-full" />
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
  .card-login {
    @apply mx-auto h-fit max-w-md self-center;

    &__title {
      @apply text-center text-2xl font-bold;
    }

    &__form {
      @apply flex flex-col gap-4;
    }

    &__form-group {
      @apply flex flex-col gap-1;
    }
  }
</style>

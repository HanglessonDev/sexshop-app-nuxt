<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
  })
  const { register } = useAuth()
  const form = ref({
    email: '',
    password: '',
    role: 'client',
  })

  const handleRegister = async () => {
    await register(form.value)
  }
</script>

<template>
  <div class="grid w-full grid-cols-2">
    <Card class="card-register">
      <template #title>
        <h3 class="card-register__title"> Registro </h3>
      </template>
      <template #content>
        <form class="card-register__form" action="" @submit.prevent="handleRegister">
          <div class="card-register__form-group">
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
            <small id="password-help" class="invisible text-red-500">
              Enter your username to reset your password.
            </small>
          </div>
          <Button type="submit" class="w-full font-bold uppercase">Criar nova conta</Button>
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
  .card-register {
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

<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Тут ничего нет...
      </div>

      <q-btn
        class="q-mt-xl"
        color="accent"
        text-color="white"
        to="/"
        label="Главная"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

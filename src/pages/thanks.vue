<template>
  <div class="fullscreen  text-center q-pa-md flex flex-center">
    <div>

      <div class="text-h2" style="opacity:.4">
        Спасибо, ваши данные приняты. Менеджер позвонит в течение 15 минут
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
  name: 'Error404',
  mounted() {
    const script = document.createElement("script");
    script.innerText= `
 (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(76548748, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });

    `;
    document.body.appendChild(script);
  },
}
</script>

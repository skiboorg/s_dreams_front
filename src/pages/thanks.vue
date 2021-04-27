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

    const script1 = document.createElement("script");
    script1.innerText= `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1156795551451488');
  fbq('track', 'PageView');
  fbq('track', 'CompleteRegistration');

    `;
    document.body.appendChild(script1);
  },
}
</script>

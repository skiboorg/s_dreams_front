<template>
  <q-page>
    <div class="container thanks-page">

      <h3 class="text-h3 text-primary text-weight-bold">Спасибо, Ваш заказ принят!</h3>
      <p class="text-h4 text-weight-semi-bold thanks-page__line1">Менеджер свяжется с Вами в течении 15 минут.</p>
      <p class="text-h5 text-weight-semi-bold thanks-page__line2">Вы видели все наши товары? Добавьте к заказу по приятной цене !</p>
      <img class="thanks-page__img" src="../assets/thanks-img.png" alt="">
  </div>
      <section ref="catalog" class="catalog">
      <div class="container">

        <div class="catalog-grid ">
          <q-card  class="catalog-card" v-for="(item,index) in items" :key="item.id">
            <q-img :ratio="4/3"  :src="item.image" />
            <q-card-section>
              <p class="col text-h6 text-weight-semi-bold ellipsis text-grey-10 q-mb-none">{{item.name}}</p>
              <p class="col text-caption text-weight-semi-bold ellipsis text-grey-6 q-mb-sm font-size-10">Артикул: {{item.article}}</p>

            </q-card-section>
            <q-card-section class="q-pt-none">
              <p class="font-size-18  text-grey-8 q-mb-none">Состав: <span class="text-grey-5">{{item.sostav}}</span>   </p>
              <p class="font-size-18  text-grey-8 q-mb-md">Производство: <span class="text-grey-5">{{item.country}}</span>   </p>
              <p class="text-grey-8 font-size-18 text-weight-semi-bold ">Цена:
                <span style="text-decoration: line-through" v-if="item.size.find(x=>x.id === item.selected_size).discount>0"
                      class=" text-weight-bold font-size-16 text-grey-5 inline-block q-mr-sm">{{item.size.find(x=>x.id === item.selected_size).old_price}} BYN</span>

                <span class=" text-weight-bold  font-size-18 catalog-card__price text-primary">

                  {{item.price}} BYN</span>
              </p>
            </q-card-section>

            <q-card-actions class="flex items-center justify-evenly q-pb-md">
              <q-btn class="q-px-lg text-weight-semi-bold " @click="showItem(index)"   rounded color="primary"  label="Подробнее" />

            </q-card-actions>
          </q-card>

        </div>
         <q-dialog v-model="itemCard" >
      <q-card class="itemCard" style="width: 1170px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-center">{{openedItem.name}} ({{openedItem.article}})</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section >
          <q-card class="" flat >
            <q-card-section :horizontal='$q.screen.gt.xs' >
              <div style="width: 100%" class="row" :class="$q.screen.gt.xs ? '' : 'q-mb-md'">
                <q-img
                  cover
                  :ratio="1"
                  class="col-lg-12 col-md-12 col-sm-12 col-xs-6"
                  :src="openedItem.image"
                />
                <div v-if="!$q.screen.gt.xs" class=" col-xs-6 q-pl-sm">



                </div>

              </div>



              <q-card-section  class="col-lg-8 col-md-8 col-sm-8 col-xs-12 q-py-none " :class="$q.screen.gt.xs ? 'q-px-lg' : 'no-padding'">


                <div class="font-size-20">
                  <p class="q-mb-none text-weight-semi-bold">Состав: <span class="text-grey-6 text-weight-medium">{{openedItem.sostav}}</span></p>
                  <p class=" text-weight-semi-bold">Производство: <span class="text-grey-6 text-weight-medium">{{openedItem.country}}</span></p>
                </div>
                <div class="" >
                  <p style="border-radius: 4px" class="inline-block shadow-4 q-pa-sm font-size-18 text-weight-semi-bold">
                    Цена: <span class="text-primary text-weight-bold font-size-25">
                    {{openedItem.price}} BYN
                  </span>
                  </p>

                </div>



              </q-card-section>


            </q-card-section>
          </q-card>
        </q-card-section>



      </q-card>
    </q-dialog>

      </div>
    </section>

  </q-page>

</template>

<script>
export default {
  name: 'Error404',
   data () {
     return {
       itemCard:false,
        items:[ { "id": 1,"selected_size":1, "size": [ { "id": 1, "sostav": "<p>1 простыня 150x220;<br />\r\n1 пододеяльник 150x220;<br />\r\n2 наволочки 70x70;)</p>", "name": "1.5 спальное", "price": 100, "is_selected": false }, { "id": 2, "sostav": "<p>1 простыня 180x220;<br />\r\n1 пододеяльник 180x220;<br />\r\n2 наволочки 70x70</p>", "name": "2 спальное", "price": 200, "is_selected": false }, { "id": 3, "sostav": "<p>1 простыня 220x240;<br />\r\n1 пододеяльник 200x220; 2 наволочки 70x70;<br />\r\n2 наволочки 50x70</p>", "name": "Евро", "price": 300, "is_selected": false }, { "id": 4, "sostav": "<p>1 простыня 220x240;<br />\r\n2 пододеяльника;<br />\r\n2 наволочки 70x70;<br />\r\n2 наволочки 50x70</p>", "name": "Семейное", "price": 400, "is_selected": false } ], "image": "", "sostav": "хлопок 100%", "country": "Турция", "name": "Товар1 красный", "article": "т1", "is_active": true, "is_present": true, "created_at": "2021-04-23T15:53:29.161435+03:00", "category": 1 }],
      openedItem:{ "id": 1,"selected_size":1, "size": [ { "id": 1, "sostav": "<p>1 простыня 150x220;<br />\r\n1 пододеяльник 150x220;<br />\r\n2 наволочки 70x70;)</p>", "name": "1.5 спальное", "price": 100, "is_selected": false }, { "id": 2, "sostav": "<p>1 простыня 180x220;<br />\r\n1 пододеяльник 180x220;<br />\r\n2 наволочки 70x70</p>", "name": "2 спальное", "price": 200, "is_selected": false }, { "id": 3, "sostav": "<p>1 простыня 220x240;<br />\r\n1 пододеяльник 200x220; 2 наволочки 70x70;<br />\r\n2 наволочки 50x70</p>", "name": "Евро", "price": 300, "is_selected": false }, { "id": 4, "sostav": "<p>1 простыня 220x240;<br />\r\n2 пододеяльника;<br />\r\n2 наволочки 70x70;<br />\r\n2 наволочки 50x70</p>", "name": "Семейное", "price": 400, "is_selected": false } ], "image": "", "sostav": "хлопок 100%", "country": "Турция", "name": "Товар1 красный", "article": "т1", "is_active": true, "is_present": true, "created_at": "2021-04-23T15:53:29.161435+03:00", "category": 1 },

     }
   },
  mounted() {
    const script = document.createElement("script");
    script.innerText= `
   gtag('event', 'conversion', {'send_to': 'AW-613543827/siR9CJLLgI0CEJPfx6QC'});
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
    this.get_items()
  },
  methods:{
    showItem(index){
      this.openedItem = this.items[index]
      console.log(this.openedItem)
      this.selectedType = 0
      this.itemCard = true
    },
    async get_items(){

      const response_items = await this.$api.get(`/api/get_items_for_thanks`)
        this.items = response_items.data.results
      console.log(this.items)
    },

  }
}
</script>
<style lang="sass">
.thanks-page
  position: relative
  padding-top: 250px
  &__line1
    max-width: 600px
  &__line2
    position: relative
    max-width: 600px
    margin-bottom: 270px
    &::after
      position: absolute
      content: url(../assets/quiz-arrow.png)
      bottom: -150px
  &__img
    position: absolute
    top: 20%
    right: -20%
    z-index: -1
@media (max-width: 599px)
  .thanks-page
    padding-top: 30px
    h3
      font-size: 30px
      line-height: 35px
      text-align: center
    &__line1
      font-size: 16px
      line-height: 20px
      text-align: center
    &__line2
      font-size: 16px
      line-height: 20px
      text-align: center
      margin-bottom: 30px
      &::after
        content: none
    &__img
      display: none

</style>

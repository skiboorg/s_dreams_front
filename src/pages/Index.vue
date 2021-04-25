<template>
  <q-page >
    <q-btn  style="position: fixed; right: 20px; top: 90px; z-index: 1000"
            @click="cart=!cart"
            text-color="grey-9"
            rounded color="white"
            round icon="shopping_cart"
            class="q-mr-sm lt-md">
      <q-badge rounded color="accent" class="text-weight-bold" floating>{{cart_items_count}}</q-badge>
    </q-btn>
    <q-header  class="bg-white text-grey-9 shadow-4 q-py-sm">
      <div class="container">
        <q-toolbar>
          <img src="~assets/logo.svg" alt="">
          <q-space/>
          <q-tabs
            dense
            v-model="tab"
            inline-label
            class="text-grey-9 gt-sm ">
            <q-tab name="mails" @click="scrollToElement($refs.features)"  label="О продукте" />
            <q-btn-dropdown class="text-grey-9" auto-close no-caps stretch flat label="Каталог">
              <q-list>
                <q-item clickable v-for="cat in cats" :key="cat.id">
                  <q-item-section >
                    <p @click="changePage(cat.name_slug)" class=" no-margin text-body2">{{cat.name}}</p>

                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-tab name="alarms" @click="scrollToElement($refs.faq)" label="Частные вопрос" />
            <q-tab name="fb" @click="scrollToElement($refs.feedbacks)" label="Отзывы" />
          </q-tabs>
          <div class="flex items-center justify-between ">
            <img class="q-mr-xs" src="~assets/header-phone-icon.png" alt="">
            <p class="no-margin ">
              <a class="text-weight-semi-bold text-grey-8 font-size-18 text-no-decoration" href="tel:+375336955695">+375 33 695-56-95</a>
            </p>
          </div>
          <q-space/>
          <div class="q-gutter-xs q-mt-none gt-sm">
            <a href="https://wa.me/+375336955695" target="_blank"><img src="../assets/header-w-logo.png" alt=""></a>
            <a href="https://telegram.im/@sweetdreemm" target="_blank"><img src="../assets/header-t-logo.png" alt=""></a>
            <a href="viber://chat?number=+375336955695" target="_blank"><img src="../assets/header-v-logo.png" alt=""></a>
          </div>
          <q-space class="gt-sm"/>
          <div class="gt-sm">
            <div class="flex items-center justify-start">
              <q-btn @click="cart=!cart" dense rounded color="grey-9" flat round icon="shopping_cart" class="q-mr-sm">
                <q-badge rounded color="accent" class="text-weight-bold" floating>{{cart_items_count}}</q-badge>
              </q-btn>
              <div @click="cart=!cart" style="line-height: 15px" class="flex column items-end justify-center cursor-pointer">
                <p class="q-mb-xs text-weight-bold" >{{cart_total_price}} BYN</p>
                <p class="no-margin text-weight-semi-bold text-primary font-size-16"> Корзина <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.48572 5.48553L5.48571 5.48553L2.03116 8.93998C1.77238 9.19889 1.35275 9.19893 1.09404 8.93999C0.835323 8.68128 0.835318 8.26169 1.09404 8.00299L4.08008 5.01703L1.09413 2.03118L1.09411 2.03116C0.835427 1.77237 0.835402 1.35284 1.09411 1.09412L5.48572 5.48553ZM5.48572 5.48553C5.61503 5.3562 5.67978 5.18647 5.67978 5.01701C5.67978 4.84765 5.61515 4.67802 5.48582 4.54863L5.4858 4.54862M5.48572 5.48553L5.4858 4.54862M5.4858 4.54862L2.03124 1.0941M5.4858 4.54862L2.03124 1.0941M2.03124 1.0941C1.77244 0.835312 1.35285 0.835286 1.09413 1.0941L2.03124 1.0941Z" fill="#5D9AE6" stroke="#5D9AE6" stroke-width="0.2"/>
                </svg>
                </p>
              </div>
            </div>
          </div>
          <q-btn
            class="lt-md"
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
          >
            <q-menu auto-close style="width: 300px">
              <q-list style="min-width: 280px">
                <q-separator />
                <q-item clickable @click="scrollToElement($refs.features)">
                  <p  class="font-size-16  cursor-pointer">О продукте</p>
                </q-item>
                <q-item clickable @click="scrollToElement($refs.catalog)">
                  <p  class="font-size-16 no-margin cursor-pointer">Каталог</p>
                </q-item>
                <q-separator/>
                <q-item  clickable v-for="cat in cats" :key="cat.id" >
                  <q-item-section >
                    <p @click="changePage(cat.name_slug)" class=" no-margin text-caption q-pl-sm">{{cat.name}}</p>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable @click="scrollToElement($refs.faq)">
                  <p @click="scrollToElement($refs.faq)" class="font-size-16  cursor-pointer">Частные вопрос</p>
                </q-item>
                <q-item clickable @click="scrollToElement($refs.feedbacks)">
                  <p @click="scrollToElement($refs.feedbacks)" class="font-size-16  cursor-pointer">Отзывы</p>
                </q-item>
                <q-item clickable @click="scrollToElement($refs.certs)">
                  <p  class="font-size-16  cursor-pointer">Сертификация</p>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </div>
    </q-header>
    <!--    :class="pageInfo[currentIndex].offerClass"-->
    <section class="offer " :style="{'background-image': 'url('+currentCat.offerImage+' )'}" >

      <div class="full-height container ">
        <div class="flex column items-start justify-center">
          <h1 class="text-h4 text-weight-bold">{{currentCat.offerText}}
            <span class="block text-accent">{{currentCat.offerDiscount}}</span>
          </h1>
          <p class="font-size-12 text-primary text-weight-bold">До конца акции осталось:</p>
          <q-no-ssr>
            <CD :time="currentCat.timerDays * 24 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }" class="offer-timer flex items-start justify-start q-mb-lg">
              <div class="text-center timer-item">
                <p class="text-primary text-h3 text-weight-semi-bold q-mb-none">{{ days }} </p>
                <p style="opacity: .6" class="font-size-12 text-primary text-weight-bold ">Дней</p>
              </div>
              <div class="text-center timer-item">
                <p class="text-primary text-h3 text-weight-semi-bold q-mb-none">{{ hours }} </p>
                <p style="opacity: .6" class="font-size-12 text-primary text-weight-bold">Часов</p>
              </div>
              <div class="text-center timer-item">
                <p class="text-primary text-h3 text-weight-semi-bold q-mb-none">{{ minutes }} </p>
                <p style="opacity: .6" class="font-size-12 text-primary text-weight-bold">Минут</p>
              </div>
              <div class="text-center timer-item">
                <p class="text-primary text-h3 text-weight-semi-bold q-mb-none">{{ seconds }} </p>
                <p style="opacity: .6" class="font-size-12 text-primary text-weight-bold">Секунд</p>
              </div>
            </CD>
          </q-no-ssr>
          <div class="offer-buttons q-gutter-lg">
            <q-btn class="q-px-lg text-weight-semi-bold " @click="callBack=true"  unelevated rounded color="primary"  size="lg" label="Заказать звонок" />
            <q-btn @click="scrollToElement($refs.catalog)" class="q-px-lg text-weight-semi-bold " outline rounded color="primary" icon-right="east" size="lg" label="В каталог" />
          </div>
        </div>
        <div class="offer-bottom">
          <div class="offer-bottom__item">
            <svg width="48" height="60" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M47.8307 24.8689C47.8307 18.6007 43.3254 13.3195 37.3099 12.1994C36.6997 5.37093 30.947 0 23.9625 0C16.9875 0 11.2266 5.37413 10.615 12.1989C4.63482 13.314 0.093811 18.571 0.093811 24.8689C0.093811 28.1359 1.31878 31.2524 3.54305 33.6451C5.76732 36.0374 8.78673 37.4857 12.0451 37.7238C12.0638 37.7251 12.0822 37.7251 12.1009 37.7256C12.9652 38.8586 14.0634 39.721 15.351 40.2451C16.8086 40.8379 18.4473 40.956 20.0907 40.5871C20.8039 40.4269 21.5102 40.1801 22.2047 39.851V58.14C22.2047 59.1672 22.9916 59.9999 23.9625 59.9999C24.9329 59.9999 25.7203 59.1672 25.7203 58.14V39.8821C27.0212 40.4983 28.3533 40.8128 29.6525 40.8128C30.6554 40.8123 31.6387 40.6251 32.5734 40.2451C33.8611 39.721 34.9584 38.859 35.8231 37.727C42.5627 37.2655 47.8307 31.6332 47.8307 24.8689ZM31.2487 36.9886C29.5421 37.683 27.5193 37.2088 25.5537 35.6529C25.2433 35.407 24.8588 35.2734 24.4628 35.2734C24.4628 35.2734 23.5793 35.2743 23.4859 35.2715C23.0772 35.2573 22.6771 35.3901 22.3544 35.6409C21.367 36.4086 20.3178 36.9328 19.3203 37.1571C18.3663 37.3708 17.4769 37.3145 16.6758 36.9886C15.2393 36.404 14.1924 34.968 13.7219 32.9786C15.4476 31.8832 17.1995 31.5856 18.6364 32.1702C18.7074 32.199 18.7801 32.2311 18.8525 32.2659C19.3826 32.5195 20.0047 32.4911 20.5096 32.1903C21.0149 31.89 21.3363 31.3567 21.3665 30.7699C21.4439 29.262 22.4125 27.8132 24.0614 26.6954C25.6036 27.8507 26.5012 29.2918 26.5603 30.7498C26.5841 31.3403 26.9036 31.8791 27.4094 32.1844C27.9157 32.4893 28.5415 32.5195 29.0748 32.2645C29.1453 32.2311 29.2171 32.199 29.2881 32.1702C30.7245 31.5856 32.4769 31.8832 34.2026 32.9786C33.732 34.968 32.6851 36.404 31.2487 36.9886ZM37.6079 33.8529C37.7192 33.3924 37.808 32.9145 37.8716 32.4201C37.9508 31.8086 37.7031 31.1997 37.2193 30.817C34.7881 28.8922 32.1171 28.0705 29.6616 28.4458C28.9443 26.3676 27.3284 24.4898 25.0112 23.1069C24.4816 22.7906 23.8247 22.7755 23.2809 23.0662C20.7879 24.4006 19.0484 26.2962 18.2835 28.4486C15.8225 28.0659 13.1433 28.8871 10.7052 30.817C10.2214 31.1997 9.9737 31.8086 10.0529 32.4201C10.1165 32.9136 10.2053 33.3906 10.3161 33.8506C6.43016 32.6893 3.60943 29.0684 3.60943 24.8689C3.60943 19.7007 7.81398 15.4957 12.9826 15.4957C14.5889 15.4957 16.1778 15.9123 17.5776 16.6996C18.4235 17.1757 19.4952 16.8754 19.9712 16.029C20.4473 15.1831 20.1475 14.1115 19.3011 13.6354C17.7227 12.7478 15.9699 12.204 14.1728 12.0364C14.842 7.23174 18.9816 3.51562 23.9625 3.51562C29.414 3.51562 33.8488 7.95088 33.8488 13.4024C33.8488 13.439 33.8474 13.4756 33.8469 13.5122C33.8401 13.5594 33.8341 13.6065 33.8314 13.6551C33.8268 13.7356 33.8295 13.8153 33.8355 13.8936C33.743 15.7841 33.1191 17.5882 32.0141 19.1391C31.451 19.9296 31.6355 21.0273 32.426 21.5908C32.7355 21.811 33.0916 21.9172 33.4446 21.9172C33.9939 21.9172 34.5345 21.6604 34.8774 21.1793C36.0415 19.5456 36.8105 17.704 37.1552 15.7621C41.281 16.7633 44.3151 20.4826 44.3151 24.8689C44.3151 29.0858 41.4989 32.6962 37.6079 33.8529Z" fill="#5D9AE6"/>
            </svg>
            <p class="no-margin">Натуральные материалы</p>
          </div>
          <div class="offer-bottom__item">
            <svg width="54" height="60" viewBox="0 0 54 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M49.6879 20.8356L43.8064 18.6949C45.9329 16.9378 46.8409 14.1507 46.1899 11.5023C44.9106 6.2988 38.5662 4.32349 34.5579 7.86689L30.4971 11.4566L29.6938 6.07298C28.8995 0.772707 22.7632 -1.77729 18.4464 1.38091C16.2879 2.96001 15.1397 5.68216 15.6489 8.44615L10.1038 6.42794C7.37567 5.43478 4.34767 6.84665 3.3545 9.57513L0.95333 16.1724C0.621807 17.0833 1.09149 18.0907 2.00251 18.4221C2.372 18.5565 29.0426 28.2638 29.4342 28.4063C28.3242 28.4063 4.01591 28.4063 2.94646 28.4063C1.97708 28.4063 1.19122 29.1922 1.19122 30.1616V54.7344C1.19122 57.6378 3.55337 60 6.45681 60H20.4984H27.5193H41.5609C44.4643 60 46.8265 57.6378 46.8265 54.7344V34.7367L48.1843 35.231C49.091 35.5612 50.1009 35.0966 50.434 34.1819L52.8353 27.5846C53.8281 24.8561 52.4163 21.8286 49.6879 20.8356ZM18.7431 56.4896H6.45669C5.48884 56.4896 4.70146 55.7022 4.70146 54.7344V31.9168H18.7431V56.4896ZM25.7639 56.4896H22.2536V31.9168H25.7639V56.4896ZM36.8828 10.497C38.9189 8.69693 42.1334 9.70673 42.7809 12.3405C43.4715 15.1487 40.7572 17.5836 38.0406 16.5964C35.7299 15.7554 34.6471 15.3613 32.3332 14.519L36.8828 10.497ZM20.519 4.21427C22.7127 2.6095 25.8202 3.91169 26.2222 6.59353L27.1222 12.6222C26.4744 12.3865 22.0525 10.7769 21.4153 10.5451C18.6984 9.55568 18.1853 5.92122 20.519 4.21427ZM21.3458 21.7268L4.85239 15.7236L6.65333 10.7757C6.98438 9.86622 7.99372 9.39583 8.90309 9.72665C10.7488 10.3984 23.1778 14.9222 23.747 15.1293L21.3458 21.7268ZM27.9433 24.1282L24.6445 22.9275L27.0458 16.3302L30.3445 17.5309L27.9433 24.1282ZM43.3159 54.7344C43.3159 55.7022 42.5285 56.4896 41.5607 56.4896H29.2744V31.9168H39.079L43.316 33.459V54.7344H43.3159ZM49.5362 26.3838L47.7354 31.3318L31.242 25.3286L33.6432 18.7313L48.4873 24.134C49.3968 24.4651 49.8673 25.4744 49.5362 26.3838Z" fill="#5D9AE6"/>
            </svg>

            <p class="no-margin">Подарок к каждому заказу</p>
          </div>
          <div class="offer-bottom__item">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
                <path d="M44.5183 35.98C40.1216 35.98 36.5448 39.5568 36.5448 43.9534C36.5448 48.3501 40.1216 51.9269 44.5183 51.9269C48.9156 51.9269 52.4917 48.3501 52.4917 43.9534C52.4917 39.5568 48.9149 35.98 44.5183 35.98ZM44.5183 47.9401C42.3196 47.9401 40.5315 46.1521 40.5315 43.9534C40.5315 41.7548 42.3196 39.9667 44.5183 39.9667C46.7169 39.9667 48.505 41.7548 48.505 43.9534C48.505 46.1522 46.7169 47.9401 44.5183 47.9401Z" fill="#5D9AE6"/>
                <path d="M17.2757 35.98C12.8791 35.98 9.30228 39.5568 9.30228 43.9534C9.30228 48.3501 12.8791 51.9269 17.2757 51.9269C21.6724 51.9269 25.2492 48.3501 25.2492 43.9534C25.2492 39.5568 21.6724 35.98 17.2757 35.98ZM17.2757 47.9401C15.0771 47.9401 13.289 46.1521 13.289 43.9534C13.289 41.7548 15.0771 39.9667 17.2757 39.9667C19.4737 39.9667 21.2625 41.7548 21.2625 43.9534C21.2625 46.1522 19.4744 47.9401 17.2757 47.9401Z" fill="#5D9AE6"/>
                <path d="M49.8877 13.1575C49.5489 12.4844 48.8598 12.0598 48.1063 12.0598H37.608V16.0465H46.877L52.3049 26.8425L55.8678 25.0511L49.8877 13.1575Z" fill="#5D9AE6"/>
                <path d="M38.5382 42.0267H23.4552V46.0135H38.5382V42.0267Z" fill="#5D9AE6"/>
                <path d="M11.2956 42.0267H4.3854C3.28436 42.0267 2.39211 42.9191 2.39211 44.02C2.39211 45.1211 3.28448 46.0133 4.3854 46.0133H11.2957C12.3968 46.0133 13.289 45.121 13.289 44.02C13.289 42.919 12.3967 42.0267 11.2956 42.0267Z" fill="#5D9AE6"/>
                <path d="M59.5814 29.8405L55.6606 24.7907C55.2839 24.3043 54.7025 24.0199 54.0865 24.0199H39.6014V10.0664C39.6014 8.96537 38.709 8.07312 37.6081 8.07312H4.38541C3.28436 8.07312 2.39211 8.9655 2.39211 10.0664C2.39211 11.1673 3.28448 12.0597 4.38541 12.0597H35.6146V26.0132C35.6146 27.1142 36.507 28.0065 37.6079 28.0065H53.1103L56.0133 31.746V42.0264H50.4983C49.3973 42.0264 48.505 42.9188 48.505 44.0197C48.505 45.1208 49.3974 46.013 50.4983 46.013H58.0066C59.1076 46.013 59.9999 45.1207 60 44.0197V31.0632C60 30.6206 59.8525 30.1901 59.5814 29.8405Z" fill="#5D9AE6"/>
                <path d="M11.1628 31.927H1.9933C0.892253 31.927 0 32.8194 0 33.9203C0 35.0213 0.892376 35.9136 1.9933 35.9136H11.1627C12.2637 35.9136 13.156 35.0212 13.156 33.9203C13.1561 32.8194 12.2637 31.927 11.1628 31.927Z" fill="#5D9AE6"/>
                <path d="M26.2901 24.0863H9.2801C8.17918 24.0863 7.2868 24.9787 7.2868 26.0797C7.2868 27.1808 8.17918 28.073 9.2801 28.073H26.2901C27.3912 28.073 28.2834 27.1806 28.2834 26.0797C28.2834 24.9788 27.3912 24.0863 26.2901 24.0863Z" fill="#5D9AE6"/>
                <path d="M19.0033 16.2458H1.9933C0.892253 16.2458 0 17.1382 0 18.2391C0 19.3402 0.892376 20.2325 1.9933 20.2325H19.0033C20.1044 20.2325 20.9966 19.3401 20.9966 18.2391C20.9967 17.1382 20.1044 16.2458 19.0033 16.2458Z" fill="#5D9AE6"/>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="60" height="60" fill="white"/>
                </clipPath>
              </defs>
            </svg>

            <p class="no-margin">Доставка за 3 часа</p>
          </div>
          <div class="offer-bottom__item">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 34.2188V7.03125C60 3.15399 56.846 0 52.9688 0H11.7188C5.25696 0 0 5.25696 0 11.7188V38.9062C0 42.0561 1.24969 44.9194 3.2785 47.0274C1.31012 48.2748 0 50.4712 0 52.9688C0 56.846 3.15399 60 7.03125 60H48.2812C54.743 60 60 54.743 60 48.2812C60 45.1314 58.7503 42.2681 56.7215 40.1601C58.6899 38.9127 60 36.7163 60 34.2188ZM11.7188 4.6875H52.9688C54.261 4.6875 55.3125 5.73898 55.3125 7.03125V27.5908C54.5787 27.3303 53.7904 27.1875 52.9688 27.1875H11.7188C9.08295 27.1875 6.64764 28.0627 4.6875 29.5372V11.7188C4.6875 7.84149 7.84149 4.6875 11.7188 4.6875ZM48.2812 55.3125H7.03125C5.73898 55.3125 4.6875 54.261 4.6875 52.9688C4.6875 51.6765 5.73898 50.625 7.03125 50.625H48.2812V45.9375H11.7188C7.84149 45.9375 4.6875 42.7835 4.6875 38.9062C4.6875 35.029 7.84149 31.875 11.7188 31.875H52.9688C54.261 31.875 55.3125 32.9265 55.3125 34.2188C55.3125 35.511 54.261 36.5625 52.9688 36.5625H11.7188V41.25H48.2812C52.1585 41.25 55.3125 44.404 55.3125 48.2812C55.3125 52.1585 52.1585 55.3125 48.2812 55.3125Z" fill="#5D9AE6"/>
            </svg>

            <p class="no-margin">Весь товар в наличии!</p>
          </div>

        </div>
      </div>

    </section>

    <section class="why-we">
      <div class="full-height container">
        <h3 class="text-h4 text-weight-bold text-center q-mb-md">Почему мы?</h3>
        <p class="why-we__subtitle text-h5 text-weight-semi-bold text-center">Мы - эксперты в работе с постельным бельем и домашними комплектами</p>
        <div class="row why-we__wrapper">
          <div class="why-we__left col-lg-3 col-md-3 col-sm-3 col-xs-12  column items-start justify-between">
            <div class="why-we__item item-first">
              <p class="why-we__item-title text-primary font-size-18 text-weight-bold">Мы пользуемся всей продукцией САМИ</p>
              <p class="why-we__item-subtitle font-size-18">И не понаслышке знаем все нюансы</p>
            </div>
            <div class="why-we__item item-second">
              <p class="why-we__item-title text-primary font-size-18 text-weight-bold">Подобран самый оптимальный товар</p>
              <p class="why-we__item-subtitle font-size-18">По соотношению цена/качество (не стоит переплачивать)</p>
            </div>
          </div>
          <!--          :class="pageInfo[currentIndex].whyWeCenterClass"-->
          <div class="why-we__center why-we-postel-bg" :style="{'background-image': 'url('+currentCat.whyWeCenterImage+' )'}"></div>
          <div class="why-we__right col-lg-3 col-md-3 col-sm-3 col-xs-12 offset-lg-6 offset-md-6 offset-sm-6 offset-xs-0 column items-start justify-between ">
            <div class="why-we__item item-third">
              <p class="why-we__item-title text-primary font-size-18 text-weight-bold">Профессионально проконсультируем</p>
              <p class="why-we__item-subtitle font-size-18">И поможем выбрать нужный продукт и необходимые аксессуары</p>
            </div>
            <div class="why-we__item item-fourth">
              <p class="why-we__item-title text-primary font-size-18 text-weight-bold">Весь ассортимент в наличии! </p>
              <p class="why-we__item-subtitle font-size-18">Не придется терпеть переносы заказа</p>
            </div>
          </div>
        </div>
      </div>

    </section>
    <section ref="features" class="features">
      <div class="container">
        <h3 class="text-h4 text-weight-bold text-center q-mb-md" v-html="currentCat.whyWeTitle"></h3>
        <div class="features-grid">
          <q-expansion-item
            group="somegroup"
            v-for="i in currentCat.why_we_items" :key="i.id"
            class="col-5"
            style="border-radius: 30px"
            :icon="currFeature === i.id ?'close':'add' "
            :label="i.title"
            header-class="bg-white features-header"
            expand-icon-class="text-white"
            @show="openFeature(i.id)">
            <q-card>
              <q-card-section class="features-text">
                {{i.text}}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </section>
    <section ref="catalog" class="catalog">

      <div class="container">
        <h3 class="text-h4 text-weight-bold text-center q-mb-md" >Каталог</h3>

        <div class="catalog-grid ">
          <q-card class="catalog-card" v-for="(item,index) in items" :key="item.id">
            <q-img :src="item.image" />
            <q-card-section>
              <p class="col text-h6 text-weight-semi-bold ellipsis text-grey-10 q-mb-sm">{{item.name}}</p>
              <p class="font-size-18 text-weight-semi-bold text-grey-8 q-mb-sm">Размеры:</p>

              <div class="row ">
                <q-radio
                  v-for="(size,index) in item.size"
                  v-model="item.selected_size"
                  :disable="check_ost(item.id,size.id)"
                  :key="size.id"
                  dense size="sm"
                  class="col-lg-6 col-md-6 col-sm-6 col-xs-12 font-size-16 text-weight-semi-bold text-grey-8"
                  :val="size.id"
                  :label="size.name " >
                  <q-tooltip v-if="check_ost(item.id,size.id)" anchor="center left" self="center right" :offset="[10, 10]">
                    Нет в наличии
                  </q-tooltip>
                </q-radio>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <p class="font-size-18  text-grey-8 q-mb-none">Состав: <span class="text-grey-5">{{item.sostav}}</span>   </p>
              <p class="font-size-18  text-grey-8 q-mb-md">Производство: <span class="text-grey-5">{{item.country}}</span>   </p>
              <p class="text-grey-8 font-size-18 text-weight-semi-bold">Цена: <span class="text-primary text-weight-bold">
                {{item.size.find(x=>x.id === item.selected_size).price}} BYN
              </span></p>
            </q-card-section>

            <q-card-actions class="flex items-center justify-evenly q-pb-md">
              <q-btn class="q-px-lg text-weight-semi-bold " @click="showItem(index)"   rounded color="primary"  label="Подробнее" />
              <q-btn class="q-px-lg text-weight-semi-bold " @click="addToCart(item.id,item.size.find(x=>x.id === item.selected_size).id)"
                     outline rounded color="primary" label="Заказать" />
            </q-card-actions>
          </q-card>

        </div>
        <div class="catalog-btn text-center">
          <q-btn v-if="total_pages && total_pages>current_page" :loading="is_loading" @click="getItems(current_slug,true)" unelevated rounded color="primary" class="q-px-lg"  size="lg" label="Посмотреть еще"/>
        </div>
      </div>
    </section>
    <section class="quiz">
      <div class="full-height flex column items-center justify-start">
        <h3 class="text-h4 text-weight-bold text-center q-mb-xl gt-sm" >Не можете определиться?</h3>
        <p class="quiz-subtitle font-size-25"><span class="text-accent text-weight-semi-bold ">Ответьте на 4 простых вопроса</span>  и наш дизайнер подберет белье под ваш интерьер и пожелания,
          а также получите бонус -дизайнерскую открытку в подарок!</p>
        <img class="lt-sm" src="../assets/quiz-m.png" alt="">
        <q-btn @click="quiz=!quiz" class="q-px-lg text-weight-semi-bold "  size="lg" unelevated rounded color="primary"  label="Ответить на вопросы" />

      </div>
    </section>
    <section class="warning">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 ">
            <p style="border-radius: 59px;" class="inline-block text-h4 text-white bg-accent q-px-lg q-py-sm text-weight-bold q-mb-xl warning-text">Остерегайтесь подделок!</p>
            <p class="q-mb-xl font-size-25">Участились случаи подделок белья Candies. Будьте аккуратны, так как некачественные подделки нередко
              <span class="text-weight-semi-bold"> вызывают проблемы со здоровьем и провоцируют возникновение аллергии!</span>
            </p>
            <q-btn @click="scrollToElement($refs.catalog)" v-if="$q.screen.gt.xs" class="q-px-lg text-weight-semi-bold "   unelevated rounded color="primary" size="lg" label="В каталог" />
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-0 flex column items-center justify-between">
            <img src="../assets/pillow.jpg" alt="">
            <q-btn @click="scrollToElement($refs.catalog)" v-if="!$q.screen.gt.xs" class="q-px-lg text-weight-semi-bold "   unelevated rounded color="primary" size="lg" label="В каталог" />
          </div>
        </div>
      </div>
    </section>
    <section class="timer bg-accent q-py-xl">
      <div class="flex column items-center justify-center">
        <p class="text-h4 text-weight-bold text-center  text-white" :class="$q.screen.gt.xs ? '' : 'q-mb-none'">Оставляй заявку!</p>
        <p class="text-h4 text-weight-bold text-center   text-white" :class="$q.screen.gt.xs ? 'q-mb-xl' : 'q-mb-sm'">До конца акции осталось:</p>
        <q-no-ssr>
          <CD :time="18 * 24 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }" class="flex items-start justify-start q-mb-lg">
            <div class="text-center timer-item ">
              <p class="text-white text-h3 text-weight-semi-bold q-mb-none">{{ days }} </p>
              <p style="opacity: .6" class="font-size-12 text-white text-weight-bold ">Дней</p>
            </div>
            <div class="text-center timer-item">
              <p class="text-white text-h3 text-weight-semi-bold q-mb-none">{{ hours }} </p>
              <p style="opacity: .6" class="font-size-12 text-white text-weight-bold">Часов</p>
            </div>
            <div class="text-center timer-item">
              <p class="text-white text-h3 text-weight-semi-bold q-mb-none">{{ minutes }} </p>
              <p style="opacity: .6" class="font-size-12 text-white text-weight-bold">Минут</p>
            </div>
            <div class="text-center timer-item">
              <p class="text-white text-h3 text-weight-semi-bold q-mb-none">{{ seconds }} </p>
              <p style="opacity: .6" class="font-size-12 text-white text-weight-bold">Секунд</p>
            </div>
          </CD>
        </q-no-ssr>
      </div>
    </section>
    <section ref="feedbacks" class="feedbacks">
      <div class="container">
        <h3 class="text-h4 text-weight-bold q-mb-md" >Отзывы</h3>
        <q-no-ssr>
          <swiper  ref="recommendedSlider"   :options="sliderOption">
            <swiper-slide v-for="fb in currentCat.feedbacks" :key="fb.id">
              <img style="max-width: 100%; height: auto" :src="fb.image" alt="">
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </q-no-ssr>
      </div>
    </section>
    <section id="certs" ref="certs" class="certs">
      <div class="container">
        <h3 class="text-h4 text-weight-bold q-mb-md" >Сертификаты, подтверждающие качество, надежность и безопасность постельного белья Alanna</h3>
        <!--        <div class="certs-grid"></div>-->
        <q-no-ssr>
          <swiper style="padding: 30px 0" ref="recommendedSlider"  class="cart-recommended__slider" :options="sliderCertOption">

            <swiper-slide>
              <img style="max-width: 100%; height: auto" src="../assets/cert.jpg" alt="">
            </swiper-slide>
            <swiper-slide>
              <img style="max-width: 100%; height: auto" src="../assets/cert.jpg" alt="">
            </swiper-slide>
            <swiper-slide>
              <img style="max-width: 100%; height: auto" src="../assets/cert.jpg" alt="">
            </swiper-slide>
            <swiper-slide>
              <img style="max-width: 100%; height: auto" src="../assets/cert.jpg" alt="">
            </swiper-slide>
            <!--              <div class="swiper-button-prev" slot="button-prev"></div>-->
            <!--              <div class="swiper-button-next" slot="button-next"></div>-->
          </swiper>
        </q-no-ssr>

      </div>
    </section>
    <section ref="faq" class="faq">
      <div class="container">
        <h3 class="text-h4 text-weight-bold q-mb-md text-center " >Часто задаваемые вопросы</h3>
        <q-list >
          <q-separator color="primary" />
          <div class="" v-for="i in currentCat.faq_items" :key="i.id">
            <q-expansion-item
              group="faqgroup"
              :label="i.question"
              dense-toggle
              header-class="font-size-25 text-weight-semi-bold q-py-md">
              <q-card>
                <q-card-section>
                  <div v-html="i.answer"></div>

                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator color="primary"/>
          </div>
        </q-list>
      </div>
    </section>
    <section class="callback">
      <div class="container">
        <h3 class="text-h4 text-weight-bold q-mb-md" >Не определились? Мы поможем подобрать размер и расцветку! <span class="block">Оставляйте заявку!</span> </h3>
        <p class="callback-subtitle">Оставьте номер телефона с Viber, мы свяжемся с Вами и вышлем эксклюзивные расцветки, которых нет на сайте!</p>
        <q-form @submit="formSubmit" class="q-gutter-md callback-form">
          <q-input :class="!$q.screen.gt.xs ? 'bg-white' : ''" outlined v-model="name" label="Ваше имя"/>
          <q-input :class="!$q.screen.gt.xs ? 'bg-white' : ''" outlined v-model="phone" label="Ваш телефон *"
                   mask="+375 (##) ###-##-##"
                   fill-mask=""
                   lazy-rules :rules="[val => !val.includes('_') || 'Введите корректный номер телефона']"/>
          <div>
            <q-btn label="Отправить" type="submit" rounded unelevated class="full-width" size="lg" color="primary"/>

          </div>
        </q-form>
      </div>
    </section>
    <section class="map">

      <div class="map-inner">
        <h3 class="text-h4 text-weight-bold q-mb-xl">Свяжитесь с нами!</h3>

        <p class="text-weight-semi-bold font-size-25 flex items-center"><img class="q-mr-md" src="../assets/header-phone-icon.png" alt=""><a class="text-primary text-no-decoration" href="tel:+375336955695">+375 33 695-56-95</a></p>
        <p class="text-weight-semi-bold font-size-25 text-primary flex items-center"><img class="q-mr-md" src="../assets/bi_geo-alt.png" alt=""><span >Тарасово, ул Рабочая д 2</span></p>
        <div class="q-gutter-md">
          <a href="https://wa.me/+375336955695" target="_blank"><img src="../assets/header-w-logo.png" alt=""></a>
          <a href="https://telegram.im/@sweetdreemm" target="_blank"><img src="../assets/header-t-logo.png" alt=""></a>
          <a href="viber://chat?number=+375336955695" target="_blank"><img src="../assets/header-v-logo.png" alt=""></a>
        </div>
      </div>

    </section>
    <footer class="footer gt-sm">
      <div class="container">
        <div class="row items-center">
          <div class="col-lg-1 col-md-1 col-sm-1">
            <img src="../assets/logo.svg" alt="">
          </div>
          <div class="col-lg-8 col-md-8 col-sm-8 text-center">
            <div class="flex items-center justify-between">
              <p @click="scrollToElement($refs.features)" class="font-size-16 q-mb-none cursor-pointer">О продукте</p>
              <p @click="scrollToElement($refs.catalog)" class="font-size-16 q-mb-none cursor-pointer">Каталог</p>
              <p @click="scrollToElement($refs.faq)" class="font-size-16 q-mb-none cursor-pointer">Частные вопрос</p>
              <p @click="scrollToElement($refs.feedbacks)" class="font-size-16 q-mb-none cursor-pointer">Отзывы</p>
              <p @click="scrollToElement($refs.certs)" class="font-size-16 q-mb-none cursor-pointer">Сертификация</p>
            </div>
            <q-separator spaced="md"/>
            <div class="flex items-center justify-between">
              <p class="text-weight-semi-bold font-size-16 flex items-center"><img class="q-mr-md" src="../assets/header-phone-icon.png" alt=""><a class="text-grey-9 text-no-decoration" href="tel:+375336955695">+375 33 695-56-95</a></p>
              <p class="text-weight-semi-bold font-size-16 flex items-center"><img class="q-mr-md" src="../assets/mail-icon.png" alt=""><a class="text-grey-9 text-no-decoration" href="mailto:ToYou.work@yandex.by">ToYou.work@yandex.by</a></p>
              <p class="text-weight-semi-bold font-size-16 flex items-center">Время работы с 9:30 до 21:30</p>


            </div>

          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 text-right ">
            <p class="font-size-14 q-mb-sm"><a class="text-grey-6" href="">Политика конфиденциальности</a></p>
            <div class="">
              <a href="https://wa.me/+375336955695" target="_blank"><img src="../assets/header-w-logo.png" alt=""></a>
              <a href="https://telegram.im/@sweetdreemm" target="_blank"><img src="../assets/header-t-logo.png" alt=""></a>
              <a href="viber://chat?number=+375336955695" target="_blank"><img src="../assets/header-v-logo.png" alt=""></a>



            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer class="footer lt-sm">
      <div class="container">
        <div class="row">
          <div class="col-5">
            <img src="../assets/f-logo.svg" alt="">
            <p @click="scrollToElement($refs.features)" class="font-size-10 q-mb-md cursor-pointer">О продукте</p>
            <p @click="scrollToElement($refs.catalog)" class="font-size-10 q-mb-md cursor-pointer">Каталог</p>
            <p @click="scrollToElement($refs.faq)" class="font-size-10 q-mb-md cursor-pointer">Частные вопрос</p>
            <p @click="scrollToElement($refs.feedbacks)" class="font-size-10 q-mb-md cursor-pointer">Отзывы</p>
            <p @click="scrollToElement($refs.certs)" class="font-size-10 q-mb-md cursor-pointer">Сертификация</p>
            <p class="font-size-10 q-mb-sm"><a class="text-grey-6" href="">Политика конфиденциальности</a></p>
          </div>
          <div class="col-7">
            <p class="text-weight-semi-bold font-size-16 flex items-center"><img style="width: 11px; height: 11px; object-fit: contain" class="q-mr-xs" src="../assets/header-phone-icon.png" alt=""><a class="text-grey-9 font-size-12 text-no-decoration" href="tel:+375336955695">+375 33 695-56-95</a></p>
            <p class="text-weight-semi-bold font-size-16 flex items-center"><img style="width: 11px; height: 11px; object-fit: contain" class="q-mr-xs" src="../assets/mail-icon.png" alt=""><a class="text-grey-9 font-size-12 text-no-decoration" href="mailto:ToYou.work@yandex.by">ToYou.work@yandex.by</a></p>
            <p class="text-weight-semi-bold font-size-10 flex items-center"><img style="width: 11px; height: 11px; object-fit: contain" class="q-mr-xs" src="../assets/time-icon.png" alt="">Время работы с 9:30 до 21:30</p>
            <div class="">
              <a href="https://wa.me/+375336955695" target="_blank"><img src="../assets/header-w-logo.png" alt=""></a>
              <a href="https://telegram.im/@sweetdreemm" target="_blank"><img src="../assets/header-t-logo.png" alt=""></a>
              <a href="viber://chat?number=+375336955695" target="_blank"><img src="../assets/header-v-logo.png" alt=""></a>


            </div>
          </div>
        </div>
      </div>
    </footer>

    <q-dialog v-model="cart" >
      <q-card class="cart-item">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-center">Ваш заказ:</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section >
          <q-separator color="primary" spaced="md" class="gt-xs"/>
          <div v-for="item in items_in_cart.items" :key="item.id">
            <q-card :class="$q.screen.gt.xs ? '' : 'q-pt-sm q-pl-sm'" :flat="$q.screen.gt.xs" >
              <q-card-section horizontal >
                <q-img
                  class="col-lg-2 col-md-2 col-sm-2 col-xs-4"
                  :src="item.item.image"/>
                <q-card-section horizontal class="col-lg-10 col-md-10 col-sm-10 col-xs-8 items-center cart-item__info">
                  <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pl-md">{{item.item.name}} </div>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 flex items-center justify-center">
                    <p v-if="!$q.screen.gt.xs" class="q-mb-none q-mr-sm">Кол-во: </p>
                    <q-btn size="sm" @click="changeItem(item.item.id,item.size.id,'minus_quantity')" icon="remove" color="primary" dense outline round/>
                    <p class="q-mb-none " :class="$q.screen.gt.xs ? 'q-px-md' : 'q-px-xs'">{{item.quantity}}</p>
                    <q-btn size="sm" @click="changeItem(item.item.id,item.size.id,'plus_quantity')" icon="add" color="primary" dense outline round/>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12  text-center q-mb-none"><span v-if="!$q.screen.gt.xs" class="inline-block q-mr-sm">Итого:</span>{{item.price}} BYN</div>
                  <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 cart-item__delete">
                    <q-btn dense icon="delete"  @click="changeItem(item.item.id,item.size.id,'delete_item')" flat round/>
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-separator color="primary" spaced="md" class="gt-xs"/>
          </div>

        </q-card-section>
        <q-card-section>
          <q-form @submit="sendMail('order')" class="callback-form q-mb-md">
            <q-input outlined v-model="name" class="full-width q-mb-md" label="Ваше имя"/>
            <q-input outlined v-model="phone" class="full-width q-mb-sm" label="Ваш телефон *"
                     mask="+375 (##) ###-##-##"
                     fill-mask=""
                     lazy-rules :rules="[val => !val.includes('_') || 'Введите корректный номер телефона']"/>

            <div>
              <q-btn label="Заказать" type="submit" :loading="is_loading" rounded unelevated class="full-width" size="lg" color="primary"/>

            </div>
          </q-form>
        </q-card-section>


      </q-card>
    </q-dialog>
    <q-dialog v-model="itemCard" >
      <q-card class="itemCard" style="width: 1170px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-center">{{openedItem.name}}</div>
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

                  <q-btn :label="size.name "
                         v-for="(size,index) in openedItem.size"
                         :key="size.id"
                         @click="selectedType=index"
                         :disable="check_ost(openedItem.id,size.id)"
                         :outline="selectedType!==index"
                         size="sm"
                         class="full-width"
                         rounded
                         unelevated
                         color="primary">
                    <q-tooltip v-if="check_ost(openedItem.id,size.id)" anchor="center left" self="center right" :offset="[10, 10]">
                      Нет в наличии
                    </q-tooltip>
                  </q-btn>

                </div>

              </div>



              <q-card-section  class="col-lg-8 col-md-8 col-sm-8 col-xs-12 q-py-none " :class="$q.screen.gt.xs ? 'q-px-lg' : 'no-padding'">
                <div class="q-gutter-md q-mb-lg gt-xs">
                  <q-btn :label="size.name "
                         v-for="(size,index) in openedItem.size"
                         :key="size.id"
                         @click="selectedType=index"
                         :disable="check_ost(openedItem.id,size.id)"
                         :outline="selectedType!==index"
                         rounded
                         unelevated
                         color="primary">
                  </q-btn>

                </div>
                <div class="itemCard__info">
                  <p class="text-weight-semi-bold font-size-20">Комплект:</p>
                  <p class="font-size-16 text-grey-6" v-html="openedItem.size[selectedType].sostav"></p>
                </div>
                <div class="font-size-20">
                  <p class="q-mb-none text-weight-semi-bold">Состав: <span class="text-grey-6 text-weight-medium">{{openedItem.sostav}}</span></p>
                  <p class=" text-weight-semi-bold">Производство: <span class="text-grey-6 text-weight-medium">{{openedItem.country}}</span></p>
                </div>
                <div class="" >
                  <p style="border-radius: 4px" class="inline-block shadow-4 q-pa-sm font-size-18 text-weight-semi-bold">
                    Цена: <span class="text-primary text-weight-bold font-size-25">
                    {{openedItem.size[selectedType].price}} BYN
                  </span>
                  </p>

                </div>
                <div class="">
                  <q-btn @click="addToCart(openedItem.id,openedItem.size[selectedType].id)" label="Заказать " size="lg" class="q-px-xl" rounded unelevated color="primary"/>
                </div>


              </q-card-section>


            </q-card-section>
          </q-card>
        </q-card-section>



      </q-card>
    </q-dialog>
    <q-dialog v-model="callBack" >
      <q-card class="callbackModal" style="width: 990px; max-width: 70vw;">
        <q-card-section horizontal class="row items-start justify-between q-pb-none" :class="[$q.screen.gt.xs ? 'q-pl-md q-pt-md q-pr-md': 'q-pl-md q-pr-md q-pt-md']">
          <p class="font-size-25 text-weight-bold text-center text-primary no-margin full-width title_text" >Заказать звонок </p>

          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section :class="[$q.screen.gt.xs ? '': 'q-pa-sm']">
          <div  class="text-center">
            <p class="font-size-25 text-weight-semi-bold inner_text"><span class="text-primary">Оставьте номер телефона с Viber,</span> мы свяжемся с Вами и вышлем эксклюзивные расцветки, которых нет на сайте!</p>
            <q-form style="margin: 0 auto" @submit="sendMail('callback')" class="callback-form q-mb-md ">
              <q-input  v-model="name" class="full-width q-mb-md" label="Ваше имя"/>

              <q-input  v-model="phone" class="full-width q-mb-sm" label="Ваш телефон *"
                        mask="+375 (##) ###-##-##"
                        fill-mask=""
                        lazy-rules :rules="[val => !val.includes('_') || 'Введите корректный номер телефона']"/>
              <div>
                <q-btn label="Готово" :loading="is_loading" type="submit" rounded unelevated class="full-width" size="lg" color="primary"/>
              </div>
            </q-form>
          </div>

        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="quiz">
      <q-card class="quizModal" style="width: 1170px; max-width: 80vw;">
        <q-card-section horizontal class="row items-start  q-pb-none" :class="[$q.screen.gt.xs ? 'q-pa-md': 'q-pa-sm']">
          <div class="font-size-20 text-primary text-weight-semi-bold"><span class="text-weight-bold">Ответив на 4 простых вопроса,</span>  вы определитесь с подходящим комплектом белья и получите дизайнерскую открытку в подарок</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />

        </q-card-section>
        <q-card-section :class="[$q.screen.gt.xs ? '': 'q-pa-sm']">
          <q-separator color="primary"/>

          <div v-if="currStep<4" class="flex items-center justify-between">
            <h3 class="text-weight-semi-bold font-size-25 text-center col-grow">{{quizQuestions[currStep].title}}</h3>
            <div class="">
              <p class="quiz-step text-weight-semi-bold text-primary no-margin">{{currStep+1}}/4</p>
            </div>
          </div>
          <q-tab-panels v-model="currStep" animated >
            <q-tab-panel :name="index" v-for="(q,index) in quizQuestions" :key="q.id">
              <div v-if="!q.is_form" class="quiz-grid">
                <div class="quiz-item" v-for="i in q.choices" :key="i.id">
                  <div class="quiz-item__img" :class="{'itemSelected':quizAnswers[currStep].answer===i.name}"
                       :style="{'background': `url(quiz/q${currStep+1}-${i.id}.png)`}">
                    <!--                <img :src="`img/q${currStep+1}-${i.id}.png`" alt="">-->
                  </div>
                  <div class="quiz-item__bottom">
                    <q-btn rounded @click="quizAnswers[currStep].answer=i.name" class="full-width q-mb-md "
                           :outline="quizAnswers[currStep].answer!==i.name" color="primary"
                           :size="$q.screen.gt.xs ? 'md' : 'sm'"
                           :label="i.name"/>

                    <div class="q-pl-md">
                      <p class="font-size-16 text-grey-8" v-html="i.info"></p>
                    </div>
                  </div>

                </div>
              </div>
              <div v-if="!q.is_form" class="flex items-center justify-between no-wrap">
                <q-btn v-if="currStep>0" rounded @click="currStep-=1"  color="grey-7" :size="$q.screen.gt.sm ? 'md' : 'sm'" icon="west" label="Назад"/>
                <div v-else class=""></div>
                <q-btn rounded @click="currStep+=1"   color="primary" :size="$q.screen.gt.sm ? 'md' : 'sm'" icon-right="east" label="Далее"/>
              </div>
              <div v-if="q.is_form" class="text-center">
                <p class="font-size-25 text-weight-bold text-primary">Отлично! </p>
                <p class="font-size-25 text-weight-semi-bold">Сейчас наши дизайнеры подберут для Вас идеальные варианты и перезвонят через 5 минут! Оставьте свой номер телефона:)</p>
                <q-form style="margin: 0 auto" @submit="sendMail('quiz')" class="callback-form q-mb-md ">
                  <q-input  v-model="name" class="full-width q-mb-md" label="Ваше имя"/>
                  <q-input  v-model="phone" class="full-width q-mb-sm" label="Ваш телефон *"
                            mask="+375 (##) ###-##-##"
                            fill-mask=""
                            lazy-rules :rules="[val => !val.includes('_') || 'Введите корректный номер телефона']"/>
                  <div>
                    <q-btn label="Готово" :loading="is_loading" type="submit" rounded unelevated class="full-width" size="lg" color="primary"/>
                  </div>
                </q-form>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import CD from '@chenfengyuan/vue-countdown'
import { scroll } from 'quasar'
import {mapGetters,mapActions} from 'vuex'
const { getScrollTarget, setScrollPosition } = scroll
export default {
  components:{
    CD
  },
  data () {
    return {
      callBack: false,
      tab:'',
      cart:false,
      itemCard:false,
      quiz:false,
      shape:'',
      name:null,
      total_pages:null,
      current_page:1,
      current_slug:'',
      is_loading:false,
      promocode:null,
      openedItem:{ "id": 1,"selected_size":1, "size": [ { "id": 1, "sostav": "<p>1 простыня 150x220;<br />\r\n1 пододеяльник 150x220;<br />\r\n2 наволочки 70x70;)</p>", "name": "1.5 спальное", "price": 100, "is_selected": false }, { "id": 2, "sostav": "<p>1 простыня 180x220;<br />\r\n1 пододеяльник 180x220;<br />\r\n2 наволочки 70x70</p>", "name": "2 спальное", "price": 200, "is_selected": false }, { "id": 3, "sostav": "<p>1 простыня 220x240;<br />\r\n1 пододеяльник 200x220; 2 наволочки 70x70;<br />\r\n2 наволочки 50x70</p>", "name": "Евро", "price": 300, "is_selected": false }, { "id": 4, "sostav": "<p>1 простыня 220x240;<br />\r\n2 пододеяльника;<br />\r\n2 наволочки 70x70;<br />\r\n2 наволочки 50x70</p>", "name": "Семейное", "price": 400, "is_selected": false } ], "image": "", "sostav": "хлопок 100%", "country": "Турция", "name": "Товар1 красный", "article": "т1", "is_active": true, "is_present": true, "created_at": "2021-04-23T15:53:29.161435+03:00", "category": 1 },
      items:[ { "id": 1,"selected_size":1, "size": [ { "id": 1, "sostav": "<p>1 простыня 150x220;<br />\r\n1 пододеяльник 150x220;<br />\r\n2 наволочки 70x70;)</p>", "name": "1.5 спальное", "price": 100, "is_selected": false }, { "id": 2, "sostav": "<p>1 простыня 180x220;<br />\r\n1 пододеяльник 180x220;<br />\r\n2 наволочки 70x70</p>", "name": "2 спальное", "price": 200, "is_selected": false }, { "id": 3, "sostav": "<p>1 простыня 220x240;<br />\r\n1 пододеяльник 200x220; 2 наволочки 70x70;<br />\r\n2 наволочки 50x70</p>", "name": "Евро", "price": 300, "is_selected": false }, { "id": 4, "sostav": "<p>1 простыня 220x240;<br />\r\n2 пододеяльника;<br />\r\n2 наволочки 70x70;<br />\r\n2 наволочки 50x70</p>", "name": "Семейное", "price": 400, "is_selected": false } ], "image": "", "sostav": "хлопок 100%", "country": "Турция", "name": "Товар1 красный", "article": "т1", "is_active": true, "is_present": true, "created_at": "2021-04-23T15:53:29.161435+03:00", "category": 1 }],
      ostatki:[],
      cats:[],
      currentCat:{},
      phone:'+375 (__) ___-__-__',
      selectedType:1,
      currFeature:0,
      currStep:0,
      coords:[53.897212, 27.555534],
      quizAnswers:[
        {id:1,question:'Выберите размер постельного белья',answer:'1.5 спальное'},
        {id:2,question:'Дизайнерское или монотонное белье?',answer:'Дизайнерское'},
        {id:3,question:'Для себя или в подарок?',answer:'Для себя'},
        {id:4,question:'В какой город необходима доставка?',answer:'по Минску'},
        {id:5,question:'Данные формы',answer:[
            {name:''},
            {phone:''},
          ]},
      ],
      quizQuestions:[
        {id:1,title:'Выберите размер постельного белья',choices:[
            {id:1,name:'1.5 спальное',url:'q1-1.png',info:`1 простыня 150x220;<br>1 пододеяльник 150x220;<br>2 наволочки 70x70;)`},
            {id:2,name:'2 спальное',url:'q1-1.png',info:`1 простыня 180x220; <br>1 пододеяльник 180x220;<br>2 наволочки 70x70`},
            {id:3,name:'Евро',url:'q1-1.png',info:`1 простыня 220x240;<br>1 пододеяльник 200x220; 2 наволочки 70x70;<br>2 наволочки 50x70 `},
            {id:4,name:'Семейное',url:'q1-1.png',info:`1 простыня 220x240;<br>2 пододеяльника; <br>2 наволочки 70x70;<br>2 наволочки 50x70`},
          ],is_form:false
        },
        {id:2,title:'Дизайнерское или монотонное белье?',choices:[
            {id:1,name:'Дизайнерское',url:'assets/q1-1.png',info:''},
            {id:2,name:'Монотонное',url:'assets/q1-1.png',info:''},
          ],is_form:false
        },
        {id:3,title:'Для себя или в подарок?',choices:[
            {id:1,name:'Для себя',url:'assets/q1-1.png',info:''},
            {id:2,name:'В подарок',url:'assets/q1-1.png',info:''}
          ],is_form:false
        },
        {id:4,title:'В какой город необходима доставка?',choices:[
            {id:1,name:'по Минску',url:'assets/q1-1.png',info:''},
            {id:2,name:'По Беларуси',url:'assets/q1-1.png',info:''}
          ],is_form:false
        },
        {id:5,title:'',choices:[],is_form:true
        }
      ],
      sliderOption: {
        spaceBetween: 10,
        loop:true,
        centeredSlides: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          320: {
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 50
          },
          350: {
            centeredSlides: true,
            slidesPerView: 1,

          },
          900: {
            centeredSlides: false,
            spaceBetween: 20,

            slidesPerView: 3,
          }
        }
      },
      sliderCertOption: {
        spaceBetween: 10,
        loop:true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          350: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          900: {
            slidesPerView: 4,
            centeredSlides: false,
          }
        }
      },
    }
  },
  async mounted() {
    const response_cats = await this.$api.get('/api/get_cats')
    this.cats = response_cats.data
    let cat_slug = this.$route.params.cat_slug
    console.log(cat_slug)
    if (cat_slug !== undefined){
      this.currentCat = this.cats.find(x=>x.name_slug === cat_slug)
      this.current_slug = this.$route.params.cat_slug
      this.getItems(this.current_slug,false)
    }else{
      this.currentCat = this.cats[0]
      this.current_slug = this.cats[0].name_slug
      this.getItems(this.current_slug,false)
    }
  },
  methods:{
    ...mapActions('cart',['fetchCart']),
    async sendMail(type){
      this.is_loading = true
      let data
      if (type === 'callback'){
        data = {
          name: this.name,
          phone: this.phone,
        }
      }
      if (type === 'quiz'){
        data = {
          name: this.name,
          phone: this.phone,
          quiz: this.quizAnswers
        }
      }
      if (type === 'order'){
        data = {
          session_id:this.$q.cookies.get('session_id'),
          name: this.name,
          phone: this.phone
        }
      }
      const response_items = await this.$api.post(`/api/send_mail`,{type:type, data:data})
      this.is_loading = false
      if (type === 'order'){
        await this.fetchCart()
      }
    },
    changePage(name_slug){
      console.log(name_slug)
      window.location.href = `/${name_slug}`
    },
    async getItems(slug,next_page){

      if (!next_page){
        const response_items = await this.$api.get(`/api/get_items?cat_slug=${slug}`)
        this.items = response_items.data.results
        this.total_pages = response_items.data.page_count
        const response_ost = await this.$api.get(`/api/get_ost?cat_slug=${slug}`)
        this.ostatki = response_ost.data
      }else{
        this.is_loading = true
        if (!this.current_page+1 > this.total_pages){
          this.current_page+=1
        }
        else {
          this.current_page = this.total_pages
        }
        const response_items = await this.$api.get(`/api/get_items?cat_slug=${slug}&page=${this.current_page}`)

        for (let i of  response_items.data.results){
          this.items.push(i)
        }


        this.is_loading = false
      }

    },
    async changeItem(item_id,size_id,action){
      const response= await this.$api.post(`/api/${action}`,
        {
          session_id:this.$q.cookies.get('session_id'),
          item_id:item_id,
          size_id:size_id
        })
      console.log(response.data)
      await this.fetchCart()
    },
    async addToCart(item_id,size_id){
      const response= await this.$api.post('/api/add_to_cart',
        {
          session_id:this.$q.cookies.get('session_id'),
          item_id:item_id,
          size_id:size_id
        })
      console.log(response.data)
      await this.fetchCart()
    },
    showItem(index){
      this.openedItem = this.items[index]
      console.log(this.openedItem)
      this.selectedType = 0
      this.itemCard = true
    },
    check_ost(item_id,size_id){
      let item = this.ostatki.filter(x=>x.item===item_id)
      let size = item.find(x=>x.size === size_id)
      if (size){
        return size.ostatok === 0
      }else {
        return true
      }
    },
    openFeature(id){
      this.currFeature = id
    },
    formSubmit(){
      console.log('submit')
    },
    scrollToElement (el) {
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 500
      setScrollPosition(target, offset, duration)
    }
  },
  computed: {
    ...mapGetters('cart',['cart_items_count','cart_total_price','items_in_cart']),
    currentIndex() {
      if (this.$route.path === '/'){
        return 0
      }
      if (this.$route.path === '/pled'){
        return 1
      }

    }
  }
}
</script>
<style lang="sass">
.cart-item
  width: 1000px
.itemCard
  padding: 20px 40px 75px 60px
@media (max-width: 599px)
  .itemCard
    padding: 0

    & .font-size-20
      font-size: 12px
      margin-bottom: 0
    & .font-size-16
      font-size: 10px
    & .font-size-18
      font-size: 12px
      span
        font-size: 14px
        font-weight: 700
@media (max-width: 599px)
  .swiper-slide
    text-align: center
  .cart-item
    & .q-img
      height: 60px
    &__info
      position: relative
      flex-direction: column
      justify-content: center
      & .col-xs-12
        font-size: 12px
        line-height: 14px
        font-weight: 600
        justify-content: flex-start
        text-align: left
        margin-left: 10px
        padding: 0
        margin-bottom: 6px
        &:last-child
          margin-bottom: 0
    &__delete
      position: absolute
      right: 20px
      top: 50%
      transform: translateY(-50%)

.quiz-grid
  display: grid
  grid-template-columns: repeat(auto-fill,minmax(250px,1fr))
  grid-gap: 20px
.quiz-item
  &__img
    box-shadow: 0px 1px 23px rgba(0, 0, 0, 0.1)
    border-radius: 7px
    text-align: center
    margin-bottom: 20px
    width: 240px
    height: 155px
    background-size: cover !important
    background-repeat: no-repeat !important
    background-position: center !important
    img
      object-fit: cover
    &.itemSelected
      box-shadow: 0px 1px 23px rgba(93, 154, 230, 0.25)

@media (max-width: 599px)
  .callbackModal
    & .title_text
      font-size: 14px
      padding-top: 8px
    & .inner_text
      font-size: 10px
      line-height: 12px
  .quizModal
    & .font-size-25
      font-size: 10px
      line-height: 12px
    & .font-size-20
      font-size: 12px
      text-align: center
      line-height: 14px
  .quiz
    &-step
      font-size: 12px
    &-grid
      margin-bottom: 30px
    &-item
      display: grid
      grid-template-columns: 1fr 1fr
      &__img
        width: 110px
        height: 65px
      &__bottom
        & .font-size-16
          font-size: 9px


.footer
  background: #F6F9FF
  padding: 50px 0
.feedbacks-slider
  padding: 30px 0
  & .swiper-slide
    transition: all .2s linear
  & .swiper-slide-active
    transition: all .2s linear
    transform: scale(1.1)

.offer
  padding-top: 100px
  position: relative
  height: 720px
  background-position: right !important
  background-repeat: no-repeat !important
  h1
    max-width: 685px
    line-height: 54px
  &-buttons
    margin-bottom: 50px
  &-bottom
    bottom: -30px
    position: absolute
    padding: 40px 85px
    left: 10%
    right: 10%
    background: #FFFFFF
    border: 2px solid rgba(93, 154, 230, 0.28)
    box-sizing: border-box
    border-radius: 6px
    display: flex
    align-items: center
    justify-content: space-between
    &__item
      display: flex
      align-items: center
      justify-content: left
      flex-basis: 285px
      svg
        margin-right: 15px
      p
        font-weight: 600
        font-size: 22px
        line-height: 22px

.postel-bg
  background-image: url("../assets/offer_bg/postel.png")
.pled-bg
  background-image: url("../assets/offer_bg/pled.png")
.timer-item
  position: relative
  min-width: 90px
  &::after
    position: absolute
    content: ':'
    top: 0
    right: -5px
    color: $primary
    font-size: 30px
    font-weight: bold
  &:first-child
    min-width: unset
    &::after
      right: -13px
  &:last-child
    &::after
      content: none


@media (max-width: 599px)
  .offer
    height: 605px
    padding-top: 70px
    background-position: bottom !important
    background-size: cover !important
    h1
      line-height: 19px
      text-align: center
    & .font-size-12
      margin: 0 auto
    &-buttons
      margin: 0
      button
        margin: 0
        width: 100%
        &:first-child
          margin-bottom: 10px
    &-timer
      margin: 0 auto 180px
    & .timer-item
      min-width: 70px
      & .text-h3
        font-size: 30px
      &:first-child
        &::after
          right: -5px
    &-bottom

      padding: 20px 10px
      left: 10px
      right: 10px
      bottom: -120px
      display: grid
      grid-template-columns: 1fr 1fr
      &__item
        svg
          width: 28px
          margin-right: 10px
        p
          font-size: 10px
          line-height: 10px
          max-width: 90px

  .postel-bg
    background-image: url("../assets/offer_bg/postel-m.png")
    background-size: contain !important

.why-we
  height: 710px
  margin-top: -40px
  background: url("../assets/curved_bg.png")
  padding-top: 110px
  margin-bottom: 60px
  &__subtitle
    max-width: 500px
    margin: 0 auto 50px
    line-height: 25px
  &__wrapper
    height: 50%
    position: relative
  //&__left
  &__center
    position: absolute
    background-position: center !important
    background-repeat: no-repeat !important
  //&__right
  &__item
    position: relative
    padding-left: 30px
    &-title
      position: relative
      line-height: 100%
      max-width: 305px
      &::before
        position: absolute
        content: url("../assets/bullet.png")
        top: -7px
        left: -43px
    &-subtitle
      line-height: 100%
      max-width: 330px
    &.item-first
      &::before
        position: absolute
        content: url("../assets/why_we/a1.png")
        right: -100px
        bottom: 0
    &.item-second
      &::before
        position: absolute
        content: url("../assets/why_we/a2.png")
        right: 0
        bottom: -25px
    &.item-third
      &::before
        position: absolute
        content: url("../assets/why_we/a3.png")
        left: -110px
    &.item-fourth
      &::before
        position: absolute
        content: url("../assets/why_we/a4.png")
        left: 0
        bottom: -50px

.why-we-postel-bg
  height: 420px
  width: 530px

  left: 50%
  transform: translateX(-50%)

  background-repeat: no-repeat !important
  background-size: contain !important
@media (max-width: 599px)
  .why-we
    background: url("../assets/curved_bg-m.png")
    padding-top: 180px
    background-size: cover
    height: 870px
    &__subtitle
      font-size: 12px
      line-height: 12px
      margin-bottom: 290px
    &__left
      justify-content: flex-start

    &__right
      justify-content: flex-start
      margin-top: -100px
    &__item
      padding-left: 50px
      &-title
        font-size: 12px
      &-subtitle
        font-size: 10px
      &.item-first
        &::after
          position: absolute
          top: -90px
          content: url("../assets/why_we/a1-m.png")
        &::before
          content: none
      &.item-second
        &::before
          content: none
      &.item-third
        &::before
          content: none
      &.item-fourth
        &::before
          content: none
  .why-we-postel-bg
    top: -110%
    width: 80%
    background-image: url("../assets/why_we/why_we_postel-m.png")

.features
  margin-bottom: 60px
  h3
    max-width: 915px
    margin: 0 auto 45px
    line-height: 54px
  &-header
    border: 2px solid rgba(93, 154, 230, 0.28)
    box-sizing: border-box
    border-radius: 105px
  &-grid
    height: 250px
    display: grid
    grid-template-columns: 1fr 1fr
    grid-column-gap: 60px


@media (max-width: 599px)
  .features
    margin-bottom: 25px
    &-header
      font-size: 12px
      font-weight: 600
    &-text
      font-size: 12px
      line-height: 13px
    h3
      line-height: 19px
    &-grid
      height: fit-content
      grid-template-columns: 1fr
      grid-gap: 15px
.catalog
  margin-bottom: 50px
  &-card
    max-width: 360px
  &-grid
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 10px
    margin-bottom: 90px
//grid-column-gap: 30px
//grid-row-gap: 50px

@media (max-width: 599px)
  .catalog
    &-card
      max-width: unset
      & .q-card__section
        padding: 0 8px
      & .q-card__actions
        padding: 0 8px
      & .text-h6
        font-size: 12px
        font-weight: 700
      & .font-size-18
        font-size: 10px
      & .font-size-16
        font-size: 10px
        margin-bottom: 5px
      & .q-px-lg
        padding: 0
      & button
        width: 100%
        margin-left: 0 !important
        margin-bottom: 5px

    &-grid
      grid-template-columns: 1fr 1fr
.quiz
  background: url("../assets/quiz-bg.png") no-repeat center
  height: 750px
  padding-top: 120px
  margin-bottom: 90px
  &-subtitle
    position: relative
    max-width: 810px
    margin: 0 auto 120px
    text-align: center
    line-height: 35px
    &::before
      position: absolute
      content: url("../assets/gift.png")
      right: 85px
      bottom: -8px
    &::after
      position: absolute
      content: url("../assets/quiz-arrow.png")
      right: 135px
      bottom: -100px

@media (max-width: 599px)
  .quiz
    background: url("../assets/quiz-bg-m.png") no-repeat center

    background-size: cover
    height: 535px
    padding-top: 65px
    padding-left: 15px
    padding-right: 15px
    &-subtitle
      font-size: 14px
      line-height: 20px
      max-width: 300px
      margin-bottom: 10px
      &::before
        content: url("../assets/gift-m.png")
        right: 47px
        bottom: -3px
      &::after
        content: url("../assets/quiz-arrow-m.png")
        right: 24px


.warning
  margin-bottom: 90px
@media (max-width: 599px)
  .warning
    img
      width: 175px
      height: 175px
      margin-bottom: 30px
    &-text
      width: 100%
      text-align: center
    & .font-size-25
      font-size: 12px
      line-height: 17px

.timer
  margin-bottom: 90px
  & .timer-item
    &::after
      color: white
@media (max-width: 599px)
  .timer
    margin-bottom: 45px
    padding-top: 20px
    padding-bottom: 30px


.feedbacks
  margin-bottom: 90px
@media (max-width: 599px)
  .feedbacks
    h3
      text-align: center
.certs
  background-image: url("../assets/cert-bg.png")
  height: 750px
  padding-top: 45px
  margin-bottom: 90px
  h3
    max-width: 880px
    line-height: 54px
  &-grid
    display: grid
    grid-template-columns: repeat(auto-fill,minmax(250px,1fr))
    grid-gap: 25px
@media (max-width: 599px)
  .certs
    margin-bottom: 45px
    background-image: url("../assets/cert-bg-m.png")
    height: 375px
    h3
      font-size: 14px
      line-height: 19px
      text-align: center

.faq
  margin-bottom: 90px

@media (max-width: 599px)
  .faq
    margin-bottom: 45px
    & .q-item__label
      font-size: 12px
    & .q-card__section--vert
      font-size: 10px
      line-height: 12px
.callback
  background-image: url("../assets/cb-form.png")
  height: 750px
  margin-bottom: 90px
  padding-top: 135px
  h3
    max-width: 880px
    line-height: 54px
  &-subtitle
    font-size: 25px
    line-height: 35px
    max-width: 760px
    margin-bottom: 70px
  &-form
    max-width: 560px
@media (max-width: 599px)
  .callback
    padding-top: 25px
    background-image: url("../assets/cb-form-m.png")
    height: 485px
    h3
      font-size: 14px
      line-height: 19px
      font-weight: 700
    &-subtitle
      position: relative
      font-size: 10px
      line-height: 14px
      max-width: 180px
      &::after
        position: absolute
        content: url("../assets/callback-m.png")
        bottom: -81px
        right: -147px
        z-index: 0

.map
  background: url("../assets/map-bg.jpg") no-repeat center
  background-size: cover !important
  position: relative
  height: 670px
  &-inner
    top: 150px
    left: 20%
    position: absolute
    background: #FFFFFF
    border-radius: 3px
    padding: 30px 50px


@media (max-width: 599px)
  .map
    height: 400px
    &-inner
      top: 40px
      left: 20px
      right: 20px
      h3
        font-size: 14px
        text-align: center
        margin-bottom: 15px
      & .font-size-25
        font-size: 12px
      & .q-gutter-md
        text-align: center


</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <Drawer />
      </div>
      <div class="col-9">
        <div class="row">
          <div class="col-12">
            <!-- <BreadCrumbs /> -->
            <div></div>
          </div>
          <div class="col-4" v-for="(card, index) in products" :key="index">
            <ProductCard :card="card" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import Drawer from '../components/Drawer.vue'
// import BreadCrumbs from '..components/BreadCrumbs.vue'

export default {
    components: {
        ProductCard,
        Drawer,
        // BreadCrumbs
    },
    mounted() {
        axios.get("api/products/").then(response => this.products = response.data)      
    },
  data() {
    return {
        products: [],
      cards: [
        {
          imgSrc: '/images/productCards/1.jpg',
          title: 'Двигатель MERSEDES OM 904 LA 2-я комплектация',
          model: 'OM905LA',
          id: 35634,
          price: 17000,
          currency: 'RUB',
          status: 'б/у'
        },
        {
          imgSrc: '/images/productCards/2.jpg',
          title: 'Двигатель ',
          model: 'OM905LA',
          id: 25887,
          price: 117320,
          currency: 'RUB',
          status: 'новый      '
        },
        {
          imgSrc: '/images/productCards/3.jpg',
          title: 'Фара левая с регулирующим мотором',
          model: '68416516351',
          id: 548732,
          price: 7160,
          currency: 'RUB',
          status: 'б/у'
        },
        {
          imgSrc: '/images/productCards/1.jpg',
          title: 'Двигатель MERSEDES OM 904 LA 2-я комплектация',
          model: 'OM905LA',
          id: 35634,
          price: 17000,
          currency: 'RUB',
          status: 'б/у'
        },
        {
          imgSrc: '/images/productCards/2.jpg',
          title: 'Двигатель MERSEDES OM 904',
          model: 'OM905LA',
          id: 25887,
          price: 117320,
          currency: 'RUB',
          status: 'новый      '
        },
        {
          imgSrc: '/images/productCards/3.jpg',
          title: 'Фара левая с регулирующим мотором',
          model: '68416516351',
          id: 548732,
          price: 7160,
          currency: 'RUB',
          status: 'б/у'
        }
      ]
    }
  }
}
</script>

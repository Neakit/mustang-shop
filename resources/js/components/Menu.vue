<template>
    <div class="container">
        <div class="row">
            <div 
                v-for="(item, index) in menu"
                :key="index"
                class="menu-item col"
                :class="{ 'menu-item__active': item.to === activePage }"
                @click="goTo(item.to)"
            >
                {{ item.title }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    goTo(path) {
      this.activePage = path
      this.$router.push(path)
    }
  },
  data() {
    return {
      activePage: 0,
      menu: [
        {
          title: 'Главная',
          to: '/'
        },
        {
          title: 'Магазин',
          to: '/shop'
        },
        {
          title: 'Скупка',
          to: '/buying'
        },
        {
          title: 'Доставка',
          to: '/delivery'
        },
        {
          title: 'Гарантия',
          to: '/guarantee'
        },
        {
          title: 'Блог',
          to: '/blog'
        }
      ]
    }
  }
}
</script>

<style>
.menu-item {
  background-color: #cf6100;
  color: #fff;
  text-transform: uppercase;
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
  text-align: center;
  padding: 16px;
  cursor: pointer;
}
.menu-item__active {
  background-color: #f17100;
}
</style>

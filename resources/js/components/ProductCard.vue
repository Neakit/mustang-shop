<template>
  <div class="card">
    <img :src="card.image" class="card-img-top" alt="product-card" />
    <div class="card-body p-2">
      <h5 class="card-title">{{ card.title }}</h5>
      <div>
        <div class="justify-content-between no-gutters row">
          <p class="card-model">{{ card.model }}</p>
          <p class="card-model">{{ card.model }}</p>
        </div>
        <div class="justify-content-between price row no-gutters" >
          <div>
            <p class="card-status">{{ card.status }}</p>
            <p class="card-price">{{ card.price }}₽</p>
          </div>
          <a href="#" @click="order(card.id)" class="btn">Купить</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    order(id) {
      console.log('покупаю товар', id)
    }
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card-title {
  font-size: 18px;
  font-family: 'PT Sans', sans-serif;
}
.card-model {
  font-family: 'PT Sans', sans-serif;
  font-size: 12px;
  color: #212121;
}
.btn {
  background-color: #cf6100;
  color: #fff;
  border-radius: 0;
  width: 116px;
  height: 38px;
}
.price {
  margin-top: 28px;
}
.card {
  min-height: 420px;
  margin: 6px 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-status {
  font-size: 12px;
}
.card-price {
  font-family: 'PT Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
}
</style>

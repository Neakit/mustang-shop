<template>
    <div class="card">
        <div class="card-image-wrap row no-gutters justify-content-center align-items-center">
            <img :src="card.images[0]" class="card-image" alt="product-card" />
        </div>
        <div class="card-body p-2">
            <h5 class="card-title">{{ card.title }}</h5>
            <div>
                <div class="justify-content-between no-gutters row">
                      <p class="card-model">{{ card.model.title }}</p>
                      <p class="card-model">{{ card.id }}</p>
                </div>
                <div class="price row no-gutters justify-content-between align-items-center" >
                    <div>
                        <p class="card-status">{{ card.status.title }}</p>
                        <p class="card-price">{{ card.price }} ₽</p>
                    </div>
                    <router-link :to="`/product/${card.id}`" class="btn">Купить</router-link>
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
    .card-image-wrap {
        height: 210px;
    }
    .card-image {
        max-height: 100%;
        max-width: 100%;
    }
    .card-title {
        font-size: 18px;
        font-family: 'PT Sans', sans-serif;
    }
    .card-model {
        font-family: 'PT Sans', sans-serif;
        font-size: 16px;
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
        /*margin-top: 28px;*/
    }
    .card {
        height: 400px;
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
        margin: 0;
    }
    .card-price {
        margin: 0;
        font-family: 'PT Sans', sans-serif;
        font-weight: 600;
        font-size: 16px;
    }
</style>

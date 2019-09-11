<template>
    <div class="card m-2">
        <div class="card-header">
            <img :src="card.image" class="card-image" alt="product-card" />
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <div class="price row no-gutters justify-content-between align-items-center" >
                <p class="card-created">{{ card.created_at }}</p>
                <router-link class="card-info" :to="`/blog/${card.id}`">Подробнее</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            card: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .card {
        height: 100%;
        max-height: 516px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .card-header {
        height: 75%;
        text-align: center;
    }
    .card-body {
        height: 25%;
    }
    .card-image {
        max-height: 100%;
        max-width: 100%;
    }
    .card-title {
        font-size: 18px;
        font-family: 'PT Sans', sans-serif;
    }
    .card-info {
        font-size: 18px;
        font-family: 'PT Sans', sans-serif;
    }
    .card-created {
        font-size: 12px;
        margin: 0;
    }
</style>

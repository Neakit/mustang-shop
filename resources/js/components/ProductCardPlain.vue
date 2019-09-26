<template>
    <div class="card-plain row py-2">
        <div class="col-12 col-md-8">
            <div class="card-product-content">
                <div>
                    <h5 class="card-product-title">{{ card.title }}</h5>
                    <p class="card-model">{{ card.model.title }}</p>
                </div>

                <div class="justify-content-between no-gutters row">
                    <p class="card-description">{{ card.description }}</p>
                </div>
                
                <div class="row no-gutters justify-content-between align-items-center" >
                    <router-link :to="`/product/${card.id}`" class="btn">Подробнее</router-link>
                    <div>
                        <p class="card-status">{{ card.status.title }}</p>
                        <p class="card-price">{{ card.price }} ₽</p>
                    </div>
                </div>
            
            </div>
        </div>
        <div class="card-image-wrap col-12 col-md-4">
            <img :src="card.images[0]" class="card-image" alt="product-card" />
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
    .card-plain {
        min-height: 200px;
        margin: 6px 0;
        /* padding: 8px; */
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    }
    .card-product-title {
        font-size: 18px;
        /* padding: 4px; */
        font-family: 'PT Sans', sans-serif;
    }
    .card-product-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%; 
    }
    .card-model {
        font-family: 'PT Sans', sans-serif;
        font-size: 16px;
        color: #212121;
    }
    .card-description {
        font-family: 'PT Sans', sans-serif;
        font-size: 14px;
        color: #212121;
    }
    .card-image {
        max-height: 100%;
        max-width: 100%;
    }
    .btn {
        background-color: #cf6100;
        color: #fff;
        border-radius: 0;
        width: 116px;
        height: 38px;
    }
    .card-status {
        text-align: right;
        font-family: 'PT Sans', sans-serif;
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

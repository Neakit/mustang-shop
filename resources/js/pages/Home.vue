<template>
    <div>
        <div class="container-fluid main-section">
            <div class="container h-100">
                <div class="row h-100">
                    <div class="col-3">
                        <Drawer />
                    </div>
                    <div class="col-6 row align-items-center justify-content-center">
                        <img src="/images/bg-title.png">
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row my-3">
                <div class="col-12 col-sm-4 col-md-3" v-for="(product, index) in products.data" :key="index">
                    <ProductCard :card="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Drawer from "../components/Drawer";
    import ProductCard from "../components/ProductCard";
    import { mapGetters } from 'vuex';

    export default {
        components: {
            ProductCard,
            Drawer
        },
        computed: {
            ...mapGetters('product', ['products'])
        },
    }
</script>

<style scoped>
    .main-section {
        background: url('/images/bg-home.png') no-repeat center center;
        height: 593px;
    }
</style>

<template>
    <div>
        <div class="container-fluid main-section">
            <div class="container h-100">
                <div class="row h-100">
                    <div class="col-12 col-md-3">
                        <Drawer />
                    </div>
                    <div class="col-12 col-md-6 row align-items-center justify-content-center">
                        <img src="/images/bg-title.png">
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row my-3">
                <div class="col-12" v-for="(product, index) in products.data" :key="index">
                    <ProductCardPlain :card="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Drawer from "../components/Drawer";
    import ProductCardPlain from "../components/ProductCardPlain";
    import { mapGetters } from 'vuex';

    export default {
        components: {
            ProductCardPlain,
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

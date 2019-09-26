<template>
<!--    <div class="default-layout-wrapper">-->
    <div>
        <Header />
        <Menu />
        <main>
            <router-view></router-view>
        </main>
        <Modal v-show="orderModal"/>
        <OrderSuccess v-show="orderSuccess"/>
        <ProductImageModal v-show="productImageModal"/>
<!--        <Footer />-->
    </div>
</template>

<script>
    import Menu from '../components/Menu';
    import Header from '../components/Header';
    import Modal from '../components/OrderModal';
    import OrderSuccess from '../components/OrderSuccess';
    import ProductImageModal from '../components/ProductImageModal';
    import Footer from '../components/Footer';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        components: {
            Menu,
            Header,
            Modal,
            Footer,
            OrderSuccess,
            ProductImageModal
        },
        mounted() {
            this.getModels();
            this.getCategories();
            this.getProducts();
        },
        computed: {
            ...mapGetters('modals', ['orderModal', 'orderSuccess', 'productImageModal'])
        },
        methods : {
            ...mapActions('category', ['getCategories']),
            ...mapActions('model', ['getModels']),
            ...mapActions('product', ['getProducts'])
        }
    }
</script>

<style>
    .default-layout-wrapper {
        min-height: 100vh;
    }
</style>


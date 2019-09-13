<template>
<!--    <div class="default-layout-wrapper">-->
    <div>
        <Header />
        <Menu />
        <main>
            <router-view></router-view>
        </main>
        <Modal v-show="orderModal"/>
<!--        <Footer />-->
    </div>
</template>

<script>
    import Menu from '../components/Menu';
    import Header from '../components/Header';
    import Modal from '../components/OrderModal'
    import Footer from '../components/Footer';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        components: {
            Menu,
            Header,
            Modal,
            Footer
        },
        mounted() {
            this.getModels();
            this.getProducts();
            this.getCategories();
        },
        computed: {
            ...mapGetters('modals', ['orderModal'])
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


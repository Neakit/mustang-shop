<template>
<!--    <div class="default-layout-wrapper">-->
    <div>
        <Header />
        <Menu />
        <main>
            <router-view></router-view>
        </main>
<!--        <Footer />-->
    </div>
</template>

<script>
    import Menu from '../components/Menu';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { mapActions } from 'vuex';

    export default {
        components: {
            Menu,
            Header,
            Footer
        },
        mounted() {
            this.getModels();
            this.getProducts();
            this.getCategories();
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


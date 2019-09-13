<template>
        <div class="container mt-2">
            <div>
                <BreadCrumbs />
            </div>
            <div class="row">
                <div class="col-12 col-md-4">
                    <img :src="product.image" alt="product-image" class="product-page-image">
                </div>
                <div class="col-12 col-md-8 product-page-descripton">
                    <div>
                        <span class="small-text text-muted float-left">{{ product.title }}</span>
                        <span class="small-text float-right">Available Quantity: {{ product.description }}</span>
                    </div>

                    <button @click="openOrderModal" class="btn">Оформить заказ</button>
                </div>
            </div>
        </div>
    </template>

<script>
    import BreadCrumbs from '../components/BreadCrumbs.vue'
    import { mapMutations } from 'vuex';

    export default {
        components: {
            BreadCrumbs
        },
        data(){
            return {
                product : []
            }
        },
        beforeMount(){
            let url = `/api/products/${this.$route.params.id}`;
            this.$axios.get(url).then(res => this.product = res.data)
        },
        methods: {
            ...mapMutations('modals', ['toggleModal']),
            openOrderModal() {
                this.toggleModal({ name: 'orderModal', bool: true });
            }
        }
    }
</script>

<style scoped>
    .product-page-image {
        width: 100%;
        max-height: 400px;
    }
    .product-page-descripton {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-height: 400px;
    }
    .btn {
        background-color: #cf6100;
        color: #fff;
        border-radius: 0;
        height: 38px;
        align-self: flex-end;
    }
    .small-text { font-size: 18px; }
    .title { font-size: 36px; }
</style>

<template>
    <div>
        <div class="container-fluid main-section">
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <Drawer />
                    </div>
                    <div class="col-6">
                        title
                    </div>
                </div>
            </div>
        </div>
<!--            <div class="container">-->
<!--                 <div class="row">-->
<!--                            <input type="text" v-model="product">-->
<!--                            <button @click="search">find</button>-->
<!--                        </div>-->
<!--                <div class="row">-->
<!--                    <div class="col-md-12">-->
<!--                        <div class="row">-->
<!--                            <div class="col-md-4 product-box" v-for="(product,index) in products" :key="index">-->
<!--                                <router-link :to="{ path: '/products/'+product.id}">-->
<!--                                    <img :src="product.image" :alt="product.name">-->
<!--                                    <h5><span v-html="product.name"></span>-->
<!--                                        <span class="small-text text-muted float-right">{{ product.price }}</span>-->
<!--                                    </h5>-->
<!--                                    <button class="col-md-4 btn btn-sm btn-primary float-right">Buy Now</button>-->
<!--                                </router-link>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        &lt;!&ndash; <router-view></router-view> &ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
    </div>
</template>

<script>
    import Drawer from "../components/Drawer";
    export default {
        components: {Drawer},
        data(){
            return {
                products : [],
                product: ''
            }
        },
        methods: {
            // search(){
            //     console.log('search called');
            //     axios.post('api/product', {query: this.product}).then(res => console.log(res))
            // }
        },
        mounted(){
            // axios.get("api/products/").then(response => this.products = response.data)
        }
    }
</script>

<style scoped>
    .main-section {
        background: url('/images/bg-home.png') no-repeat center center;
        height: 593px;
    }
    .small-text {
        font-size: 14px;
    }
    .product-box {
        border: 1px solid #cccccc;
        padding: 10px 15px;
    }
    .hero-section {
        height: 30vh;
        background: #ababab;
        align-items: center;
        margin-bottom: 20px;
        margin-top: -20px;
    }
    .title {
        font-size: 60px;
        color: #ffffff;
    }
    </style>

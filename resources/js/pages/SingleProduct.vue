<template>
    <div class="container mt-2">
        <div>
            <BreadCrumbs />
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <div style="width:100%; margin:20px auto; height: 200px">
                    <!-- Using the slider component -->
                    <slider ref="slider" :options="options">
                        <!-- slideritem wrapped package with the components you need -->
                        <slideritem v-for="(image, index) in images" :key="index" >
                            <img :src="image" alt="" style="width: 100%; cursor: pointer" @click="setImageWrap(image)">
                        </slideritem>
                        <!-- Customizable loading -->
                        <div slot="loading">loading...</div>
                    </slider>
                </div>
            </div>
            <div class="col-12 col-md-6 product-page-descripton">
                <div>
                    <span class="small-text text-muted float-left">{{ product.title }}</span>
                    <span class="small-text float-left"><bold>Описание: </bold>{{ product.description }}</span>
                </div>

                <button @click="openOrderModal" class="btn">Оформить заказ</button>
            </div>
        </div>
    </div>
</template>

<script>
    import BreadCrumbs from '../components/BreadCrumbs.vue'
    import { mapMutations } from 'vuex';
    import { slider, slideritem } from 'vue-concise-slider'

    export default {
        components: {
            BreadCrumbs,
            slider,
            slideritem
        },
        data(){
            return {
                product : [],
                images: [],
                someList:[
                {
                    html: 'slide1',
                    style: {
                        'background': '#1bbc9b'
                    }
                },
                {
                    html: 'slide2',
                    style: {
                        'background': '#4bbfc3'
                    }
                },
                {
                    html: 'slide3',
                    style: {
                        'background': '#7baabe'
                    }
                }
                ],
                //Slider configuration [obj]
                options: {
                    currentPage: 0,
                    loop: true,
                    autoplay: '2000'
                }
            }
        },
        mounted(){
            let url = `/api/products/${this.$route.params.id}`;
            this.$axios.get(url).then(res => { 
                this.images = JSON.parse(res.data.images);
                return this.product = res.data
            });
        },
        methods: {
            ...mapMutations('modals', ['toggleModal']),
            ...mapMutations('order', ['setOrder']),
            ...mapMutations(['setImage']),
            setImageWrap(image) {
                this.setImage(image);
                this.toggleModal({ name: 'productImageModal', bool: true });
            },
            openOrderModal() {
                this.setOrder({
                    id: this.product.id, 
                    title: this.product.title,
                    description: this.product.description
                });
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

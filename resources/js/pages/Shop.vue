<template>
    <div class="container">
		<div class="row">
			<div class="col-3">
				<Drawer />
			</div>
			<div class="col-9">
				<div class="row">
					<div class="col-12">
					<!-- <BreadCrumbs /> -->
						<div></div>
					</div>
					<div class="col-4" v-for="(card, index) in products" :key="index">
<!--						<ProductCard :card="card" />-->
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import Drawer from '../components/Drawer.vue'
// import BreadCrumbs from '..components/BreadCrumbs.vue'
import axios from 'axios';

export default {
    components: {
        ProductCard,
        Drawer,
        // BreadCrumbs
    },
    mounted() {
        axios.get("api/products/").then(response => {
            return this.products = response.data
        })
    },
    methods: {
        search(){

        }
    },
    data() {
        return {
            products: []
        }
    }
}
</script>

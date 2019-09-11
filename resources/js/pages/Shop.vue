<template>
    <div class="container">
		<div class="row">
			<div class="col-12 col-md-3">
				<Drawer />
			</div>
			<div class="col-12 col-md-9">
				<div class="row">
					<div class="col-12 my-2">
                        <BreadCrumbs />
					</div>
					<div class="col-12 col-md-6 col-lg-4" v-for="(card, index) in products.data" :key="index">
						<ProductCard :card="card" />
					</div>
				</div>
			</div>
            <div class="row justify-content-center col-9 offset-3 my-2">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"
                            :class="{ disabled: 1 === products.current_page }"
                        >
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Назад</a>
                        </li>
                        <li
                            v-for="(page, index) in products.last_page"
                            :key="index"
                            class="page-item"
                            :class="{ active: page === products.current_page }"
                        >
                            <a @click="getProductsPage(page)" class="page-link" href="#">{{ page }}</a>
                        </li>
                        <li class="page-item"
                            :class="{ disabled:  products.current_page === products.last_page }"
                        >
                            <a class="page-link" href="#">Далее</a>
                        </li>
                    </ul>
                </nav>
            </div>
		</div>
    </div>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs.vue'
import ProductCard from '../components/ProductCard.vue'
import Drawer from '../components/Drawer.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        ProductCard,
        Drawer,
        BreadCrumbs
    },
    methods: {
        ...mapActions('product', ['getProducts']),
        getProductsPage(page) {
            this.getProducts({ params: { page } });
        },
        search(){

        }
    },
    computed: {
        ...mapGetters('product', ['products'])
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    .page-item.active .page-link {
        background-color: #cf6100;
        border-color: #cf6100;
    }
</style>

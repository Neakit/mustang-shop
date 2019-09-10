<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2">
                <div class="alert alert-primary" role="alert">
                    Фильтр категорий
                </div>
                <form>
                    <div class="form-group">
                        <label for="category-title">Название:</label>
                        <input type="text" class="form-control" id="category-title" v-model="title">
                    </div>
                </form>
                <button class="btn btn-warning btn-block" @click="clearFilter">Очистить фильтр</button>
                <button class="btn btn-primary btn-block" @click="filterCategories">Поиск</button>
            </div>
            <div class="row col-8">
                <table class="table table-responsive table-striped">
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Категория</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(category, index) in categories" :key="index">
                        <td>{{ category.id }}</td>
                        <td>{{ category && category.title || '' }}</td>
                        <td>{{ category && category.description || '' }}</td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-warning"
                                @click="editProduct(product)"
                            >Редактировать</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!--                <modal :product="product" v-show="productModal"></modal>-->
            </div>
            <div class="col-2 align-content-start">
                <button class="btn btn-primary btn-block" @click="addNewProduct">Добавить новую категорию</button>
            </div>
        </div>
    </div>
</template>

<script>
    // import Modal from '../../components/ProductModal'
    import { mapGetters, mapMutations, mapActions, mapState } from 'vuex';

    export default {
        data() {
            return {
                product_model_id: "",
                title: ""
            }
        },
        components: {
            // Modal
        },
        computed: {
            ...mapGetters('category', ['categories']),
        },
        methods: {
            ...mapMutations(['toggleProductModal']),
            ...mapActions(['getCategories']),
            filterCategories() {
                const params = {
                    title: this.title,
                    model_id: this.model_id,
                    category_id: this.category_id
                };
                this.getProducts({ params });
            },
            // clearFilter() {
            //     this.category_id = "";
            //     this.model_id = "";
            //     this.title = "";
            //     this.getProducts();
            // },
            // getProductsPage(page) {
            //     this.getProducts({ params: { page } });
            // },
            // addNewProduct() {
            //     this.toggleProductModal(true);
            // },
            // editProduct(product) {
            //     this.product = {
            //         id: product.id,
            //         image: product.image,
            //         title: product.title,
            //         category: product.category,
            //         model: product.model,
            //         status: product.status,
            //         description: product.description,
            //         price: product.price
            //     };
            //
            //     this.toggleProductModal(true);
            // }
        }
    }
</script>

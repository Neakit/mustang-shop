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
                    <div class="form-group">
                        <label for="category-id">Категория:</label>
                        <select class="form-control" id="category-id" v-model="category_id">
                            <option disabled value="">Выберите категорию</option>
                            <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.title }}</option>
                        </select>
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
                        <td>Описание</td>
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
            <!--            <div class="row justify-content-center col-12">-->
            <!--                <nav aria-label="Page navigation example">-->
            <!--                    <ul class="pagination">-->
            <!--                        <li class="page-item"-->
            <!--                            :class="{ disabled: 1 === products.current_page }"-->
            <!--                        >-->
            <!--                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Назад</a>-->
            <!--                        </li>-->
            <!--                        <li-->
            <!--                            v-for="(page, index) in products.last_page"-->
            <!--                            :key="index"-->
            <!--                            class="page-item"-->
            <!--                            :class="{ active: page === products.current_page }"-->
            <!--                        >-->
            <!--                            <a @click="getProductsPage(page)" class="page-link" href="#">{{ page }}</a>-->
            <!--                        </li>-->
            <!--                        <li class="page-item"-->
            <!--                            :class="{ disabled:  products.current_page === products.last_page }"-->
            <!--                        >-->
            <!--                            <a class="page-link" href="#">Далее</a>-->
            <!--                        </li>-->
            <!--                    </ul>-->
            <!--                </nav>-->
            <!--            </div>-->
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

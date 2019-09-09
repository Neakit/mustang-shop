 <template>
        <div class="row">
            <button class="btn btn-primary" @click="addNewProduct">Добавить новый продукт</button>

            <table class="table table-responsive table-striped">
                <thead>
                    <tr>
                        <td></td>
                        <td>Продукт</td>
                        <td>Категория</td>
                        <td>Модель</td>
                        <td>Описание</td>
                        <td>Цена</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="index">
                        <td>{{ product.id }}</td>
                        <td>{{ product.title }}</td>
                        <td>{{ product.category.title }}</td>
                        <td>{{ product.model.title }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.price }} RUB</td>
                        <td @click="editProduct(product)">Редактировать</td>
                    </tr>
                </tbody>
            </table>
            <modal :product="product" v-show="productModal"></modal>
        </div>
    </template>

    <script>
    import Modal from '../../components/ProductModal'
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        data() {
            return {
                product: null
            }
        },
        components: {
            Modal
        },
        computed: {
            ...mapGetters(['products', 'productModal'])
        },
        methods: {
            ...mapMutations(['toggleProductModal']),
            addNewProduct() {
                this.product = {
                    id: null,
                    image: null,
                    title: null,
                    category: null,
                    model: null,
                    description: null,
                    price: null,
                }

                this.toggleProductModal(true);
            },
            editProduct(product) {
                this.product = {
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    category: product.category.title,
                    model: product.model.title,
                    description: product.description,
                    price: product.price
                }

                this.toggleProductModal(true);
            },

           
        }
    }
    </script>
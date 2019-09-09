 <template>
     <div class="container-fluid">
         <div class="row">
             <div class="col-2">
                 <div class="alert alert-primary" role="alert">
                     Фильтр продуктов
                 </div>
                 <form>
                     <div class="form-group">
                         <label for="exampleFormControlInput1">Название:</label>
                         <input type="text" class="form-control" id="exampleFormControlInput1" v-model="title">
                     </div>
                     <div class="form-group">
                         <label for="exampleFormControlSelect1">Категория:</label>
                         <select class="form-control" id="exampleFormControlSelect1" v-model="category_id">
                             <option disabled value="">Выберите категорию</option>
                             <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.title }}</option>
                         </select>
                     </div>
                     <div class="form-group">
                         <label for="exampleFormControlSelect1">Модель:</label>
                         <select class="form-control" id="exampleFormControlSelect1" v-model="model_id">
                             <option disabled value="">Выберите модель</option>
                             <option v-for="(item, index) in models" :key="index" :value="item.id">{{ item.title }}</option>
                         </select>
                     </div>
                 </form>
                 <button class="btn btn-warning btn-block" @click="clearFilter">Очистить фильтр</button>
                 <button class="btn btn-primary btn-block" @click="filterProducts">Поиск</button>
             </div>
             <div class="row col-8">
                 <table class="table table-responsive table-striped">
                     <thead>
                     <tr>
                         <td>#</td>
                         <td>Продукт</td>
                         <td>Категория</td>
                         <td>Модель</td>
                         <td>Описание</td>
                         <td>Цена</td>
                         <td></td>
                     </tr>
                     </thead>
                     <tbody>
                     <tr v-for="(product, index) in products.data" :key="index">
                         <td>{{ product.id }}</td>
                         <td>{{ product.title }}</td>
                         <td>{{ product.category.title }}</td>
                         <td>{{ product.model.title }}</td>
                         <td>{{ product.description }}</td>
                         <td>{{ product.price }} RUB</td>
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
                 <modal :product="product" v-show="productModal"></modal>
             </div>
             <div class="col-2 align-content-start">
                 <button class="btn btn-primary btn-block" @click="addNewProduct">Добавить новый продукт</button>
             </div>
             <div class="row justify-content-center col-12">
                 <nav aria-label="Page navigation example">
                     <ul class="pagination">
                         <li class="page-item">
                             <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Назад</a>
                         </li>

                         <li
                             v-for="(page, index) in products.last_page"
                             :key="index"
                             class="page-item"
                             :class="{ active: page === products.current_page }"
                         >
                             <a
                                 @click="getProductsChunk(page)"
                                 class="page-link"
                             >{{ page }}</a>
                         </li>

                         <li class="page-item">
                             <a class="page-link" href="#">Далее</a>
                         </li>
                     </ul>
                 </nav>
             </div>
         </div>
     </div>
 </template>

<script>
    import Modal from '../../components/ProductModal'
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    export default {
        data() {
            return {
                product: null,
                category_id: "",
                model_id: "",
                title: ""
            }
        },
        components: {
            Modal
        },
        computed: {
            ...mapGetters([
                'products',
                'categories',
                'models',
                'productModal'
            ])
        },
        methods: {
            ...mapMutations(['toggleProductModal']),
            ...mapActions(['getProducts']),
            filterProducts() {
                const params = {
                    title: this.title,
                    model_id: this.model_id,
                    category_id: this.category_id
                };
                this.getProducts({ params });
            },
            clearFilter() {
                this.category_id = "";
                this.model_id = "";
                this.title = "";
                this.getProducts();
            },
            // getProductsChunk(page) {
            //     this.$axios.get('http://127.0.0.1:8001/api/products?title=MERSEDES&category_id=1').then(res => {
            //         console.log('res', res);
            //     })
            // },
            addNewProduct() {
                this.product = {
                    id: null,
                    image: null,
                    title: null,
                    category: null,
                    model: null,
                    description: null,
                    price: null,
                };

                this.toggleProductModal(true);
            },
            editProduct(product) {
                this.product = {
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    category: product.category,
                    model: product.model,
                    description: product.description,
                    price: product.price
                };

                this.toggleProductModal(true);
            },


        }
    }
    </script>

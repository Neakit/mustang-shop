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
                         <select class="form-control" id="exampleFormControlSelect1" v-model="product_model_id">
                             <option disabled value="">Выберите модель</option>
                             <option v-for="(item, index) in models" :key="index" :value="item.id">{{ item.title }}</option>
                         </select>
                     </div>
                 </form>
                 <button class="btn btn-warning btn-block" @click="clearFilter">Очистить фильтр</button>
                 <button class="btn btn-primary btn-block" @click="filterProducts">Поиск</button>
             </div>
             <div class="row col-8">
                 <table class="table table-striped table-bordered">
                     <thead>
                     <tr>
                         <td>#</td>
                         <td>Продукт</td>
                         <td>Категория</td>
                         <td>Модель</td>
                         <td>Описание</td>
                         <td>Цена</td>
                         <td colspan="2"></td>
                     </tr>
                     </thead>
                     <tbody>
                     <tr v-for="(product, index) in products.data" :key="index">
                         <td>{{ product.id }}</td>
                         <td>{{ product.title }}</td>
                         <td>{{ product.category && product.category.title || '' }}</td>
                         <td>{{ product.model && product.model.title || '' }}</td>
                         <td>{{ product.description }}</td>
                         <td>{{ product.price }} RUB</td>
                         <td>
                             <button
                                 type="button"
                                 class="btn btn-warning"
                                 @click="editProduct(product)"
                             >Редактировать</button>
                         </td>
                         <td>
                             <button
                                 type="button"
                                 class="btn btn-danger"
                                 @click="deleteProduct(product)"
                             >Удалить</button>
                         </td>
                     </tr>
                     </tbody>
                 </table>
                 <modal v-show="productModal"></modal>
             </div>
             <div class="col-2 align-content-start">
                 <button class="btn btn-primary btn-block" @click="addNewProduct">Добавить новый продукт</button>
             </div>
             <div class="row justify-content-center col-12">
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
    import Modal from '../../components/admin/ProductModal'
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    export default {
        data() {
            return {
                product: null,
                category_id: "",
                product_model_id: "",
                title: ""
            }
        },
        components: {
            Modal
        },
        computed: {
            ...mapGetters('product', ['products']),
            ...mapGetters('category', ['categories']),
            ...mapGetters('model', ['models']),
            ...mapGetters('product', ['products']),
            ...mapGetters('modals', ['productModal'])
        },
        methods: {
            ...mapMutations('modals', ['toggleModal', 'setDestroyData']),
            ...mapMutations('product', ['setProduct']),

            ...mapActions('product', ['getProducts']),
            filterProducts() {
                const params = {
                    title: this.title,
                    product_model_id: this.product_model_id,
                    category_id: this.category_id
                };
                this.getProducts({ params });
            },
            clearFilter() {
                this.category_id = "";
                this.product_model_id = "";
                this.title = "";
                this.getProducts();
            },
            getProductsPage(page) {
                this.getProducts({ params: { page } });
            },
            addNewProduct() {
                this.setProduct({
                    image: '',
                    images: [],
                    title: '',
                    category_id: '',
                    product_model_id: '',
                    status_id: '',
                    description: '',
                    price: ''
                });
                this.toggleModal({
                    name: 'productModal',
                    bool: true
                });
            },
            editProduct(product) {
                this.setProduct({
                    id: product.id,
                    image: product.image,
                    images: product.images,
                    title: product.title,
                    category_id: product.category.id,
                    product_model_id: product.model.id,
                    status_id: product.status.id,
                    description: product.description,
                    price: product.price
                });
                this.toggleModal({
                    name: 'productModal',
                    bool: true
                });
            },
            deleteProduct(product){
                this.setProduct({
                    id: product.id,
                });
                this.setDestroyData({
                    title: product.title,
                    deleteActionName: 'product/deleteProduct',
                    clearMutationName: 'product/clearProduct'
                });
                this.toggleModal({
                    name: 'destroyConfirmModal',
                    bool: true
                });
            }
        }
    }
</script>

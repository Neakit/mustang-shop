<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container container">
                <div class="modal-header">
                    <h5 class="modal-title">{{ product.id ? 'Редактирование' : 'Создание'}} продукта</h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="closeModal()"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="row no-gutters p-2">
                    <div class="col-4 p-1">
                        <div style="display: block; border: 1px dotted grey; height: 100px; border-radius: 8px" v-show="!product.image" class="m-2">
                            <p>Загрузите фото</p>
                        </div>
                        <img v-show="product.image" :src="product.image" alt="image" class="img-thumbnail">
                        <div class="form-group">
                            <input type="file" id="file" @change="attachFile" class="form-control-file">
                        </div>
                    </div>
                    <div class="col-8 p-1">
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlInput1">Наименование:</label>
                            <div class="col-sm-10">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleFormControlInput1" 
                                    :value="product.title || ''"
                                    @change="setProductProp({ key: 'title', value: $event.target.value })"
                                >
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlSelect1">Модель:</label>
                            <div class="col-sm-10">
                                <select 
                                    class="form-control" 
                                    id="exampleFormControlSelect1" 
                                    :value="product.model && product.model.id || ''"
                                    @change="setProductProp({ key: 'product_model_id', value: $event.target.value })"
                                >
                                    <option disabled value="">Выберите модель</option>
                                    <option v-for="(item, index) in models" :key="index" :value="item.id">{{ item.title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlSelect1">Категория:</label>
                            <div class="col-sm-10">
                                <select 
                                    class="form-control" 
                                    id="exampleFormControlSelect1" 
                                    :value="product.category && product.category.id || ''"
                                    @change="setProductProp({ key: 'category_id', value: $event.target.value })"
                                >
                                    <option disabled value="">Выберите категорию</option>
                                    <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlInput1">Цена:</label>
                            <div class="col-sm-10">
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    id="exampleFormControlInput1" 
                                    :value="product.price || ''"
                                    @change="setProductProp({ key: 'price', value: $event.target.value })"
                                >
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlSelect1">Статус:</label>
                            <div class="col-sm-10">
                                <select 
                                    class="form-control" 
                                    id="exampleFormControlSelect1" 
                                    :value="product.status && product.status.id || ''"
                                    @change="setProductProp({ key: 'status_id', value: $event.target.value })"
                                >
                                    <option disabled value="">Выберите статус</option>
                                    <option v-for="(item, index) in statuses" :key="index" :value="item.id">{{ item.title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlTextarea1">Описание:</label>
                            <div class="col-sm-10">
                                <textarea 
                                    class="form-control" 
                                    id="exampleFormControlTextarea1" 
                                    rows="3" 
                                    :value="product.description"
                                    @change="setProductProp({ key: 'description', value: $event.target.value })"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            @click="saveChanges"
                        >{{ product.id ? 'Обновить' : 'Создать'}}</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
    export default {
        data() {
            return {
                attachment: null
            }
        },
        computed: {
            ...mapGetters('model', ['models']),
            ...mapGetters('category', ['categories']),
            ...mapGetters(['statuses']),
            ...mapGetters('product', ['product'])
        },
        methods: {
            ...mapMutations('modals', ['toggleModal']),
            ...mapMutations('product', ['clearProduct', 'setProductProp']),
            ...mapActions('product', ['updateProduct', 'createProduct']),

            attachFile(event) {
                this.attachment = event.target.files[0];
            },

            async saveChanges() {
                if(this.product.id) {
                    // upload image
                    await this.uploadFile();
                    // update product
                    await this.updateProduct();
                } else {
                    // upload image
                    await this.uploadFile();
                    // create
                    await this.createProduct();
                }
            },

            async uploadFile() {
                if (this.attachment != null) {
                    const data = new FormData();
                    data.append("image", this.attachment);
                    const result = await axios({
                        method: 'post',
                        url: '/api/upload-file',
                        data,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    this.setProductProp({ key: 'image', value: result.data });
                } else {
                    // this.$emit('close', this.product)
                }
            },

            closeModal() {
                this.clearProduct();
                this.toggleModal({
                    name: 'productModal',
                    bool: false
                });
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-container {
        /* width: 300px; */
        margin: 0px auto;
        /* padding: 20px 30px; */
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }
    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }
    .modal-default-button {
        float: right;
    }
    .modal-enter {
        opacity: 0;
    }
    .modal-leave-active {
        opacity: 0;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>

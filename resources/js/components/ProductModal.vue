<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container container">
                <div class="modal-header">
                    <h5 class="modal-title">{{ data.id ? 'Редактирование' : 'Создание'}} продукта</h5>
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
                        <div style="display: block; border: 1px dotted grey; height: 100px; border-radius: 8px" v-show="!data.image" class="m-2">
                            <p>Загрузите фото</p>
                        </div>
                        <img v-show="data.image" :src="data.image" alt="image" class="img-thumbnail">
                        <div class="form-group">
                            <input type="file" id="file" @change="attachFile" class="form-control-file">
                        </div>
                    </div>
                    <div class="col-8 p-1">
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlInput1">Наименование:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="data.title">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlSelect1">Модель:</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="exampleFormControlSelect1" v-model="data.product_model_id">
                                    <option disabled value="">Выберите модель</option>
                                    <option v-for="(item, index) in models" :key="index" :value="item.id">{{ item.title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlSelect1">Категория:</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="exampleFormControlSelect1" v-model="data.category_id">
                                    <option disabled value="">Выберите категорию</option>
                                    <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlInput1">Цена:</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="exampleFormControlInput1" v-model="data.price">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlSelect1">Статус:</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="exampleFormControlSelect1" v-model="data.status_id">
                                    <option disabled value="">Выберите статус</option>
                                    <option v-for="(item, index) in statuses" :key="index" :value="item.id">{{ item.title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlTextarea1">Описание:</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="data.description"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button type="button" class="btn btn-primary" @click="saveChanges">{{ data.id ? 'Обновить' : 'Создать'}}</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
    export default {
        props: ['product'],
        data() {
            return {
                attachment: null
            }
        },
        computed: {
            ...mapGetters(['models', 'categories', 'statuses']),
            data() {
                return {
                    id: this.product && this.product.id || '',
                    image: this.product && this.product.image || '',
                    title: this.product && this.product.title || '',
                    category_id: this.product && this.product.category.id || '',
                    product_model_id: this.product && this.product.model.id || '',
                    status_id: this.product && this.product.status.id || '',
                    description: this.product && this.product.description || '',
                    price: this.product && this.product.price || ''
                }
            }
        },
        methods: {
            ...mapMutations(['toggleProductModal']),
            ...mapActions(['updateProduct', 'createProduct']),
            attachFile(event) {
                this.attachment = event.target.files[0];
            },
            async saveChanges() {
                if(this.data.id) {
                    // upload image
                    await this.uploadFile();
                    // update product
                    await this.updateProduct(this.data);
                } else {
                    // upload image
                    await this.uploadFile();
                    // create
                    await this.createProduct(this.data);
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
                    this.data.image = result.data;
                } else {
                    // this.$emit('close', this.product)
                }
            },
            closeModal() {
                this.data.id = '';
                this.data.image = '';
                this.data.title = '';
                this.data.category_id = '';
                this.data.product_model_id = '';
                this.data.status_id = '';
                this.data.description = '';
                this.data.price = '';

                this.toggleProductModal(false);
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
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

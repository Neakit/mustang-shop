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
                    <div class="col-12 p-1">
                        <div class="images-wrapper row align-items-center">
                            <div class="col"
                                style="position: relative;  border: 1px solid #3490dc; text-align: center"
                                v-for="(image, index) in product.images" 
                                :key="index"
                            >   
                                <i class="material-icons"
                                    style="position: absolute; right: 0; top: 5px; cursor: pointer"
                                    @click="removeImageWrap(image, index)"
                                >
                                    close
                                </i>
                                <img
                                    :src="image" 
                                    class="product-image-block"
                                    alt="part-image" 
                                >
                            </div>
                            <div class="col" style="text-align: center">
                                <button class="btn btn-success" @click="selectImage">+</button>
                                <input type="file" id="file" @change="attachFile" ref="imageUploadInput" v-show="false">
                            </div>
                        </div>
                    </div>
                    <div class="col-12 p-1">
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
                                    :value="product.product_model_id || ''"
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
                                    :value="product.category_id || ''"
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
                                    :value="product.status_id || ''"
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
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex';
import { privateHTTPTest } from '../../services';

    export default {
        data() {
            return {
                attachment: null,
                attachments: null,
                clientImages: []
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
            ...mapMutations('product', [
                'clearProduct', 
                'setProductProp', 
                'addImages', 
                'removeImage'
            ]),
            ...mapActions('product', ['updateProduct', 'createProduct']),

            removeImageWrap(image, index) {
                const nameIndex = image.lastIndexOf('/');
                const name = image.slice(nameIndex + 1);

                const id = this.product.id || null;

                if(id) {
                    const images = JSON.stringify(this.product.images);
                    this.$axios({
                        method: 'get',
                        url: '/api/delete-file',
                        params: {
                            name,
                            images,
                            id
                        }
                    }).then(res => {
                        this.removeImage(index);
                    })
                } else {
                    this.$axios({
                        method: 'get',
                        url: '/api/delete-file',
                        params: {
                            name
                        }
                    }).then(res => {
                        this.removeImage(index);
                    }) 
                }
            },
            selectImage() {
                this.$refs.imageUploadInput.click()
            },
            attachFile(event) {
                this.attachment = event.target.files[0];
                this.uploadFile();
            },

            attachFiles(event) {
                this.attachments = event.target.files[0];
            },
            async saveChanges() {
                if(this.product.id) {
                    await this.updateProduct();
                } else {
                    await this.createProduct();
                }
            },
            async uploadFile() {
                if (this.attachment != null) {
                    const data = new FormData();
                    data.append("image", this.attachment);
                    const result = await this.$axios({
                        method: 'post',
                        url: '/api/upload-file',
                        data,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    this.addImages(result.data);

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
    .image-small {
        width: 150px;
        height: 150px;
    }
    .modal-mask {
        position: fixed;
        z-index: 2;
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
        overflow: scroll;
        height: 38em;
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
    .images-wrapper {
        height: 150px;
        border: 1px solid #000;
        border-radius: 8px;
    }
    .product-image-block {
        margin: 4px;
        /* width: 100%; */
        max-height: 138px;
    }
</style>

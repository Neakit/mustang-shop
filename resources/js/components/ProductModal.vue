<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container container">
                <div class="modal-header">
                    <h5 class="modal-title">{{ data.id ? 'Редактирование' : 'Создание'}} продукта</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="row no-gutters p-2">
                    <div class="col-4">
                        <div style="display: block; border: 1px dotted grey; height: 100px; border-radius: 8px" v-show="!data.image" class="m-2">
                            <p>Загрузите фото</p>
                        </div>
                        <img v-show="data.image" :src="attachment" alt="image" class="img-thumbnail">
                        <div class="form-group">
                            <input type="file" id="file" @change="attachFile" class="form-control-file">
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlInput1">Наименование:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="data.title">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlSelect1">Модель:</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="exampleFormControlSelect1" v-model="data.model">
                                    <option disabled value="">Выберите модель</option>
                                    <option v-for="(item, index) in models" :key="index" :value="item.id">{{ item.title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlSelect1">Категория:</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="exampleFormControlSelect1" v-model="data.category">
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
                                <select class="form-control" id="exampleFormControlSelect1" v-model="data.status">
                                    <option disabled value="">Выберите статус</option>
                                    <option v-for="(item, index) in statuses" :key="index" :value="item.id">{{ item.title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label" for="exampleFormControlTextarea1">Описание:</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <button @click="toggleProductModal(false)">close</button>
                <div class="modal-header">
                    <slot name="header" v-html="data.name"></slot>
                </div> -->
                <div class="modal-footer">
                    <slot name="footer">
                        <button class="modal-default-button" @click="uploadFile">
                            Upload file
                        </button>
                        <button class="modal-default-button" @click="saveProduct">
                            Finish
                        </button>
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
                    category: this.product && this.product.category.id || '',
                    model: this.product && this.product.model.id || '',
                    status: this.product && this.product.status.id || '',
                    description: this.product && this.product.description || '',
                    price: this.product && this.product.price || ''
                }
            }
        },
        methods: {
            ...mapMutations(['toggleProductModal']),
            ...mapActions(['updateProduct']),
            attachFile(event) {
                this.attachment = event.target.files[0];
            },
            uploadFile(event) {
                if (this.attachment != null) {
                    var formData = new FormData();
                    formData.append("image", this.attachment)
                    let headers = {
                        'Content-Type': 'multipart/form-data'
                    }

                    axios.post("/api/upload-file", formData, { headers }).then(response => {
                        this.data.image = response.data
                        debugger
                        // this.$emit('close', this.product)
                    })
                } else {
                    // this.$emit('close', this.product)
                }
            },
            saveProduct() {
                this.updateProduct({
                    id: this.data.id,
                    title: this.data.title,
                    image: this.data.image,
                    category: this.data.category,
                    model: this.data.model,
                    description: this.data.description,
                    price: this.data.price
                });
            },
            addProduct(product) {
                this.addingProduct = null

                let name = product.name
                let units = product.units
                let price = product.price
                let description = product.description
                let image = product.image

                axios.post("/api/products/", {name, units, price, description, image})
                     .then(response => this.products.push(product))
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

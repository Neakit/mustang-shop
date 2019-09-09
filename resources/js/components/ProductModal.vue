 <template>
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <button @click="toggleProductModal(false)">close</button>
                    <div class="modal-header">
                        <slot name="header" v-html="data.name"></slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <div>
                                title: <input type="text" v-model="data.title">
                            </div>
                            <div>
                                model: <input type="text" v-model="data.model.title">
                            </div>
                            <div>
                                category: <input type="text" v-model="data.category.title">
                            </div>
                            <div>
                                currency: <input type="text" v-model="data.currency">
                            </div>
                            <div>
                                price: <input type="number" v-model="data.price">
                            </div>
                            <div>
                                status: <input type="text" v-model="data.status">
                            </div>

                            <textarea v-model="data.description" placeholder="description"></textarea>

                            <span >
                                <img :src="data.image" v-show="data.image != null" style="width: 100px">
                                <input type="file" id="file" @change="attachFile">
                            </span>
                        </slot>
                    </div>
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
import { mapMutations, mapActions } from 'vuex';
    export default {
        props: ['product'],
        data() {
            return {
                attachment: null
            }
        },
        computed: {
            data() {
                return {
                    id: this.product && this.product.id || '',
                    image: this.product && this.product.image || '',
                    title: this.product && this.product.title || '',
                    category: this.product && this.product.category.id || '',
                    model: this.product && this.product.model.id || '',
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
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
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
    .modal-body {
        margin: 20px 0;
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

<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container container">

                <div class="modal-header">
                    <h5 class="modal-title">{{ post.id ? 'Редактирование' : 'Создание'}} статьи блога</h5>
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

                <div class="form-group row no-gutters mt-2">
                    <label class="col-2 col-form-label" for="exampleFormControlInput1">Заголовок статьи:</label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            :value="post.title"
                            @input="setPostProp({ key: 'title', value: $event.target.value })"
                        >
                    </div>
                </div>

                <div class="row justify-content-between no-gutters align-items-center">
                    <div>
                        <img v-show="post.image" :src="post.image" alt="image" class="post-header-image">
                        <div class="form-group">
                            <label for="file">Заглавное фото статьи:</label>
                            <input type="file" class="form-control-file" id="file" @change="attachFile">
                        </div>
                    </div>
                    <button v-show="attachment" type="button" class="btn btn-success" @click="uploadFile">Загрузить</button>
                </div>

                <quill-editor
                    :value="post.body"
                    @input="setPostProp({ key: 'body', value: $event })"
                    ref='textEditor'
                    :options='editorOption'
                ></quill-editor>

                <div class="mt-2 text-right">
                    <button
                        type="button"
                        class="btn btn-success"
                        @click="savePost"
                        :disabled="disabled"
                    >Сохранить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    export default {
        data() {
            return {
                attachment: null,
                image: null,
                editorOption: {
                    // some quill options
                    modules: {
                        toolbar: {
                            container:[
                                ['bold', 'italic', 'underline', 'strike'],
                                ['blockquote', 'code-block'],
                                [{ 'header': 1 }, { 'header': 2 }],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                [{ 'script': 'sub' }, { 'script': 'super' }],
                                [{ 'indent': '-1' }, { 'indent': '+1' }],
                                [{ 'direction': 'rtl' }],
                                [{ 'size': ['small', false, 'large', 'huge'] }],
                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                [{ 'font': [] }],
                                [{ 'color': [] }, { 'background': [] }],
                                [{ 'align': [] }],
                                ['clean'],
                                ['image']
                            ]
                        }
                    }
                },
            }
        },
        methods: {
            ...mapMutations('blog', ['setPostProp', 'clearPost']),
            ...mapMutations('modals', ['toggleModal']),
            ...mapActions('blog', ['createPost', 'updatePost']),
            attachFile(event) {
                this.attachment = event.target.files[0];
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
                    this.setPostProp({ key: 'image', value: result.data })
                } else {
                    // this.$emit('close', this.product)
                }
            },
            savePost() {
                if(this.post.id) {
                    this.updatePost();
                } else {
                    this.createPost();
                }
            },
            closeModal() {
                this.clearPost();
                this.toggleModal({ name: 'blogModal', bool: false });
            }
        },
        computed: {
            ...mapGetters('blog', ['post']),
            disabled() {
                const data = Object.entries(this.post);
                return data.slice(1).some(i => !i[1].length );
            }
        }
    }
</script>


<style scoped>
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
        height: 38rem;
        overflow: scroll;
        padding: 1.5rem;
        margin: 0 auto;
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
    .post-header-image {
        padding: 0.25rem;
        background-color: #f8fafc;
        border: 1px solid #dee2e6;
        border-radius: 0.25rem;
        max-width: 50%;
        height: auto;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>

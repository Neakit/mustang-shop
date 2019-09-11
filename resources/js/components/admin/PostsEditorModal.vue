<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container container">
                <div>
                    <form>
                        <quillEditor
                            v-model='editorContent'
                            ref='textEditor'
                            :options='editorOption'
                        ></quillEditor>
                        <input type="file" v-show="false" ref="inputImage">
                    </form>


                    <div>
                        <button
                            @click="save()"
                        >
                            Сохранить
                        </button>

                        <button
                            @click="cancel()"
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import { mapState, mapMutations, mapActions } from 'vuex';
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'

    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                editorContent: '<p>I am Example</p>',
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
                            ] ,
                            // handlers: {
                            //     image: this.handleImageAdded
                            // }
                        },
                        imageResize: true,

                    }
                },

            }
        },
        methods: {
            // ...mapMutations('editor', ['toggleEditorDialog']),
            // ...mapActions('editor', ['uploadArticleImage', 'saveArticle']),
            cancel() {
                // this.toggleEditorDialog(false);
            },
            save() {
                // this.saveArticle(this.editorContent)
            },
            handleImageAdded() {

            }
        },
        computed: {
            // ...mapState('editor', ['editorDialog'])
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

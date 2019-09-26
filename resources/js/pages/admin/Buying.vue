<template>
    <div>
        <quill-editor
            v-model="body"
            ref='textEditor'
            :options='editorOption'
        ></quill-editor>
        <button class="btn btn-primary" @click="updatePage">Сохранить или обновить</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                body: '',
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
                }
            }
        },
        mounted() {
            this.getPage();
        },
        methods: {
            getPage () {
                this.$axios.get('/api/buying').then(res => {
                    this.body = res.data[0].body;
                })
            },
            async updatePage() {
                const token = localStorage.getItem('bigStore.jwt');
                const { data } = await this.$axios({
                    url: `/api/buying/1`,
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    data: {
                        body: this.body
                    }
                });
                if(data.status > 0) {

                } else {
                    // TODO: вывести ошибку
                }
            },
        }
    }
</script>

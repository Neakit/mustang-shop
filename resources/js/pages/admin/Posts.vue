<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2">
                <div class="alert alert-primary" role="alert">
                    Поиск по статьям
                </div>
                <form>
                    <div class="form-group">
                        <label for="category-title">Название:</label>
                        <input type="text" class="form-control" id="category-title" v-model="title">
                    </div>
                    <div class="form-group">
                        <label for="category-title">Описание:</label>
                        <input type="text" class="form-control" id="category-title" v-model="body">
                    </div>
                </form>
                <button class="btn btn-warning btn-block" @click="clearFilter">Очистить фильтр</button>
                <button class="btn btn-primary btn-block" @click="filterPosts">Поиск</button>
            </div>
            <div class="col-8">
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Заголовок</td>
                        <td colspan="2"></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(post, index) in posts.data" :key="index">
                        <td style="width: 5%">{{ post.id }}</td>
                        <td style="width: 85%">{{ post && post.title || '' }}</td>
                        <td style="width: 5%">
                            <button
                                type="button"
                                class="btn btn-warning"
                                @click="editPost(post)"
                            >Редактировать</button>
                        </td>
                        <td style="width: 5%">
                            <button
                                type="button"
                                class="btn btn-danger"
                                @click="deletePost(post)"
                            >Удалить</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <modal v-show="blogModal"></modal>
            </div>
            <div class="col-2">
                <button class="btn btn-primary btn-block" @click="createNewPost">Новый пост</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Modal from '../../components/admin/PostsEditorModal';
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    export default {
        data() {
            return {
                title: '',
                body: ''
            }
        },
        components: {
            Modal
        },
        methods: {
            ...mapMutations('modals', ['toggleModal', 'setDestroyData']),
            ...mapMutations('blog', ['setPost']),
            ...mapActions('blog', ['getPosts']),
            createNewPost() {
                // this.setPost({
                //     title: '',
                //     description: ''
                // });
                this.toggleModal({
                    name: 'blogModal',
                    bool: true
                });
            },
            deletePost(post) {
                this.setPost({
                    id: post.id,
                });
                this.setDestroyData({
                    title: post.title,
                    deleteActionName: 'blog/deletePost',
                    clearMutationName: 'blog/clearPost'
                });
                this.toggleModal({
                    name: 'destroyConfirmModal',
                    bool: true
                });
            },
            editPost(post){
                this.setPost({
                    id: post.id,
                    image: post.image,
                    title: post.title,
                    body: post.body
                });
                this.toggleModal({
                    name: 'blogModal',
                    bool: true
                });
            },
            filterPosts() {
                const params = {
                    title: this.title,
                    body: this.body
                };
                this.getPosts({ params });
            },
            clearFilter() {
                this.title = "";
                this.body = "";
                this.getPosts();
            }
        },
        computed: {
            ...mapGetters('modals', ['blogModal']),
            ...mapGetters('blog', ['posts'])
        }
    }
</script>

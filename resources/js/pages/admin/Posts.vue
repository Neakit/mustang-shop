<template>
    <div>
        <div class="row col-8">
            <table class="table table-responsive table-striped">
                <thead>
                <tr>
                    <td>#</td>
                    <td>Заголовок</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(post, index) in posts.data" :key="index">
                    <td>{{ post.id }}</td>
                    <td>{{ post && post.title || '' }}</td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-warning"
                            @click="editPost(post)"
                        >Редактировать</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <modal v-show="blogModal"></modal>
        </div>
        <button @click="createNewPost">new post</button>
    </div>
</template>

<script>
    import Modal from '../../components/admin/PostsEditorModal';
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        components: {
            Modal
        },
        methods: {
            ...mapMutations('modals', ['toggleModal']),
            ...mapMutations('blog', ['setPost']),
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
            }
        },
        computed: {
            ...mapGetters('modals', ['blogModal']),
            ...mapGetters('blog', ['posts'])
        }
    }
</script>

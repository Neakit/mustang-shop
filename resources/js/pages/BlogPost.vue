<template>
    <div class="container">
        <div class="my-2">
            <BreadCrumbs />
        </div>
        <img :src="post.image" alt="#" style="width: 100%">
        <p>{{ post.title }}</p>
        <div v-html="post.body"></div>
    </div>
</template>

<script>
    import BreadCrumbs from '../components/BreadCrumbs';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        components: { BreadCrumbs },
        methods: {
            ...mapActions('blog', ['getPosts'])
        },
        computed: {
            ...mapGetters('blog', ['posts']),
            post() {
                const postId = parseInt(this.$route.params.article, 10);
                return this.posts && this.posts.data && this.posts.data.find(p => {
                    return p.id === postId
                }) || [];
            }
        },
        mounted() {
            this.getPosts();
        }
    }
</script>

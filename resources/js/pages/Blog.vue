<template>
    <div class="container">
        <div class="my-2">
            <BreadCrumbs />
        </div>
        <div class="row">
            <div class="col-12 col-md-6" v-for="(card, index) in posts.data" :key="index">
                <PostCard :card="card" />
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"
                        :class="{ disabled: 1 === posts.current_page }"
                    >
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Назад</a>
                    </li>
                    <li
                        v-for="(page, index) in posts.last_page"
                        :key="index"
                        class="page-item"
                        :class="{ active: page === posts.current_page }"
                    >
                        <a @click="getProductsPage(page)" class="page-link" href="#">{{ page }}</a>
                    </li>
                    <li class="page-item"
                        :class="{ disabled:  posts.current_page === posts.last_page }"
                    >
                        <a class="page-link" href="#">Далее</a>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import BreadCrumbs from "../components/BreadCrumbs";
    import PostCard from "../components/PostCard";

    export default {
        components: {PostCard, BreadCrumbs},
        methods: {
            ...mapActions('blog', ['getPosts'])
        },
        computed: {
            ...mapGetters('blog', ['posts'])
        },
        mounted() {
            this.getPosts();
        }
    }
</script>

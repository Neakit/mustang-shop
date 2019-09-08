<template>
    <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/admin">Admin Hhome<span class="sr-only">Home admin</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/admin/products">Продукты: {{ orders.length }}</a>
                </li> <li class="nav-item">
                    <a class="nav-link" href="/admin/models">Модели: {{ models.length }}</a>
                </li> <li class="nav-item">
                    <a class="nav-link" href="/admin/categories">Категории: {{ categories.length }}</a>
                </li>
            </ul>
            <!--            <form class="form-inline my-2 my-lg-0">-->
            <!--                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">-->
            <!--                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
            <!--            </form>-->
        </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        mounted() {
            this.getProducts();
            this.getModels();
            this.getCategories();
        },
        computed: {
            ...mapGetters(['products', 'categories', 'models', 'user'])
        },
        methods: {
            ...mapActions(['getProducts', 'getModels', 'getCategories'])
        }
    }
</script>

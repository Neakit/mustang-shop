<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
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
                        <router-link class="nav-link" to="/admin">Admin Hhome<span class="sr-only">Home admin</span></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/products">Продукты: {{ products.length || 0}}</router-link>
                    </li> <li class="nav-item">
                        <router-link class="nav-link" to="/admin/models">Модели: {{ models.length || 0}}</router-link>
                    </li> <li class="nav-item">
                        <router-link class="nav-link" to="/admin/categories">Категории: {{ categories.length || 0}}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        mounted() {
            this.getProducts();
            this.getModels();
            this.getCategories();
            this.getStatuses();
        },
        computed: {
            ...mapGetters([
                'products',
                'categories',
                'models',
                'user'
            ])
        },
        methods: {
            ...mapActions([
                'getProducts',
                'getModels',
                'getCategories',
                'getStatuses'
            ])
        }
    }
</script>

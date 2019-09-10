<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-light bg-light" v-if="auth">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/admin/dashboard">Admin Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/products">Продукты: {{ products.length || 0 }}</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/models">Модели: {{ models.length || 0 }}</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/categories">Категории: {{ categories.length || 0 }}</router-link>
                </li>
            </ul>
            <button type="button" class="btn btn-outline-dark">Выйти</button>
        </nav>
        <nav class="navbar navbar-expand-sm navbar-light bg-light" v-else>
            <p>Авторизуйтесь, чтобы войти в панель управления</p>
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
            ...mapGetters('category', ['categories']),
            ...mapGetters([
                'products',
                'models',
                'user'
            ]),
            auth() {
                return this.$route.path !== "/admin/login";
            }
        },
        methods: {
            ...mapActions('category', ['getCategories']),
            ...mapActions([
                'getProducts',
                'getModels',
                'getStatuses'
            ])
        }
    }
</script>

<template>
    <div>
        <Header />
        <Menu />
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

    <script>
    import Menu from '../components/Menu';
    import Header from '../components/Header';
    import { mapActions, mapMutations, mapGetters } from 'vuex';

    export default {
        components: {
            Menu,
            Header
        },
        data() {
            return {
                name: null,
                user_type: 0,
                isLoggedIn: localStorage.getItem('bigStore.jwt') != null
            }
        },
        computed: {
        },
        mounted() {
            // this.setDefaults()
            this.getModels();
            this.getCategories();
        },
        methods : {
            ...mapActions('category', ['getCategories']),
            ...mapActions('model', ['getModels']),
            //
            setDefaults() {
                if (this.isLoggedIn) {
                    let user = JSON.parse(localStorage.getItem('bigStore.user'));
                    this.name = user.name;
                    this.user_type = user.is_admin;
                }
            },
            change() {
                this.isLoggedIn = localStorage.getItem('bigStore.jwt') != null;
                this.setDefaults();
            },
            logout(){
                localStorage.removeItem('bigStore.jwt')
                localStorage.removeItem('bigStore.user')
                this.change()
                this.$router.push('/')
            }
        }
    }
    </script>


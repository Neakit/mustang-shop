<template>
        <div>
            <Header />
            <Menu />
            <div>sdsds</div>
            <main class="py-4">
                <!-- <router-view @loggedIn="change"></router-view> -->
                <router-view></router-view>
            </main>
        </div>
    </template>

    <script>
    import Menu from '../components/Menu';
    import Header from '../components/Header';

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
        mounted() {
            this.setDefaults()
        },
        methods : {
            setDefaults() {
                if (this.isLoggedIn) {
                    let user = JSON.parse(localStorage.getItem('bigStore.user'))
                    this.name = user.name
                    this.user_type = user.is_admin
                }
            },
            change() {
                this.isLoggedIn = localStorage.getItem('bigStore.jwt') != null
                this.setDefaults()
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


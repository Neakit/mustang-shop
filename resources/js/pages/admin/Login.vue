<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Вход в панель управления</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail:</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model="email" required autofocus>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Пароль:</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" v-model="password" required>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary" @click="handleSubmit">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            ...mapMutations(['setAuth']),
            handleSubmit(e) {
                e.preventDefault();
                if (this.password.length > 0) {
                    this.$axios({
                        method: 'post',
                        url: '/api/login',
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    }).then(res => {
                        let { data: { user, token } } = res;
                        localStorage.setItem('bigStore.user', JSON.stringify(user));
                        localStorage.setItem('bigStore.jwt', token);

                        if (localStorage.getItem('bigStore.jwt') != null) {
                            this.setAuth(true);
                            this.$router.push('/admin/dashboard');
                            // if (this.$route.params.nextUrl != null) {
                            //     this.$router.push(this.$route.params.nextUrl)
                            // } else {
                            //     this.$router.push((is_admin == 1 ? 'admin' : 'dashboard'))
                            // }
                        }
                    });
                }
            }
        }
    }
</script>

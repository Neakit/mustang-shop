<template>
    <div class="container">
        <div v-html="page"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                page: ''
            }
        },
        mounted() {
            this.getPage();
        },
        methods: {
            getPage () {
                this.$axios.get('/api/delivery').then(res => {
                    this.page = res.data[0].body;
                })
            }
        }
    }
</script>

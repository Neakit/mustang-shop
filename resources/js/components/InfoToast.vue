<template>
    <div
        class="alert alert-success"
        :class="{ show: toastModal }"
        id="snackbar"
        role="alert"
    >
        {{ toastMessage }}
    </div>
</template>

<script>
    import  { mapState, mapMutations } from 'vuex';

    export default {
        name: "InfoToast",
        computed: {
            ...mapState('modals', ['toastModal', 'toastMessage'])
        },
        methods: {
            ...mapMutations('modals', ['setToastMessage', 'toggleModal'])
        },
        watch: {
            toastModal: function(val) {
                if(val) {
                    setTimeout(() => {
                        this.setToastMessage('');
                        this.toggleModal({ name: 'toastModal', bool: false });
                    }, 2000);
                }
            }
        }
    }
</script>

<style scoped>
    #snackbar {
        visibility: hidden;
        position: fixed;
        z-index: 10;
        right: 30px;
        top: 30px;
    }

    #snackbar.show {
        visibility: visible;
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }

    @-webkit-keyframes fadein {
        from {top: 0; opacity: 0;}
        to {top: 30px; opacity: 1;}
    }

    @keyframes fadein {
        from {top: 0; opacity: 0;}
        to {top: 30px; opacity: 1;}
    }

    @-webkit-keyframes fadeout {
        from {top: 30px; opacity: 1;}
        to {top: 0; opacity: 0;}
    }

    @keyframes fadeout {
        from {top: 30px; opacity: 1;}
        to {top: 0; opacity: 0;}
    }
</style>

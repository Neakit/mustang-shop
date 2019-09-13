<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="card confirm-card">
                <div class="card-body">
                    <h5 class="card-title">Подтвердите действие</h5>
                    <p class="card-text">Вы уверены, что хотите удалить {{ destroyData.title || '' }}</p>
                    <div class="row no-gutters justify-content-between">
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="confirm"
                        >OK</button>
                        <button
                            type="button"
                            class="btn btn-success"
                            @click="cancel"
                        >Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

    export default {
        computed: {
            ...mapState('modals', ['destroyData'])
        },
        methods: {
            ...mapMutations('modals', ['toggleModal']),
            confirm() {
                this.$store.dispatch(`${this.destroyData.deleteActionName}`);
                this.toggleModal({ name: 'destroyConfirmModal', bool: false });
            },
            cancel() {
                this.$store.commit(`${this.destroyData.clearMutationName}`);
                this.toggleModal({ name: 'destroyConfirmModal', bool: false });
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .confirm-card {
        margin: 0 auto;
        width: 40%;
    }
    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>

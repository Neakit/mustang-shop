<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2">
                <div class="alert alert-primary" role="alert">
                    Фильтр моделей
                </div>
                <form>
                    <div class="form-group">
                        <label for="category-title">Название:</label>
                        <input type="text" class="form-control" id="category-title" v-model="title">
                    </div>
                </form>
                <button class="btn btn-warning btn-block" @click="clearFilter">Очистить фильтр</button>
                <button class="btn btn-primary btn-block" @click="filterCategories">Поиск</button>
            </div>
            <div class="row col-8">
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Модель</td>
                        <td colspan="2"></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(model, index) in models" :key="index">
                        <td style="width: 5%">{{ model.id }}</td>
                        <td style="width: 85%">{{ model && model.title || '' }}</td>
                        <td style="width: 5%">
                            <button
                                type="button"
                                class="btn btn-warning"
                                @click="editModel(model)"
                            >Редактировать</button>
                        </td>
                        <td style="width: 5%">
                            <button
                                type="button"
                                class="btn btn-danger"
                                @click="deleteModel(model)"
                            >Удалить</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <modal v-show="productModelModal"></modal>
            </div>
            <div class="col-2 align-content-start">
                <button class="btn btn-primary btn-block" @click="addNewModel">Добавить новую модель</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Modal from '../../components/admin/ProductModelModal'
    import { mapGetters, mapMutations, mapActions, mapState } from 'vuex';

    export default {
        data() {
            return {
                title: ""
            }
        },
        components: {
            Modal
        },
        computed: {
            ...mapGetters('model', ['models']),
            ...mapGetters('modals', ['productModelModal'])
        },
        methods: {
            ...mapMutations('modals', ['toggleModal', 'setDestroyData']),
            ...mapMutations('model', ['setModel', 'clearModel']),
            ...mapActions('model', ['getModels']),

            filterCategories() {
                const params = {
                    title: this.title
                };
                this.getModels({ params });
            },
            clearFilter() {
                this.title = "";
                this.getModels();
            },
            addNewModel() {
                 this.setModel({
                    title: ''
                });
                this.toggleModal({
                    name: 'categoryModal',
                    bool: true
                });
            },

            editModel(model){
                this.setModel({
                    id: model.id,
                    title: model.title
                });
                this.toggleModal({
                    name: 'productModelModal',
                    bool: true
                });
            },
            deleteModel(model){
                this.setModel({
                    id: model.id,
                });
                this.setDestroyData({
                    title: model.title,
                    deleteActionName: 'model/deleteModel',
                    clearMutationName: 'model/clearModel'
                });
                this.toggleModal({
                    name: 'destroyConfirmModal',
                    bool: true
                });
            },
            addNewModel() {
                this.setModel({
                    title: '',
                    description: ''
                });
                this.toggleModal({
                    name: 'productModelModal',
                    bool: true
                });
            }
        }
    }
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2">
                <div class="alert alert-primary" role="alert">
                    Фильтр категорий
                </div>
                <form>
                    <div class="form-group">
                        <label for="category-title">Название:</label>
                        <input type="text" class="form-control" id="category-title" v-model="title">
                    </div>
                    <div class="form-group">
                        <label for="category-title">Описание:</label>
                        <input type="text" class="form-control" id="category-title" v-model="description">
                    </div>
                    <div class="form-group">
                        <label for="category-id">Категория:</label>
                        <select class="form-control" id="category-id" v-model="id">
                            <option disabled value="">Выберите категорию</option>
                            <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.title }}</option>
                        </select>
                    </div>
                </form>
                <button class="btn btn-warning btn-block" @click="clearFilter">Очистить фильтр</button>
                <button class="btn btn-primary btn-block" @click="filterCategories">Поиск</button>
            </div>
            <div class="row col-8">
                <table class="table table-responsive table-striped">
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Категория</td>
                        <td>Описание</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(category, index) in categories" :key="index">
                        <td>{{ category.id }}</td>
                        <td>{{ category && category.title || '' }}</td>
                        <td>{{ category && category.description || '' }}</td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-warning"
                                @click="editCategory(category)"
                            >Редактировать</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <modal v-show="categoryModal"></modal>
            </div>
            <div class="col-2 align-content-start">
                <button class="btn btn-primary btn-block" @click="addNewCategory">Добавить новую категорию</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Modal from '../../components/CategoryModal'
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    export default {
        data() {
            return {
                id: "",
                title: "",
                description: ""
            }
        },
        components: {
            Modal
        },
        computed: {
            ...mapGetters('modals', ['categoryModal']),
            ...mapGetters('category', ['categories']),
        },
        methods: {
            ...mapMutations('category', ['setCategory']),
            ...mapMutations('modals', ['toggleModal']),
            ...mapActions('category', ['getCategories']),
            filterCategories() {
                const params = {
                    id: this.id,
                    title: this.title,
                    description: this.description
                };
                this.getCategories({ params });
            },
            clearFilter() {
                this.id = "";
                this.title = "";
                this.description = "";
                this.getCategories();
            },
            addNewCategory() {
                this.setCategory({
                    title: '',
                    description: ''
                });
                this.toggleModal({
                    name: 'categoryModal',
                    bool: true
                });
            },
            editCategory(category) {
                this.setCategory({
                    id: category.id,
                    title: category.title,
                    description: category.description
                });
                this.toggleModal({
                    name: 'categoryModal',
                    bool: true
                });
            }
        }
    }
</script>

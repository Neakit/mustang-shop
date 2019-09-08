<template>
	<div class="drawer">
		<div class="search-field">
		<img src="/icons/search-icon.svg" alt="search-icon" />
		<input v-model="search" placeholder="Поиск" />
	</div>

	<div class="accordion" id="accordionExample">

		<div v-for="(item, index) in items" :key="index">
			<div>
				<div :id="'headingOne' + item.title" >
					<h2 class="mb-0">
						<button
							class="btn btn-link"
							type="button"
							data-toggle="collapse"
							:data-target="'#collapseOne' + item.title"
							aria-expanded="true"
							aria-controls="collapseOne"
						>
							{{ item.title }}
						</button>
					</h2>
				</div>

				<div
					:id="'collapseOne' + item.title"
					class="collapse"
					:aria-labelledby="'headingOne' + item.title"
					data-parent="#accordionExample"
				>
					<div
						class="card-body"
						v-for="(category, index) in item.categories"
						:key="index"
						@click="fetchProducts({ model_id: item.id, category_id: category.id })"
					>
						{{ category.title }}
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
    import { mapActions } from 'vuex';

export default {
	mounted() {
        this.$axios.get("api/categories/").then(response => {
			return this.categories = response.data
		});
        this.$axios.get("api/models/").then(response => {
			return this.models = response.data
		});

	},
	computed: {
		items(){
			return this.models.map(model => {
				model.categories = this.categories;
				return model
			})
		}
	},
	methods: {
        ...mapActions(['getProducts']),
		fetchProducts(data){
			const { model_id, category_id } = data;
			console.log(model_id, category_id)
			axios.post('api/products/', data).then(res => {
				console.log(res)
			})
		}
	},
    data() {
        return {
			search: '',
			categories: [],
			models: []
        }
    }
}
</script>

<style scoped lang="scss">


</style>

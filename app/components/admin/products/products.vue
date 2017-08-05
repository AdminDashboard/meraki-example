<template>
	<div class="products">
		<div class="products__items">
			<div class='products__item' v-for='product in products'>
				<div class="admin-product">
					<div class="admin-product__image" @click="deleteItem(product)" v-bind:style="{'background-image': 'url(' + product.mainImage + ')'}">
					</div>
					<div class="admin-product__col">
						<div class="admin-product__id"><span class="admin-product__label">id</span> {{product.id}}</div>
						<div class="admin-product__title"><span class="admin-product__label">title</span> {{product.title}}</div>
					</div>
					<div class="admin-product__col"></div>
				</div>
			</div>
		</div>
		<div class="admin-product__form">
			<form action="">
				<input type="text" v-model="id" name="id" placeholder="id">
				<input type="text" v-model="title" name="title" placeholder="title">
				<input type="text" v-model="url" name="url" placeholder="image url">
				<div class="admin-product__section">
					<input type="text"
						v-model="sections[0].title" placeholder="section1 title">
					<input type="text"
						v-model="sections[0].image1" placeholder="section1 image1">
					<input type="text"
						v-model="sections[0].image2" placeholder="section1 image2">
					<textarea placeholder="description" v-model="sections[0].description"></textarea>
				</div>
				<div class="products__check-field">
					<label v-for="sub in subCategories">
						{{sub.id}}
						<input type="radio" v-bind:value="sub.id" @change='change' name="cat">
					</label>
				</div>
				<button type="submit" v-on:click.prevent.stop="submit">Create new</button>
			</form>
		</div>
	</div>
</template>

<script>
import './products.sass';
import db from '../../database-controller/database-controller.js';

export default {
	firebase ()  {
		return {
			products: db.ref('products'),
			subCategories: db.ref('subCat')
		}
	},
	data () {
		return {
			id: null,
			url: 'https://firebasestorage.googleapis.com/v0/b/meraki-test-eb979.appspot.com/o/table2.png?alt=media&token=66b76efe-11fe-4885-a111-f7315dc6ce75',
			cat: null,
			title: null,
			sections: [
				{
					title: null,
					description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit accusamus reiciendis quas nemo qui perferendis provident, laborum impedit velit voluptates corporis quam tempora, deleniti distinctio vitae nisi neque repellendus amet!',
					image1: 'https://firebasestorage.googleapis.com/v0/b/meraki-test-eb979.appspot.com/o/table2.png?alt=media&token=66b76efe-11fe-4885-a111-f7315dc6ce75',
					image2: 'https://firebasestorage.googleapis.com/v0/b/meraki-test-eb979.appspot.com/o/table2.png?alt=media&token=66b76efe-11fe-4885-a111-f7315dc6ce75'
				},
				{
					title: null,
					description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit accusamus reiciendis quas nemo qui perferendis provident, laborum impedit velit voluptates corporis quam tempora, deleniti distinctio vitae nisi neque repellendus amet!',
					image1: 'https://firebasestorage.googleapis.com/v0/b/meraki-test-eb979.appspot.com/o/table2.png?alt=media&token=66b76efe-11fe-4885-a111-f7315dc6ce75',
					image2: 'https://firebasestorage.googleapis.com/v0/b/meraki-test-eb979.appspot.com/o/table2.png?alt=media&token=66b76efe-11fe-4885-a111-f7315dc6ce75'
				}
			]
		};
	},
	methods: {
		change (e) {
			this.cat = e.target.value;
		},
		deleteItem: function (item) {
			if (confirm('Are you sure you want to delete this product?')) {
				this.$firebaseRefs.products.child(item['.key']).remove();
			}
		},
		submit (e) {
			if (!this.id || !this.title) {
				alert('id nor title shoulnt be empty');
				return;
			}

			this.$firebaseRefs.products.push({
				id: this.id,
				mainImage: this.url,
				title: this.title,
				cat: this.cat,
				sections: this.sections
			});
		}
	}
}
</script>

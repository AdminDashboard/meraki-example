<template>
	<div class="products">
		<div class="products__items">
			<div class='products__item' v-for='product in products'>
				<div class="admin-product">
					<div class="admin-product__image" @click="editItem(product)" v-bind:style="{'background-image': 'url(' + product.mainImage + ')'}">
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
				<h2>Main data</h2>
				<form-input v-model="id" :passedLabel="'id'" :passedValue="id"></form-input>
				<form-input v-model="title" :passedLabel="'Title'" :passedValue="title"></form-input>
				<form-input v-model="url" :passedLabel="'image url'" :passedValue="url"></form-input>
				<form-input v-model="url2" :passedLabel="'second image url'" :passedValue="url2"></form-input>
				<h2>Price</h2>
				<form-input v-model="price" :passedLabel="'Price'" :passedValue="price"></form-input>
				<form-input v-model="priceText" :passedLabel="'Price text'" :passedValue="priceText"></form-input>
				<div class="admin-product__section"
					v-for="(section, index) in sections">
					<h2>Section: {{index + 1}}</h2>
					<input type="text"
						v-model="section.title" placeholder="section title">
					<input type="text"
						v-model="section.image1" placeholder="section image1">
					<input type="text"
						v-model="section.image2" placeholder="section image2">
					<textarea placeholder="description" v-model="section.description"></textarea>
					<div>
						<h3>Orientation: </h3>
						<label>
							left
							<input type="radio"
								checked
								v-bind:value="'left'"
								@change="changeSectionType($event, index)"
								v-bind:name="'type' + index">
						</label>
						<label>
							right
							<input type="radio"
								v-bind:value="'right'"
								@change="changeSectionType($event, index)"
								v-bind:name="'type' + index">
						</label>
					</div>
					<button v-on:click.prevent.stop="removeSection(index)">Remove section</button>
				</div>
				<h2>Item category</h2>
				<div class="products__check-field">
					<label v-for="sub in subCategories">
						{{sub.id}}
						<input type="radio" v-model="cat" v-bind:value="sub.id" @change='change' name="cat">
					</label>
				</div>
				<div v-if="mode === 'edit'">
					<button type="submit" v-on:click.prevent.stop="edit">Edit</button>
					<button type="submit" v-on:click.prevent.stop="deleteItem">Delete</button>
					<button v-on:click.prevent.stop="addSection">Add section</button><br/><br/>
					<button type="submit" v-on:click.prevent.stop="cancel">Cancel</button>
				</div>
				<div v-else>
					<button v-on:click.prevent.stop="addSection">Add section</button><br/><br/>
					<button type="submit" v-on:click.prevent.stop="submit">Create new</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import './products.sass';
import db from '../../database-controller/database-controller.js';
import Input from '../../form-constructor/input/input.vue';

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
			url2: 'https://firebasestorage.googleapis.com/v0/b/meraki-test-eb979.appspot.com/o/table2.png?alt=media&token=66b76efe-11fe-4885-a111-f7315dc6ce75',
			cat: null,
			title: null,
			price: null,
			priceText: null,
			sections: [],
			mode: 'create',
			currentItem: null
		};
	},
	methods: {
		changeSectionType (e, index) {
			this.sections[index].type = e.target.value;
		},
		removeSection (index) {
			this.sections.splice(index, 1);
		},
		change (e) {
			this.cat = e.target.value;
		},
		editItem (item) {
			this.mode = 'edit';
			this.id = item.id;
			this.url = item.mainImage;
			this.url2 = item.secondImage;
			this.title = item.title;
			this.sections = item.sections;
			this.cat = item.cat;
			this.price = item.price;
			this.priceText = item.priceText;

			this.currentItem = item;
		},
		cancel () {
			this.mode = 'create';
			this.id = null;
			this.url = null;
			this.url2 = null;
			this.title = null;
			this.sections = [];
			this.cat = null;
			this.price = null;
			this.priceText = null;
			this.currentItem = null;
		},
		edit () {
			if (!this.currentItem) {
				alert('no item was specified');
				return;
			}

			this.$firebaseRefs.products.child(this.currentItem['.key']).set({
				id: this.id,
				mainImage: this.url,
				secondImage: this.url2,
				title: this.title,
				price: this.price,
				priceText: this.priceText,
				cat: this.cat,
				sections: this.sections
			});

			this.cancel();
		},
		addSection () {
			this.sections.push({
				title: null,
				type: 'left',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit accusamus reiciendis quas nemo qui perferendis provident, laborum impedit velit voluptates corporis quam tempora, deleniti distinctio vitae nisi neque repellendus amet!',
				image1: 'https://firebasestorage.googleapis.com/v0/b/meraki-test-eb979.appspot.com/o/table2.png?alt=media&token=66b76efe-11fe-4885-a111-f7315dc6ce75',
				image2: 'https://firebasestorage.googleapis.com/v0/b/meraki-test-eb979.appspot.com/o/table2.png?alt=media&token=66b76efe-11fe-4885-a111-f7315dc6ce75'
			});
		},
		deleteItem () {
			if (confirm('Are you sure you want to delete this product?')) {
				this.$firebaseRefs.products.child(this.currentItem['.key']).remove();
			}
		},
		submit (e) {
			if (!this.id || !this.title) {
				alert('id nor title shouldnt be empty');
				return;
			}

			this.$firebaseRefs.products.push({
				id: this.id,
				mainImage: this.url,
				secondImage: this.url2,
				price: this.price,
				priceText: this.priceText,
				title: this.title,
				cat: this.cat,
				sections: this.sections
			});
		}
	},
	components: {
		'form-input': Input
	}
}
</script>

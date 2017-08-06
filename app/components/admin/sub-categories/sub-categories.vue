<template>
	<div class="sub-categories">
		<div class="sub-categories__items">
			<div class='sub-categories__item' v-for='category in subCategories'>
				<div class="sub-category">
					<div class="sub-category__image" @click="deleteItem(category)" v-bind:style="{'background-image': 'url(' + category.mainImage + ')'}">
					</div>
					<div class="sub-category__col">
						<div class="sub-category__id"><span class="sub-category__label">id</span> {{category.id}}</div>
						<div class="sub-category__title"><span class="sub-category__label">title</span> {{category.title}}</div>
					</div>
					<div class="sub-category__col">
						<div class="sub-category__parent"><span class="sub-category__label">parent category</span> {{category.parentCat}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="sub-categories__form">
			<form action="">
				<input type="text" v-model="id" name="id" placeholder="id">
				<input type="text" v-model="title" name="title" placeholder="title">
				<input type="text" v-model="url" name="url" placeholder="image url">
				<div class="sub-categories__parents">
					<label v-for="parentCat in parentCategories">
						{{parentCat.id}}
						<input type="radio" v-bind:value="parentCat.id" @change='change' name="parentCat">
					</label>
				</div>
				<button type="submit" v-on:click.stop="submit">Create new</button>
			</form>
		</div>
	</div>
</template>

<script>
import './sub-categories.sass';
import db from '../../database-controller/database-controller.js';

export default {
	firebase ()  {
		return {
			subCategories: db.ref('subCat'),
			parentCategories: db.ref('parentCat')
		}
	},
	data () {
		return {
			id: null,
			url: null,
			title: null,
			parentCat: null
		};
	},
	methods: {
		change (e) {
			this.parentCat = e.target.value;
		},
		deleteItem: function (item) {
			if (confirm('Are you sure you want to delete this sub category?')) {
				this.$firebaseRefs.subCategories.child(item['.key']).remove();
			}
		},
		submit (e) {
			e.preventDefault();

			if (!this.id || !this.title) {
				alert('id nor title shoulnt be empty');
				return;
			}

			this.$firebaseRefs.subCategories.push({
				id: this.id,
				mainImage: this.url,
				title: this.title,
				parentCat: this.parentCat
			});
		}
	}
}
</script>

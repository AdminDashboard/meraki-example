<template>
	<div class="super-categories">
		<div class="super-categories__items">
			<div class='super-categories__item' v-for='category in categories'>
				<div class="super-category">
					<div class="super-category__image" @click="deleteItem(category)" v-bind:style="{'background-image': 'url(' + category.mainImage + ')'}">
					</div>
					<div class="super-category__col">
						<div class="super-category__id"><span class="super-category__label">id</span> {{category.id}}</div>
						<div class="super-category__title"><span class="super-category__label">title</span> {{category.title}}</div>
					</div>
					<div class="super-category__col">
					</div>
				</div>
			</div>
		</div>
		<div class="super-categories__form">
			<form action="">
				<h2>Main data</h2>
				<input type="text" v-model="id" name="id" placeholder="id">
				<input type="text" v-model="title" name="title" placeholder="title">
				<input type="text" v-model="url" name="url" placeholder="image url">
				<textarea placeholder="description" v-model="description"></textarea>
				<button type="submit" v-on:click.stop="submit">Create new</button>
			</form>
		</div>
	</div>
</template>

<script>
import './super-categories.sass';
import db from '../../database-controller/database-controller.js';

export default {
	firebase ()  {
		return {
			categories: db.ref('parentCat'),
			subCategories: db.ref('subCat')
		}
	},
	data () {
		return {
			id: null,
			url: null,
			subs: [],
			title: null,
			description: null
		};
	},
	computed: {
		jsonSubs () {
			return this.subs.map(sub => {
				var newSub = JSON.parse(sub);
				delete newSub['.key'];
				return newSub;
			});
		}
	},
	methods: {
		change (e) {
			var val = e.target.value;
			if (e.target.checked) {
				if (!~this.subs.indexOf(val)) {
					this.subs.push(val);
				}
			} else {
				var index = this.subs.indexOf(val);
				this.subs.splice(index, 1);
			}
		},
		deleteItem: function (item) {
			if (confirm('Are you sure you want to delete this category?')) {
				this.$firebaseRefs.categories.child(item['.key']).remove();
			}
		},
		submit (e) {
			e.preventDefault();

			if (!this.id || !this.title) {
				alert('id nor title shoulnt be empty');
				return;
			}

			this.$firebaseRefs.categories.push({
				id: this.id,
				mainImage: this.url,
				sub_cats: this.jsonSubs,
				description: this.description,
				title: this.title
			});
		}
	}
}
</script>

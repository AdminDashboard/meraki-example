<template>
	<div id='products'>
		<header-nav nav-style="black" v-bind:nav-cats="categories"></header-nav>
		<div v-bind:class="arrowTopMods" v-on:click="moveUp"></div>
		<div id='fullpage-grid'>
			<div class='section' v-for='section in sections'>
				<div class="products-grid">
					<div class='products-grid__item'
						v-on:click="moveTo"
						v-bind:data-childCats="item.childCats"
						v-bind:data-childItems="item.id"
						v-bind:data-title="item.title"
						v-bind:style="{'background-image': 'url(' + item.url + ')'}"
						v-for='item in section'>
					</div>
				</div>
			</div>
		</div>
		<div v-bind:class="arrowDownMods" v-on:click="moveDown"></div>
	</div>
</template>

<script>
import './products.sass';
import 'fullpage.js/dist/jquery.fullpage.js';
import table from './table2.png';
import hover from './hover.png';
import db from '../database-controller/database-controller.js';

import Nav from '../nav/nav.vue';

export default {
	firebase () {
		const defaultRefName = 'parentCat';
		const categoryType = this.categoryType;
		let currentType = 'childCat';
		let currentId = 'id';

		if (this.single) {
			currentType = 'products';
			currentId = 'cat';
		}

		const ref = categoryType
			? db.ref(currentType)
				.orderByChild(currentId)
				.equalTo(categoryType)
			: db.ref(defaultRefName);

		return {
			products: ref
		};
	},
	data () {
		const categoryType = this.$route.params.cat;

		return {
			itemsPerSection: 9,
			currentSection: 0,
			categories: null,
			categoryType: categoryType
		}
	},
	props: ['single'],
	mounted () {
		const _this = this;

		$('#fullpage-grid').fullpage({
			css3: true,
			onLeave (index, nextIndex, direction) {
				_this.currentSection = nextIndex;
			}
		});
	},
	destroyed () {
		if ($.fn.fullpage.length) {
			$.fn.fullpage.destroy('all');
		}
	},
	watch: {
		$route () {
			const currentCat = this.$route.params.cat;
			let ref = db.ref('parentCat');
			let currentType = 'childCat';
			let currentId = 'id';

			this.categoryType = currentCat;

			if (this.single) {
				currentType = 'products';
				currentId = 'cat';
			}

			if (currentCat) {
				ref = db.ref(currentType)
					.orderByChild(currentId)
					.equalTo(currentCat);
			}

			this.$bindAsArray('products', ref);
		}
	},
	computed: {
		totalSections () {
			return Math.floor(this.products.length / this.itemsPerSection);
		},
		sections () {
			let mutableItems = this.products.map((item) => item);
			let sections = {};

			for (let i = 0, l = this.totalSections; i < l; i++) {
				sections[i] = mutableItems.splice(0, this.itemsPerSection);
			}

			if (this.products.length % this.itemsPerSection !== 0) {
				sections[this.totalSections] = mutableItems;
			}

			return sections;
		},
		canMoveDown () {
			return this.totalSections > 1 && this.currentSection < this.totalSections;
		},
		arrowDownMods () {
			return {
				products__arrow: true,
				products__arrow_bottom: true,
				products__arrow_hidden: !this.canMoveDown
			}
		},
		arrowTopMods () {
			return {
				products__arrow: true,
				products__arrow_top: true,
				products__arrow_hidden: this.canMoveDown || this.totalSections < 1
			}
		}
	},
	methods: {
		moveTo (e) {
			const childCats = e.target.getAttribute('data-childCats');
			const childItems = e.target.getAttribute('data-childItems');
			const singleItem = e.target.getAttribute('data-singleItem');

			let move;

			if (childCats) {
				move = `/products/${childCats}`;
			}

			if (childItems) {
				move = `/products/${this.categoryType}/items`;
			}

			if (singleItem) {
				move = `/product/${singleItem}`;
			}

			if (!move) {
				return;
			}

			this.$router.push({path: move});
		},
		moveDown () {
			$.fn.fullpage.moveSectionDown();
		},
		moveUp () {
			$.fn.fullpage.moveSectionUp();
		}
	},
	components: {
		'header-nav': Nav
	}
}
</script>

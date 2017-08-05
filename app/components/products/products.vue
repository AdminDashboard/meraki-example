<template>
	<div id='products'>
		<header-nav nav-style="black" v-bind:nav-cats="categories"></header-nav>
		<div v-bind:class="arrowTopMods" v-on:click="moveUp"></div>
		<div id='fullpage-grid'>
			<div class='section' v-for='section in sections'>
				<div class="products-grid">
					<div class='products-grid__item'
						v-on:click="moveTo"
						v-bind:data-id="item.id"
						v-bind:data-title="item.title"
						v-bind:style="{'background-image': 'url(' + item.mainImage + ')'}"
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

const DEFAULT_REF_NAME = 'parentCat';

export default {
	// start: firebase related stuff
	// instead of firebase you can use simple ajax request
	// to fill products
	firebase () {
		return {
			rawProducts: this.depthResolver(this.depth)
		};
	},
	// start: end related stuff
	data () {
		const categoryType = this.$route.params.cat;

		return {
			itemsPerSection: 9,
			currentSection: 0,
			categories: null,
			categoryType: categoryType,
			categoryFilter: null
		}
	},
	props: ['depth'],
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
			this.depthResolver(this.depth, true);
		}
	},
	computed: {
		products () {
			if (this.categoryFilter && this.depth === 'super') {
				return this.rawProducts
					.filter(item => ~this.categoryFilter.indexOf(item.id));
			}

			if (this.categoryFilter && this.depth === 'products') {
				return this.rawProducts
					.filter(item => ~this.categoryFilter.indexOf(item.cat));
			}

			return this.rawProducts;
		},
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
		depthResolver (depthLevel, bind) {
			const categoryName = this.$route.params.cat;

			if (!depthLevel) {
				this.categories = null;

				return bind
					? this.$bindAsArray('rawProducts', db.ref(DEFAULT_REF_NAME))
					: db.ref(DEFAULT_REF_NAME);
			}

			this.categories = [categoryName];

			if (depthLevel === 'super') {
				db.ref(DEFAULT_REF_NAME)
					.orderByChild('id')
					.equalTo(categoryName)
					.once('child_added', snapshot => {
						const cats = snapshot.val().sub_cats;

						this.categoryFilter = cats.reduce((result, item) => {
							result.push(item.id);
							return result;
						}, []);

						if (bind) {
							this.$bindAsArray('rawProducts', db.ref('subCat'));
						}
					});

				if (!bind) {
					return db.ref('subCat');
				}
			}

			if (depthLevel === 'products') {
				db.ref('subCat')
					.orderByChild('id')
					.equalTo(categoryName)
					.once('child_added', snapshot => {
						const cat = snapshot.val().id;

						this.categoryFilter = [cat];

						if (bind) {
							this.$bindAsArray('rawProducts', db.ref('products'));
						}
					});

				return db.ref('products');
			}
		},
		moveTo (e) {
			const itemId = e.target.getAttribute('data-id');

			let move;
			let props;

			// if depth is empty, move to super category
			if (!this.depth) {
				move = `/products/${itemId}`;
			}

			if (this.depth === 'super') {
				move = `/products/${itemId}/items`;
			}

			if (this.depth === 'products') {
				move = `/product/${itemId}`;
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

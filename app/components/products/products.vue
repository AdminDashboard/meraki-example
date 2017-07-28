<template>
	<div id='products'>
		<header-nav nav-style="black" v-bind:nav-cats="categories"></header-nav>
		<div v-bind:class="arrowTopMods" v-on:click="moveUp"></div>
		<div id='fullpage-grid'>
			<div class='section' v-for='section in sections'>
				<div class="products-grid">
					<div v-bind:data-title="item.title" class='products-grid__item'
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
	firebase: {
		products: db.ref('products')
	},
	data () {
		return {
			itemsPerSection: 9,
			currentSection: 0,
			categories: ['tables']
		}
	},
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

<template>
	<div id='products'>
		<header-nav nav-style="black"></header-nav>
		<div v-bind:class="arrowTopMods" v-on:click="moveUp"></div>
		<div id='fullpage-grid'>
			<div class='section' v-for='section in sections'>
				<div class="products-grid">
					<div class='products-grid__item'
						v-bind:style="{'background-image': 'url(' + item.pic + ')'}"
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

import Nav from '../nav/nav.vue';

export default {
	data () {
		return {
			itemsPerSection: 9,
			currentSection: 0,
			items: [
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				},
				{
					pic: table
				}
			]
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
			return Math.floor(this.items.length / this.itemsPerSection);
		},
		sections () {
			let mutableItems = this.items.map((item) => item);
			let sections = {};

			for (let i = 0, l = this.totalSections; i < l; i++) {
				sections[i] = mutableItems.splice(0, this.itemsPerSection);
			}

			if (this.items.length % this.itemsPerSection !== 0) {
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
				products__arrow_hidden: this.canMoveDown
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

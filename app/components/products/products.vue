<template>
	<div id='products'>
		<header-nav></header-nav>
		<div id='fullpage-grid'>
			<div class='section'>
				<div class="products-grid">
					<div class='products-grid__item' v-for='item in items'>
						<img v-bind:src='item.pic'>
					</div>
				</div>
			</div>
			<div class='section'>
				<div class="products-grid">
					<div class='products-grid__item' v-for='item in items.slice(0, 7)'>
						<img v-bind:src='item.pic'>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import './products.sass';
import 'fullpage.js/dist/jquery.fullpage.js';
import table from './table2.png';
import hover from './hover.png';

import Nav from '../nav/app.vue';

export default {
	data () {
		return {
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
				}
			]
		}
	},
	mounted () {
		$('#fullpage-grid').fullpage({
			css3: true
		});
	},
	destroyed () {
		$.fn.fullpage.destroy('all');
	},
	components: {
		'header-nav': Nav
	}
}
</script>

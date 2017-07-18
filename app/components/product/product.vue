<template>
	<div id='product'>
		<header-nav></header-nav>
		<div class="product">
			<h1 class="product__title">product<br/>title</h1>
			<div class="product__image"><img v-bind:src='table'></div>
			<div class="product__section product__section_1">
				<div class="product__section_left">
					<img v-bind:src='table'>
					<div class="product__text-block">
						<h2 class="product__text-heading">Lorem ipsum dolor sit.</h2>
						<p class="product__text-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit accusamus reiciendis quas nemo qui perferendis provident, laborum impedit velit voluptates corporis quam tempora, deleniti distinctio vitae nisi neque repellendus amet!
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit accusamus reiciendis quas nemo qui perferendis provident, laborum impedit velit voluptates corporis quam tempora, deleniti distinctio vitae nisi neque repellendus amet!</p>
					</div>
				</div>
				<div class="product__section_right">
					<img v-bind:src='table'>
				</div>
			</div>
			<div class="product__section product__section_2">
				<div class="product__section_left">
					<img v-bind:src='table'>
				</div>
				<div class="product__section_right">
					<img v-bind:src='table'>
					<div class="product__text-block">
						<h2 class="product__text-heading">Lorem ipsum dolor sit.</h2>
						<p class="product__text-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit accusamus reiciendis quas nemo qui perferendis provident, laborum impedit velit voluptates corporis quam tempora, deleniti distinctio vitae nisi neque repellendus amet!</p>
					</div>
				</div>
			</div>
			<div class="product__section product__section_form">
			</div>
		</div>
	</div>
</template>

<script>
import './product.sass';
import table from '../index/table.png';

import Nav from '../nav/app.vue';

export default {
	data () {
		return {
			table: table,
			items: [
			]
		}
	},
	components: {
		'header-nav': Nav
	}
}
</script>

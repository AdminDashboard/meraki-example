<template>
	<div id='product'>
	<header-nav nav-style="black" v-bind:nav-cats="categories"></header-nav>
		<div class="product">
			<h1 class="product__title">{{this.title}}</h1>
			<div class="product__image"><img v-bind:src='table'></div>
			<div class="product__section product__section_1">
				<div class="product__section_left">
					<div class="product__inner-image" v-on:click="showFullImage($event, table)"><img v-bind:src='table'></div>
					<div class="product__text-block">
						<h2 class="product__text-heading">Lorem ipsum dolor sit.</h2>
						<p class="product__text-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit accusamus reiciendis quas nemo qui perferendis provident, laborum impedit velit voluptates corporis quam tempora, deleniti distinctio vitae nisi neque repellendus amet!
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit accusamus reiciendis quas nemo qui perferendis provident, laborum impedit velit voluptates corporis quam tempora, deleniti distinctio vitae nisi neque repellendus amet!</p>
					</div>
				</div>
				<div class="product__section_right">
					<div class="product__inner-image" v-on:click="showFullImage($event, table)"><img v-bind:src='table'></div>
				</div>
			</div>
			<div class="product__section product__section_2">
				<div class="product__section_left">
					<div class="product__inner-image" v-on:click="showFullImage($event, table)"><img v-bind:src='table'></div>
				</div>
				<div class="product__section_right">
					<div class="product__inner-image" v-on:click="showFullImage($event, table)"><img v-bind:src='table'></div>
					<div class="product__text-block">
						<h2 class="product__text-heading">Lorem ipsum dolor sit.</h2>
						<p class="product__text-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit accusamus reiciendis quas nemo qui perferendis provident, laborum impedit velit voluptates corporis quam tempora, deleniti distinctio vitae nisi neque repellendus amet!</p>
					</div>
				</div>
			</div>
			<div class="product__section product__section_form">
				<form-component></form-component>
			</div>
		</div>
		<image-modal v-bind:image-data='imageController'></image-modal>
	</div>
</template>

<script>
import './product.sass';
import table from '../index/table.png';

import Nav from '../nav/nav.vue';
import Form from '../form/form.vue';
import ImageModal from '../image-modal/image-modal.vue';

import db from '../database-controller/database-controller.js';

export default {
	firebase () {
		if (!this.itemId) {
			return;
		}

		return {
			product: db.ref('products')
				.orderByChild('name')
				.equalTo(this.itemId)
		};
	},
	data () {
		return {
			table: table,
			recentImage: null,
			loading: true,
			imageController: {
				active: false,
				src: null,
				offsetData: null
			},
			categories: ['tables']
		}
	},
	mounted: function () {
		if (!this.itemId) {
			return;
		}

		db.ref('products')
			.once('value', snapshot => {
				console.log('loaded');
				this.loading = false;
		});
	},
	props: ['itemId'],
	methods: {
		showFullImage (event, image) {
			const target = event.target;
			const targetOffsets = target.getBoundingClientRect();

			target.style.opacity = 0;

			this.imageController.offsetData = {
				top: targetOffsets.top,
				left: targetOffsets.left,
				width: targetOffsets.width
			};
			this.imageController.src = image;
			this.imageController.active = true;
			this.recentImage = target;
		}
	},
	computed: {
		isClosed () {
			return !this.imageController.active;
		},
		title () {
			if (!this.loading) {
				return this.product[0].title;
			}

			if (!this.itemId) {
				return 'static page';
			}

			return 'loading...';
		}
	},
	watch: {
		isClosed (closed) {
			if (closed) {
				this.recentImage.style.opacity = 1;
			}
		}
	},
	components: {
		'header-nav': Nav,
		'form-component': Form,
		'image-modal': ImageModal
	}
}
</script>

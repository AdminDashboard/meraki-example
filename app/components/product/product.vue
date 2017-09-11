<template>
	<div id='product'>
		<header-nav nav-style="black" v-bind:nav-cats="computedBread"></header-nav>
		<div class="product">
			<h1 class="product__title">{{productTitle}}</h1>
			<div class="product__image"><img v-bind:src='productMainImage'></div>
			<div class="product__section"
				v-bind:class="section.type === 'left'
					? {product__section_1: true}
					: {product__section_2: true}"
				v-for="section in productSections">

				<div class="product__section_left" v-if="section.type === 'left'">
					<div class="product__inner-image" v-on:click="showFullImage($event, section.image1)"><img v-bind:src='section.image1'></div>
					<div class="product__text-block">
						<h2 class="product__text-heading">{{section.title}}</h2>
						<p class="product__text-p">{{section.description}}</p>
					</div>
				</div>
				<div class="product__section_right" v-if="section.type === 'left'">
					<div class="product__inner-image" v-on:click="showFullImage($event, section.image2)"><img v-bind:src='section.image2'></div>
				</div>

				<div class="product__section_left" v-if="section.type === 'right'">
					<div class="product__inner-image" v-on:click="showFullImage($event, section.image1)"><img v-bind:src='section.image1'></div>
				</div>
				<div class="product__section_right" v-if="section.type === 'right'">
					<div class="product__inner-image" v-on:click="showFullImage($event, section.image2)"><img v-bind:src='section.image2'></div>
					<div class="product__text-block">
						<h2 class="product__text-heading">{{section.title}}</h2>
						<p class="product__text-p">{{section.description}}</p>
					</div>
				</div>
			</div>
			<div class="product__section product__section_form"
				:style="{'background-image': `url(${productSecondImage})`}">
				<form-component :confirm="true" :type="'product'"></form-component>
			</div>
		</div>
		<image-modal v-bind:image-data='imageController'></image-modal>
		<phone-footer v-if="isMobile"></phone-footer>
		<phone-form v-if="isMobile" :fixed="true"></phone-form>
	</div>
</template>

<script>
import './product.sass';
import table from '../index/table.png';
import isMobile from '../utils/mobile-detect';

import Nav from '../nav/nav.vue';
import Form from '../form/form.vue';
import ImageModal from '../image-modal/image-modal.vue';
import PhoneForm from '../phone-form/phone-form.vue';
import PhoneFooter from '../phone-footer/phone-footer.vue';

import db from '../database-controller/database-controller.js';

export default {
	firebase () {
		if (!this.itemId) {
			return;
		}

		return {
			productRaw: db.ref('products')
				.orderByChild('id')
				.equalTo(this.itemId),
			subCat: db.ref('subCat')
		};
	},
	data () {
		return {
			isMobile: isMobile(),
			table: table,
			recentImage: null,
			loading: true,
			itemId: this.$route.params.item,
			imageController: {
				active: false,
				src: null,
				offsetData: null
			}
		}
	},
	mounted: function () {
		if (!this.itemId) {
			return;
		}

		db.ref('products')
			.once('value', snapshot => {
				this.loading = false;
		});
	},
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
		product () {
			if (this.productRaw.length) {
				return this.productRaw[0];
			}

			return null;
		},
		productTitle () {
			return this.product ? this.product.title : null;
		},
		productMainImage () {
			return this.product ? this.product.mainImage : null;
		},
		productSecondImage () {
			return this.product ? this.product.secondImage : null;
		},
		productSections () {
			return this.product ? this.product.sections : null;
		},
		parentCat () {
			const cat = this.subCat.filter(cat => {
				return cat.id === this.product.cat;
			});

			return cat.length ? cat[0].parentCat : null;
		},
		computedBread () {
			if (this.parentCat) {
				return [this.parentCat, this.product.cat, this.itemId];
			}

			return null;
		},
		isClosed () {
			return !this.imageController.active;
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
		'image-modal': ImageModal,
		'phone-form': PhoneForm,
		'phone-footer': PhoneFooter
	}
}
</script>

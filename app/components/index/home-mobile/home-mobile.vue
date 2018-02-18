<template>
	<div class='mobile-home'>
		<header-nav v-bind:d-style="'black'"></header-nav>
		<div class="mobile-home__image"
			:style="{
				backgroundImage: `url(${fingerprintImage})`,
				backgroundPosition: bgPos
			}"></div>
		<div class="owl-carousel owl-theme">
			<div class="owl-carousel__item">
				<div class="mobile-home-main mobile-home-main_about">
					<div class="mobile-home-main__image">
						<img :src="aboutLogo" alt="">
					</div>
					<div class="mobile-home-main__description">
						{{aboutItem.text}}
					</div>
				</div>
			</div>
			<div class="owl-carousel__item">
				<div class="mobile-home-main">
					<div class="mobile-home-main__image">
						<img :src="aboutLogo" alt="">
					</div>
					<div class="mobile-home-main__text">
						<span class="mobile-home-main__text_main">swipe</span>
						<span class="mobile-home-main__text_sub">to explore</span>
					</div>
				</div>
			</div>
			<div class="owl-carousel__item owl-carousel__item_mobile-products">
				<div class="mobile-home-main__additional-title">
					products
				</div>
				<div class="mobile-home-products">
					<a :href="`#/products/${cat.id}`" class="mobile-home-product" v-for="cat in categories" v-if="cat.showItsChilds">
						<div class="mobile-home-product__title">{{cat.id}}</div>
						<div class="mobile-home-product__image">
							<img :src="cat.mainImage" alt="">
						</div>
					</a>
				</div>
			</div>
		</div>
		<phone-footer></phone-footer>
		<phone-form :fixed="true"></phone-form>
	</div>
</template>

<script>
import tableImage from '../table.png';
import aboutLogo from '../logo-2.png';
import fingerprint from '../f2.png';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'imports-loader?jQuery=jquery!owl.carousel';
import db from '../../database-controller/database-controller.js';

import Dropdown from '../../nav/dropdown-menu/dropdown-menu.vue';
import ComingSoon from '../coming-soon/coming-soon.vue';
import PhoneForm from '../../phone-form/phone-form.vue';
import PhoneFooter from '../../phone-footer/phone-footer.vue';

export default {
	firebase ()  {
		return {
			settings: db.ref('general'),
			categories: db.ref('parentCat'),
			subCats: db.ref('subCat')
		}
	},
	data () {
		return {
			tableImage: tableImage,
			fingerprintImage: fingerprint,
			aboutLogo: aboutLogo,
			bgPos: '50%',
			navItems: [
				'seating',
				'beds',
				'decor',
				'lighting',
				'kitchen',
				'bathroom',
				'about',
				'tables'
			]
		}
	},
	mounted () {
		const carousel = $('.owl-carousel').owlCarousel({
			items: 1,
			startPosition: 1
		});

		carousel.on('changed.owl.carousel', event => {
			const index = event.item.index;

			if (index === 1) {
				this.bgPos = '50%';
			}

			if (index === 0) {
				this.bgPos = '50px 50%';
			}

			if (index === 2) {
				this.bgPos = '-100px 50%';
			}
		});
	},
	computed: {
		aboutItem () {
			return this.settings.length && this.settings[0];
		}
	},
	components: {
		'header-nav': Dropdown,
		'coming-soon': ComingSoon,
		'phone-form': PhoneForm,
		'phone-footer': PhoneFooter
	}
}
</script>

<style scoped lang='sass'>
	.mobile-home
		position: relative
		&__image
			content: ''
			position: absolute
			top: 0
			right: 0
			bottom: 0
			left: 0
			transition: background .7s ease-in-out
			opacity: .2
			background-size: 110%
			background-repeat: no-repeat
	.owl-carousel
		touch-action: manipulation
	.dropdown-menu
		position: absolute
		top: 15px
		right: 10px
		z-index: 2
	.owl-carousel
		&__item
			display: flex
			align-items: center
			box-sizing: border-box
			flex-wrap: wrap
			padding: 20px
			height: 100vh
			overflow-y: scroll

	.mobile-home-main
		width: 80%
		margin: 0 auto
		&_about
			align-self: flex-start
			padding-bottom: 50px
		&__additional-title
			position: absolute
			font-family: 'Ailerons'
			padding: 5px 0
			border-bottom: 1px solid lightgray
			z-index: 1
			top: 0
			left: 0
			width: 100%
			text-align: center
			font-size: 1.8em
			background: #fff
			left: 0
		&__description
			font-family: 'Raleway'
			text-align: justify
			margin-top: 40px
			line-height: 30px
		&__text
			font-family: 'Raleway'
			opacity: .8
			&_main
				margin-top: 50%
				font-size: 40px
				letter-spacing: 40px
				animation: slideRight 3s infinite
				display: block
			&_sub
				display: block
				margin-top: 10px
				text-align: right
				letter-spacing: 5px
				animation: slideLeft 3s infinite

	.mobile-home-product
		display: flex
		justify-content: space-between
		align-items: center
		box-sizing: border-box
		padding: 25px 10px
		text-decoration: none
		color: #000
		border-bottom: 1px solid gray
		> div
			width: 48%
		&__title
			font-family: 'Ailerons'
			font-size: 35px
			opacity: .8

	@media only screen and (orientation : landscape)
		.owl-carousel__item
			align-items: flex-start
		.mobile-home-main__image
			width: 60%
			margin: 0 auto
		.mobile-home-main__text_main
			margin-top: 20%
		.mobile-home-products
			margin-top: 80px

	@keyframes slideLeft
		0%
			transform: translateX(0)
		50%
			transform: translateX(10px)
		100%
			transform: translateX(0)
	@keyframes slideRight
		0%
			transform: translateX(0)
		50%
			transform: translateX(-10px)
		100%
			transform: translateX(0)
</style>

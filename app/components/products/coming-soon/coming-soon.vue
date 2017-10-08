<template>
	<div class="coming-soon-overlay">
		<div class="coming-soon-overlay__image" :style="{'background-image': `url(${bg})`}"></div>
		<div class="coming-soon-overlay__title">
			coming<br/>soon
		</div>
		<div class="coming-soon-overlay__description">{{description}}</div>
	</div>
</template>

<script>
import db from '../../database-controller/database-controller.js';

export default {
	firebase () {
		return {
			rawProduct: {
				source: db.ref('parentCat').orderByChild('id').equalTo(this.cat),
				asObject: true
			}
		};
	},
	watch: {
		cat () {
			this.$bindAsObject('rawProduct', db.ref('parentCat')
				.orderByChild('id')
				.equalTo(this.cat))
		}
	},
	props: ['cat'],
	computed: {
		product () {
			const product = this.rawProduct;

			return product[Object.keys(product)[0]];
		},

		description () {
			if (this.product) {
				return this.product.description;
			}
		},

		bg () {
			if (this.product) {
				return this.product.mainImage;
			}
		}
	},
	data () {
		return {};
	}
}
</script>

<style scoped lang="sass">
.coming-soon-overlay
	position: absolute
	top: 60px
	text-align: center
	bottom: 0
	display: flex
	align-items: center
	flex-wrap: wrap
	width: 100%
	&__image
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		background-size: 80%
		background-repeat: no-repeat
		background-position: 50%
		opacity: .2
		filter: grayscale(100%)
	&__title
		width: 100%
		font-size: 4em
		font-family: 'Ailerons'
		position: relative
	&__description
		max-width: 800px
		margin: 20px auto
		font-size: 1.5em
		font-family: 'Futura PT'

@media only screen and (max-width: 1024px)
	.coming-soon-overlay
		&__description
			font-size: 1em
			padding: 0 20px
</style>

<template>
	<div class="price">
		<div class="price__text" v-if="text">{{text}}</div>
		<div class="price__sum" v-if="price">price: ${{price}}</div>
		<div class="price__menu" v-if="price">
			<div v-if="!itemData.inCart" class="price__menu-item" @click="addItemToCart()">Add to cart</div>
			<div v-if="itemData.inCart" class="price__menu-item" @click="removeFromCart()">Remove from cart</div>
			<div class="price__menu-item">Create price alert</div>
			<div v-if="!itemData.inWishlist" class="price__menu-item" @click="addItemToWishlist()"><i class="fa fa-heart-o" aria-hidden="true"></i> Add to wishlist</div>
			<div v-if="itemData.inWishlist" class="price__menu-item" @click="removeFromWishlist()">Remove from wishlist</div>
		</div>
	</div>
</template>

<script>
import AddToLs from '../../utils/addToLocalstorage.vue';

export default {
	props: ['price', 'text', 'itemData'],
	mixins: [AddToLs],
	methods: {
		addItemToWishlist () {
			this.addToLocalstorage('wishlist', this.itemData);
			this.$emit('add');
		},
		addItemToCart () {
			this.addToLocalstorage('cart', this.itemData);
			this.$emit('add');
		},
		removeFromWishlist () {
			this.$emit('removeFromWishlist');
		},
		removeFromCart () {
			this.$emit('removeFromCart');
		}
	}
}
</script>

<style scoped lang='sass'>
.price
	display: inline-block
	&__sum, &__text
		font-family: 'Ailerons'
		font-size: 70px
	&__menu
		padding-right: 12px
		text-align: right
		font-family: 'Futura PT'
		font-size: 1.3em
	&__menu-item
		cursor: pointer
		margin-bottom: 5px
		transition: all .2s ease-in-out
		&:first-child
			font-size: 1.5em
		&:hover
			opacity: .5
</style>

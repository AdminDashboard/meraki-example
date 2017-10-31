<template>
	<div class="price">
		<div class="price__text" v-if="text">{{text}}</div>
		<div class="price__sum" v-if="price">price: ${{price}}</div>
		<div class="price__menu" v-if="price">
			<div class="price__menu-item">Add to cart</div>
			<div class="price__menu-item">Create price alert</div>
			<div class="price__menu-item" @click="addItemToWishlist()"><i class="fa fa-heart-o" aria-hidden="true"></i> Add to wishlist</div>
		</div>
	</div>
</template>

<script>

export default {
	props: ['price', 'text', 'itemData'],
	methods: {
		addItemToWishlist () {
			const items = Array.isArray(this.$ls.get('wishlist')) && this.$ls.get('wishlist') || [];
			items.push(this.itemData);

			this.$ls.set('wishlist', items);
		},
		addItemToCart () {
			const items = Array.isArray(this.$ls.get('cart')) && this.$ls.get('cart') || [];
			items.push(this.itemData);

			this.$ls.set('cart', items);
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

<template>
	<div class="price">
		<div class="price__sum">price: ${{price}}</div>
		<div class="price__menu">
			<div class="price__menu-item">Add to cart</div>
			<div class="price__menu-item">Create price alert</div>
			<div class="price__menu-item"><i class="fa fa-heart-o" aria-hidden="true"></i> Add to wishlist</div>
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {

		}
	},
	props: ['price']
}
</script>

<style scoped lang='sass'>
.price
	display: inline-block
	&__sum
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

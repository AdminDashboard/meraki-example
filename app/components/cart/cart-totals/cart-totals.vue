<template>
	<div class="totals">
		<div class="totals__title">Cart totals</div>
		<div class="totals__details">
			<div class="totals__details-item">
				<div class="totals__details-item-name">Subtotal</div>
				<div class="totals__details-item-price">${{total}}</div>
			</div>
			<div class="totals__details-item">
				<div class="totals__details-item-name">Shipping</div>
				<div class="totals__details-item-price">${{shipping}}</div>
			</div>
			<div class="totals__details-item">
				<div class="totals__details-item-name">Tax</div>
				<div class="totals__details-item-price">${{tax}}</div>
			</div>
		</div>
		<div class="totals__price">
			<div class="totals__price-label">Total</div>
			<div class="totals__price-sum">${{total + shipping}}</div>
		</div>
		<div class="totals__control">
			<button class="totals__update-cart">Update cart</button>
			<button class="totals__proceed">Proceed to checkout</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			shipping: 500,
			tax: 0
		}
	},
	props: ['total']
}
</script>

<style scoped lang='sass'>
.totals
	background: #f3f3f3
	font-family: 'Futura PT'
	box-sizing: border-box
	padding: 20px
	&__title
		border-bottom: 1px solid lightgray
		text-transform: uppercase
		padding-bottom: 10px
	&__details
		border-bottom: 1px solid lightgray
		padding: 10px 0
	&__details-item
		display: flex
		> div
			width: 48%
			padding: 10px 0
			justify-content: space-between
	&__price
		display: flex
		font-size: 1.5em
		padding: 15px 0
		border-bottom: 1px solid lightgray
		> div
			width: 48%
			justify-content: space-between
	&__update-cart, &__proceed
		background: #bdbdbd
		display: block
		color: #fff
		font-size: 1.2em
		text-align: center
		width: 100%
		margin: 5px 0
		padding: 7px 10px
		cursor: pointer
		box-sizing: border-box
		text-transform: uppercase
		border: none
		transition: all .3s ease-in-out
		font-family: 'Futura PT'
		&:focus
			outline: none
		&:hover
			opacity: .7
</style>

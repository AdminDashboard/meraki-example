<template>
	<div class="phone-footer">
		<div class="phone-footer__row">
			<a href="#" class="phone-footer__link">facebook</a>
			<a href="#" class="phone-footer__link">instagram</a>
		</div>
		<div class="phone-footer__row">Designed by GLIDER, – © MERAKIWOODS</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
		}
	}
}

</script>

<style lang='sass'>
	.phone-footer
		position: fixed
		left: 10px
		bottom: 15px
		z-index: 2
		font-family: 'Raleway'
		&__row
			color: gray
			font-size: 12px
			margin-bottom: 2px
		&__link
			text-decoration: none
			color: gray
			text-transform: uppercase
			&:after
				content: '|'
				margin-left: 10px
				margin-right: 8px
			&:last-child:after
				content: none
</style>

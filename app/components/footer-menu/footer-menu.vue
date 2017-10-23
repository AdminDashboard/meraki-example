<template>
	<div class="footer-menu">
		<ul class="footer-menu__list">
			<li class="footer-menu__item">
				<a @click="moveTo('/products')" class="footer-menu__link">Products</a>
			</li>
			<li class="footer-menu__item">
				<a @click="moveTo('#')" class="footer-menu__link">Cart</a>
			</li>
			<li class="footer-menu__item">
				<a @click="moveTo('#')" class="footer-menu__link">My account</a>
			</li>
			<li class="footer-menu__item">
				<a @click="moveTo('/wishlist')" class="footer-menu__link">Wishlist</a>
			</li>
		</ul>
	</div>
</template>

<script>

export default {
	methods: {
		moveTo (url) {
			this.$router.push({path: url});
		}
	}
};
</script>

<style scoped lang='sass'>
.footer-menu
	&__list
		margin: 0
		padding: 0
	&__item
		list-style: none
		margin-bottom: 10px
	&__link
		text-decoration: none
		font-family: 'Futura PT'
		text-transform: uppercase
		cursor: pointer
</style>

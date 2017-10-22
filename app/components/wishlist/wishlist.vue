<template>
	<div class="wishlist-wrapper">
		<header-nav nav-style="black"></header-nav>
		<div class="wishlist">
			<div class="wishlist__title">wishlist</div>
			<div class="wishlist__items">
				<div class="wishlist__item" v-for='item, index in items'>
					<div class="wishlist__delete" @click='deleteItem(index)'>
						<i class="fa fa-times" aria-hidden="true"></i>
					</div>
					<div class="wishlist__image">
						<img :src="item.image">
					</div>
					<div class="wishlist__name">{{item.name}}</div>
					<div class="wishlist__price">{{item.price}}</div>
					<div class="wishlist__status">{{item.status}}</div>
					<div class="wishlist__add-to-cart">add to cart</div>
				</div>
			</div>
			<div class="wishlist__no-items" v-if="!items.length">
				<div class="wishlist__no-items-text">No item were added to the wishlist</div>
			</div>
		</div>
	</div>
</template>

<script>
import Nav from '../nav/nav.vue';

export default {
	data () {
		return {
			items: []
		};
	},
	mounted () {
		this.items = this.$ls.get('wishlist');
	},
	methods: {
		deleteItem (index) {
			this.items.splice(index, 1);
			this.$ls.set('wishlist', this.items);
		}
	},
	components: {
		'header-nav': Nav
	}
}
</script>

<style scoped lang='sass'>
.wishlist
	margin: 100px 20px
	&__title
		text-align: center
		font-family: 'Ailerons'
		font-size: 4em
	&__item
		display: flex
		justify-content: space-between
		border-bottom: 1px solid gray
		padding: 5px
		font-family: 'Futura PT'
		&:last-child
			border-bottom: none
		> div
			display: flex
			align-items: center
	&__delete
		cursor: pointer
		font-size: 1.5em
		width: 5%
	&__image
		width: 20%
		box-sizing: border-box
		padding: 5px
		img
			width: 100%
	&__price
		width: 20%
		font-size: 1.5em
	&__name
		width: 20%
		font-size: 1.5em
	&__status
		width: 30%
		font-size: 1.5em
		text-transform: uppercase
	&__no-items
		margin-top: 50px
		text-align: center
		font-family: 'Futura PT'
		font-size: 2.5em
		position: relative
		&:before
			content: ''
			position: absolute
			left: 0
			top: 50%
			border-bottom: 1px solid gray
			width: 100%
	&__add-to-cart
		width: 30%
		font-size: 1.5em
		text-transform: uppercase
		cursor: pointer
		justify-content: flex-end
</style>

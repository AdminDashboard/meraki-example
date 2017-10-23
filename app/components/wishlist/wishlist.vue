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
			<div class="wishlist__footer">
				<div class="wishlist__left-col">
					<div class="wishlist__text">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nulla est dignissimos deleniti, alias minus. Molestiae nostrum consequuntur modi adipisci laborum quis amet minima architecto quod, dolorum ducimus recusandae officiis, nobis veritatis magni aut nesciunt magnam laudantium quae alias est nulla aliquam ratione rem? Quis qui accusamus dolores quia consectetur, ut perspiciatis accusantium nostrum? Esse.
					</div>
					<div class="wishlist__menu">
						<footer-menu></footer-menu>
					</div>
				</div>
				<div class="wishlist__right-col">
					<div class="wishlist__follow">
						<follow></follow>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Nav from '../nav/nav.vue';
import FooterMenu from '../footer-menu/footer-menu.vue';
import Follow from '../follow/follow.vue';

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
		'header-nav': Nav,
		'footer-menu': FooterMenu,
		'follow': Follow
	}
}
</script>

<style scoped lang='sass'>
.wishlist
	margin: 100px 20px 20px 20px
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
	&__text
		font-family: 'Futura PT'
		width: 100%
		margin-right: 40px
	&__footer
		margin-top: 100px
		opacity: .5
		display: flex
		transition: all .3s ease-in-out
		justify-content: space-between
		&:hover
			opacity: 1
	&__left-col, &__right-col
		width: 50%
		display: flex
	&__right-col
		justify-content: flex-end
	&__menu
		width: 200px
</style>

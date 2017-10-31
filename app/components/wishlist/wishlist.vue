<template>
	<div class="wishlist-wrapper">
		<header-nav nav-style="black"></header-nav>
		<div class="wishlist">
			<div class="wishlist__login"><a href="#" @click.prevent.stop="togglePopup()">Login</a> to save your wishlist</div>
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
					<div class="wishlist__add-to-cart" @click="addItemToCart(item)">add to cart</div>
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
			<div class="wishlist__sub-footer">
				<socials :color="'#cecece'"></socials>
				<div class="wishlist__pages">
					<div class="wishlist__page-wrapper">
						<div class="wishlist__page">Page 1</div>
					</div>
					<div class="wishlist__page-wrapper">
						<div class="wishlist__page">Page 2</div>
					</div>
					<div class="wishlist__page-wrapper">
						<div class="wishlist__page">Page 3</div>
					</div>
					<div class="wishlist__page-wrapper">
						<div class="wishlist__page">Page 4</div>
					</div>
					<div class="wishlist__page-wrapper">
						<div class="wishlist__page">Page 5</div>
					</div>
				</div>
			</div>
			<div class="wishlist__popup" :style="{display: popup === true ? 'block' : 'none'}">
				<div class="wishlist__popup-close" @click.prevent.stop="togglePopup()">
					<div class="wishlist__popup-close-trigger wishlist__popup-close-trigger_active"></div>
				</div>
				<div class="wishlist__popup-holder">
					<login-form></login-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Nav from '../nav/nav.vue';
import FooterMenu from '../footer-menu/footer-menu.vue';
import Follow from '../follow/follow.vue';
import Socials from '../social-items/social-items.vue';
import LoginForm from '../login/login.vue';

export default {
	data () {
		return {
			items: [],
			popup: false
		};
	},
	mounted () {
		this.items = this.$ls.get('wishlist');
	},
	methods: {
		deleteItem (index) {
			this.items.splice(index, 1);
			this.$ls.set('wishlist', this.items);
		},
		togglePopup () {
			this.popup = this.popup ? false : true;
		},
		addItemToCart (item) {
			const items = Array.isArray(this.$ls.get('cart')) && this.$ls.get('cart') || [];
			items.push(item);

			this.$ls.set('cart', items);
		},
		moveTo (url) {
			this.$router.push({path: url});
		}
	},
	components: {
		'header-nav': Nav,
		'footer-menu': FooterMenu,
		'follow': Follow,
		'socials': Socials,
		'login-form': LoginForm
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
	&__sub-footer
		border-top: 1px solid lightgray
		margin-top: 50px
		padding-top: 50px
	&__pages
		display: flex
		justify-content: center
		margin-top: 30px
	&__page-wrapper
		position: relative
		&:before
			content: '|'
			margin: 0 20px
			display: inline-block
			color: lightgray
		&:first-child:before
			content: none
	&__page
		font-family: 'Futura PT'
		display: inline-block
		cursor: pointer
		color: lightgray
		&:hover
			color: #000
	&__login
		text-align: center
		font-family: 'Futura PT'
	.social-items
		justify-content: center
	&__popup
		position: fixed
		top: 0
		left: 0
		z-index: 10
		background: rgba(255,255,255,.95)
		right: 0
		bottom: 0
		&_closed
			display: none
	&__popup-holder
		display: flex
		height: 100%
		justify-content: center
		align-items: center
	&__popup-close
		position: absolute
		right: 20px
		top: 35px
	&__popup-close-trigger
	    top: -5px
	    display: inline-block
	    position: relative
	    z-index: 10
	    width: 35px
	    background: #000
	    height: 3px
	    transition: all .2s ease-in-out
	    &_white
	      background: #fff
	      &:before, &:after
	        background: #fff
	    &_black
	      background: #000
	      &:before, &:after
	        background: #000
	    &:before
	      content: ''
	      position: absolute
	      width: 35px
	      height: 3px
	      background: #000
	      top: -10px
	      transition: all .3s ease-in-out
	    &:after
	      content: ''
	      position: absolute
	      width: 35px
	      height: 3px
	      top: 10px
	      transition: all .3s ease-in-out
	    &_active
	      transform: rotate(45deg)
	      &:before
	        transform: rotate(90deg) translateX(10px)
	      &:after
	        opacity: 0
</style>

<template>
	<div class="cart-wrapper">
		<header-nav nav-style="black"></header-nav>
		<div class="cart">
			<div class="cart__title" v-if="items.length">cart</div>
			<div class="cart__items">
				<div class="cart__item" v-for='item, index in items'>
					<div class="cart__delete" @click='deleteItem(index)'>
						<i class="fa fa-times" aria-hidden="true"></i>
					</div>
					<div class="cart__image">
						<img :src="item.image">
					</div>
					<div class="cart__name">{{item.name}}</div>
					<div class="cart__price">{{item.price}}</div>
					<div class="cart__status">{{item.status}}</div>
					<div class="cart__add-to-cart">add to cart</div>
				</div>
			</div>
			<div class="cart__no-items" v-if="!items.length">
				<div class="cart__no-items-text">Your cart is currently empty.</div>
			</div>
			<div class="cart__footer">
				<div class="cart__left-col">
					<div class="cart__text">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nulla est dignissimos deleniti, alias minus. Molestiae nostrum consequuntur modi adipisci laborum quis amet minima architecto quod, dolorum ducimus recusandae officiis, nobis veritatis magni aut nesciunt magnam laudantium quae alias est nulla aliquam ratione rem? Quis qui accusamus dolores quia consectetur, ut perspiciatis accusantium nostrum? Esse.
					</div>
					<div class="cart__menu">
						<footer-menu></footer-menu>
					</div>
				</div>
				<div class="cart__right-col">
					<div class="cart__follow">
						<follow></follow>
					</div>
				</div>
			</div>
			<div class="cart__sub-footer">
				<socials :color="'#cecece'"></socials>
				<div class="cart__pages">
					<div class="cart__page-wrapper">
						<div class="cart__page">Page 1</div>
					</div>
					<div class="cart__page-wrapper">
						<div class="cart__page">Page 2</div>
					</div>
					<div class="cart__page-wrapper">
						<div class="cart__page">Page 3</div>
					</div>
					<div class="cart__page-wrapper">
						<div class="cart__page">Page 4</div>
					</div>
					<div class="cart__page-wrapper">
						<div class="cart__page">Page 5</div>
					</div>
				</div>
			</div>
			<div class="cart__popup" :style="{display: popup === true ? 'block' : 'none'}">
				<div class="cart__popup-close" @click.prevent.stop="togglePopup()">
					<div class="cart__popup-close-trigger cart__popup-close-trigger_active"></div>
				</div>
				<div class="cart__popup-holder">
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
		this.items = this.$ls.get('cart');
	},
	methods: {
		deleteItem (index) {
			this.items.splice(index, 1);
			this.$ls.set('cart', this.items);
		},
		togglePopup () {
			this.popup = this.popup ? false : true;
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
.cart
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
			content: '\f07a'
			font-size: 4em
			color: gray
			font-family: 'FontAwesome'
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

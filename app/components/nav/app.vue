<template>
	<div class="nav">
		<div class="nav__left-side">
			<div class="box-menu box-menu_white">
				<ul class="box-menu__list">
					<li class="box-menu__item">
						<a href="#/" class="box-menu__link">home</a>
					</li>
					<li class="box-menu__item">
						<a href="#/product" class="box-menu__link">products</a>
					</li>
					<li class="box-menu__item">
						<a href="#/products" class="box-menu__link">product</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="nav__right-side">
			<div class="nav-logo">
				<img v-bind:src="logo">
			</div>
		</div>
	</div>
</template>

<script>
import './nav.sass';
import logo from '../index/logo.png';

export default {
	data () {
		return {
			logo: logo,
			items: []
		}
	}
}
</script>

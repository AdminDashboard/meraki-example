<template>
	<div class="phone-form" :class="formWrapperClasses">
		<div class="phone-form__trigger" v-on:click="toggleMenu"></div>
		<div :class="formClasses">
			<div class="phone-form__close" v-on:click="toggleMenu"></div>
			<form-component :formType="'phone'" :formDescription="formText"></form-component>
		</div>
	</div>
</template>

<script>
import Form from '../form/form.vue';

export default {
	data () {
		return {
			active: false,
			formText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt repudiandae accusantium ipsum, facilis odit culpa dolor a aliquid officiis, cum!'
		}
	},
	props: ['fixed'],
	computed: {
		formWrapperClasses () {
			const computedClasses = {
				'phone-form': true,
				'phone-form_fixed': this.fixed
			};

			return computedClasses;
		},
		formClasses () {
			const computedClasses = {
				'phone-form__form': true,
				'phone-form__form_active': this.active
			};

			return computedClasses;
		}
	},
	methods: {
		toggleMenu () {
			return this.active = this.active ? false : true;
		}
	},
	components: {
		'form-component': Form
	}
}

</script>

<style scoped lang='sass'>
	.phone-form
		&__trigger
			position: absolute
			bottom: 10px
			width: 40px
			height: 40px
			z-index: 10
			font-size: 2em
			right: 10px
			&:after
		      content: '\f095'
		      margin-left: 10px
		      display: inline-block
		      font-family: FontAwesome
		      transition: transform .3s ease-in-out
		&_fixed
			.phone-form__trigger
				position: fixed
		&__form
			position: fixed
			top: 10px
			bottom: 0
			padding: 20px
			box-sizing: border-box
			transition: .3s ease-in-out
			background: #fff
			z-index: 10
			transform: translateY(150%)
			box-shadow: 0 0 50px 1px rgba(0,0,0,.3)
			&_active
				transform: translateY(0)
		&__close
			top: 30px
			right: 10px
			display: inline-block
			cursor: pointer
			z-index: 10
			position: absolute
			width: 35px
			transform: rotate(45deg)
			height: 3px
			background: #000
			transition: all .3s ease-in-out
			&:before, &:after
				background: #000
			&:before
				content: ''
				position: absolute
				width: 35px
				height: 3px
				top: -10px
				transition: all .3s ease-in-out
			&:after
				content: ''
				position: absolute
				width: 35px
				height: 3px
				top: 10px
				transition: all .3s ease-in-out
			&:before
				transform: rotate(90deg) translateX(10px)
			&:after
				opacity: 0
</style>

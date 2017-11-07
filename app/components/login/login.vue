<template>
	<div class="login">
		<div class="login__title">register</div>
		<div class="login__subtitle">login</div>
		<form class="login___form">
			<form-input :passedLabel="'Name'"></form-input>
			<form-input :passedLabel="'Date of birth'"></form-input>
			<form-input :passedLabel="'Email address'"></form-input>
			<form-input :passedLabel="'Password'" :passedType="'password'"></form-input>
			<button type="submit" class="login__submit">Login</button>
			<form-check :passedLabel="'Remember me'"></form-check>
		</form>
		<button class="login__button">login with facebook</button>
		<button class="login__button">login with google</button>
	</div>
</template>

<script>
import Input from '../form-constructor/input/input.vue';
import Checkbox from '../form-constructor/checkbox/checkbox.vue';
import fontAwesomeIcons from '../utils/fontAwesomeIcons.js';

export default {
	components: {
		'form-input': Input,
		'form-check': Checkbox
	},
	methods: {
		getClasses (type) {
			return ['fa', fontAwesomeIcons[type]];
		}
	}
}

</script>

<style scoped lang='sass'>
.login
	width: 300px
	font-family: 'Futura PT'
	&__title
		text-transform: uppercase
		text-align: center
		font-size: 3.5em
		font-family: 'Ailerons'
	&__subtitle
		text-transform: uppercase
		text-align: center
	&__socials
		margin-top: 20px
		color: gray
		a
			text-decoration: none
			margin-right: 5px
			color: gray
			font-size: 1.1em
			cursor: pointer
	&__submit
		background: none
		border: none
		padding: 0
		font-family: 'Futura PT'
		font-size: 1.2em
		margin-top: 20px
		margin-bottom: 10px
		cursor: pointer
		text-transform: uppercase
		&:focus
			outline: none
	&__button
		background: #bdbdbd
		display: block
		color: #fff
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

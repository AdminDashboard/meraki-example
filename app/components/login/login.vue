<template>
	<div class="login">
		<div class="login__title">Log in</div>
		<form class="login___form">
			<form-input :passedLabel="'Your login'"></form-input>
			<form-input :passedLabel="'Your password'" :passedType="'password'"></form-input>
			<div class="login__socials">
				or login through these:
				<a href="#"><i :class="getClasses('facebook')"></i></a>
				<a href="#"><i :class="getClasses('google')"></i></a>
				<a href="#"><i :class="getClasses('twitter')"></i></a>
			</div>
			<button type="submit" class="login__submit">Submit</button>
		</form>
	</div>
</template>

<script>
import Input from '../form-constructor/input/input.vue';
import fontAwesomeIcons from '../utils/fontAwesomeIcons.js';

export default {
	components: {
		'form-input': Input
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
		font-size: 1.2em
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
		margin-top: 30px
		cursor: pointer
		text-transform: uppercase
		&:focus
			outline: none
</style>

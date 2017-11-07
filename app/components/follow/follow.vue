<template>
	<div class="follow">
		<div class="follow__title">Follow</div>
		<form class="follow___form">
			<form-input :passedLabel="'Your email address'"></form-input>
			<button type="submit" class="follow__submit">Sign up</button>
		</form>
	</div>
</template>

<script>
import Input from '../form-constructor/input/input.vue';

export default {
	components: {
		'form-input': Input
	}
}

</script>

<style scoped lang='sass'>
.follow
	width: 300px
	font-family: 'Futura PT'
	&__title
		text-transform: uppercase
		font-size: 1.2em
	&__submit
		background: none
		border: none
		cursor: pointer
		padding: 0
		font-family: 'Ailerons'
		font-size: 1.5em
		margin-top: 20px
		text-transform: uppercase
		transition: all .2s ease-in-out
		&:focus
			outline: none
		&:hover
			opacity: .5
</style>

<template>
	<div class="coming-soon-form">
		<div class="coming-soon-form__title">Remind me when it's live:</div>
		<input-form v-model="name" :passedLabel="'Name'"></input-form>
		<input-form v-model="email" :passedLabel="'Email'"></input-form>
		<input-form v-model="phone" :passedLabel="'Phone'"></input-form>
		<div class="coming-soon-form__description">* we won't send any spam towards your way</div>
		<div class="coming-soon-form__checkbox">
			<input type="checkbox" name="notif"> Remind me via Rich Notifications
		</div>
		<button type="submit" class="coming-soon-form__submit">submit</button>
	</div>
</template>

<script>
import Input from '../../form-constructor/input/input.vue';

export default {
	data () {
		return {
			name: null,
			email: null,
			phone: null,
			notifications: null
		}
	},
	components: {
		'input-form': Input
	}
}

</script>

<style scoped lang="sass">
.coming-soon-form
	font-family: 'Futura PT'
	&__title
		font-size: 2em
	&__description
		margin-top: 20px
	&__checkbox
		margin-top: 10px
	&__submit
		margin-top: 20px
		padding: 0
		background: none
		font-size: .9em
		border: none
		text-transform: uppercase
		&:focus
			outline: none
			cursor: pointer
</style>

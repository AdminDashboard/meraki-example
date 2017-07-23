<template>
	<div class="form-wrapper">
		<form action="" class="form">
			<div class="form__type-fields">
				<label class="form__type-group">
					<input v-model="type" type="radio" value="order" name="type">
					<span class="form__type-label">custom order</span>
				</label>
				<label class="form__type-group">
					<input v-model="type" type="radio" value="info" name="type">
					<span class="form__type-label">request more info</span>
				</label>
			</div>
			<div class="form__fields">
				<label class="form__group form__group_name">
					<input required type="text" v-model="name" class="form__input" v-bind:class="{'form__input_has_value': name}" name="name">
					<span class="form__label">Name</span>
				</label>
				<label class="form__group form__group_email">
					<input required type="email" v-model="email" class="form__input" v-bind:class="{'form__input_has_value': email}" name="email">
					<span class="form__label">Email</span>
				</label>
				<label class="form__group form__group_phone">
					<input required type="phone" v-model="phone" class="form__input" v-bind:class="{'form__input_has_value': phone}" name="phone">
					<span class="form__label">Phone</span>
				</label>
				<label class="form__group form__group_message">
					<input required type="text" v-model="message" class="form__input" v-bind:class="{'form__input_has_value': message}" name="message">
					<span class="form__label">Message</span>
				</label>
			</div>
			<div class="form__check-buttons">
				<label class="form__check-group">
					<span class="form__check-label">i accept the processing of personal data</span>
					<span class="form__check">
						<input required type="checkbox" name="processing">
					</span>
				</label>
				<label class="form__check-group">
					<span class="form__check-label">i'm human</span>
					<span class="form__check">
						<input required type="checkbox" name="human">
					</span>
				</label>
			</div>
			<button type="submit" v-on:click="submit" class="form__submit">Send</button>
		</form>
	</div>
</template>

<script>
import './form.sass';

export default {
	data () {
		return {
			type: 'order',
			name: null,
			email: null,
			phone: null,
			message: null
		}
	},
	methods: {
		submit (e) {
			// e.preventDefault();
		}
	}
}
</script>

<template>
	<div class="form-wrapper" v-bind:class="wrapperMod">
		<form class="form">
			<div v-if="!formType">
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
			</div>
			<div v-if="formType === 'phone'">
				<div class="form__type-fields">
					<label class="form__type-group">
						<input v-model="type" type="radio" value="contact" name="type">
						<span class="form__type-label">contact us</span>
					</label>
					<label class="form__type-group">
						<input v-model="type" type="radio" value="order" name="type">
						<span class="form__type-label">custom order</span>
					</label>
				</div>
			</div>
			<div v-if="formDescription" class="form__description">{{formDescription}}</div>
			<div class="form__fields">
				<label class="form__group form__group_name" v-bind:class="{'form__group_invalid': !name}">
					<input required type="text" v-model="name" class="form__input" v-bind:class="{'form__input_has_value': name}" name="name">
					<span class="form__label">Name</span>
				</label>
				<label class="form__group form__group_email" v-bind:class="{'form__group_invalid': !email}">
					<input required type="email" v-model="email" class="form__input" v-bind:class="{'form__input_has_value': email}" name="email">
					<span class="form__label">Email</span>
				</label>
				<label class="form__group form__group_phone" v-bind:class="{'form__group_invalid': !phone}">
					<input required type="phone" v-model="phone" class="form__input" v-bind:class="{'form__input_has_value': phone}" name="phone">
					<span class="form__label">Phone</span>
				</label>
				<label class="form__group form__group_message" v-bind:class="{'form__group_invalid': !message}">
					<input required type="text" v-model="message" class="form__input" v-bind:class="{'form__input_has_value': message}" name="message">
					<span class="form__label">Message</span>
				</label>
			</div>
			<div v-if="confirm" class="form__check-buttons">
				<label class="form__check-group" v-bind:class="{'form__group_check-invalid': !processing}">
					<span class="form__check-label">i accept the processing of personal data</span>
					<span class="form__check">
						<input required v-model="processing" type="checkbox" name="processing">
					</span>
				</label>
				<label class="form__check-group" v-bind:class="{'form__group_check-invalid': !human}">
					<span class="form__check-label">i'm human</span>
					<span class="form__check">
						<input required v-model="human" type="checkbox" name="human">
					</span>
				</label>
			</div>
			<button type="submit"
				v-on:click.stop="submit"
				class="form__submit">Send</button>
		</form>
		<div class="form__dialog">
			<div class="form__message">
				Your message has been successfuly sent
			</div>
		</div>
	</div>
</template>

<script>
import './form.sass';
import fingerprint from '../index/f2.png';

export default {
	data () {
		return {
			type: 'order',
			name: null,
			email: null,
			phone: null,
			message: null,
			human: null,
			processing: null,
			fingerprint: fingerprint,
			invalidationCheck: false,
			sentMod: false
		}
	},
	props: ['confirm' , 'formType', 'formDescription'],
	computed: {
		isValid() {
			let valid = true;

			if (!this.name || !this.email || !this.phone || !this.message) {
				valid = false;
			}

			if (this.confirm && (!this.human || !this.processing)) {
				valid = false;
			}

			return valid;
		},
		wrapperMod () {
			let defaultMods = {
				'form-wrapper_check': this.invalidationCheck,
				'form-wrapper_sent': this.sentMod
			};

			let computedMods = defaultMods;

			if (this.formType) {
				computedMods = Object.assign(defaultMods, {
					['form-wrapper_' + this.formType]: true
				})
			}

			return computedMods;
		}
	},
	methods: {
		clearData () {
			this.name
				= this.email
				= this.phone
				= this.message
				= this.human
				= this.processing
				= null;
		},
		submit (e) {
			e.preventDefault();
			this.invalidationCheck = true;

			if (this.isValid) {
				this.sentMod = true;
				setTimeout(() => {
					this.sentMod = false;
					this.invalidationCheck = false;
					this.clearData();
				}, 3000);
			}
		}
	}
}
</script>

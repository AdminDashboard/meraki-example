<template>
	<div class="settings">
		<h1>settings</h1>
		<h2>about:</h2>
		<textarea v-model="userText"></textarea>
		<div class="settings__logo">
			<form-input v-model="logo" :passedLabel="'Logo'" :passedValue="logo"></form-input>
			<img :src="logo">
		</div>
		<div>
			<button type="submit" v-on:click.prevent.stop="submit">Save</button>
		</div>
	</div>
</template>

<script>
import db from '../../database-controller/database-controller.js';
import Input from '../../form-constructor/input/input.vue';

export default {
	firebase ()  {
		return {
			settings: {
				source: db.ref('general'),
				readyCallback: function () {
					this.loaded = true;
				}
			}
		}
	},
	data () {
		return {
			userText: null,
			loaded: false,
			logo: null
		};
	},
	watch: {
		loaded () {
			this.userText = this.aboutText;
			this.logo = this.logoUrl;
		}
	},
	computed: {
		aboutItem () {
			return this.settings.length && this.settings[0];
		},
		logoItem () {
			return this.settings.length && this.settings[1];
		},
		aboutText () {
			return this.aboutItem && this.aboutItem.text;
		},
		logoUrl () {
			return this.logoItem && this.logoItem.url;
		}
	},
	methods: {
		editAbout () {
			if (!this.aboutItem) {
				return;
			}

			this.$firebaseRefs.settings.child(this.aboutItem['.key']).set({
				text: this.userText
			});
		},
		editLogo () {
			if (!this.logoItem) {
				return;
			}

			this.$firebaseRefs.settings.child(this.logoItem['.key']).set({
				url: this.logo
			});
		},
		submit () {
			this.editAbout();
			this.editLogo();
		}
	},
	components: {
		'form-input': Input
	}
}
</script>

<style scoped lang="sass">
textarea
	width: 400px
	height: 200px

.settings
	&__logo
		width: 400px
		img
			max-width: 200px
</style>

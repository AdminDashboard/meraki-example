<template>
	<div class="settings">
		<h1>settings</h1>
		<h2>about:</h2>
		<textarea v-model="aboutText"></textarea>
	</div>
</template>

<script>
import db from '../../database-controller/database-controller.js';

export default {
	firebase ()  {
		return {
			settings: db.ref('general')
		}
	},
	data () {
		return {};
	},
	computed: {
		aboutText () {
			return this.settings.length && this.settings[0].text;
		}
	}
}
</script>

<style scoped lang="sass">
textarea
	width: 400px
	height: 200px
</style>

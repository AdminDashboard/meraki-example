<template>
	<div class="admin-socials">
		<div class="admin-socials__title">current social items:</div>
		<div class="admin-socials__items">
			<div class="admin-socials__item" v-for='social in socials'>
				<div class="admin-socials__item-title">
					<i :class="getClasses(social.type)" aria-hidden="true"></i>
				</div>
				<div class="admin-socials__item-url">
					<input-form :passedLabel='"url"' :passedValue='social.url'></input-form>
				</div>
			</div>
		</div>

		<div class="admin-socials__new-button" v-if="!edit">
			<button v-on:click="toggleEdit">Add item</button>
		</div>

		<div class="admin-socials__new" v-if="edit">
			<div class="admin-socials__title">adding new item:</div>
			<div class="admin-socials__new-item">
				<div class="admin-socials__new-item-title">
					<select v-model='type'>
						<option v-for="type in types">{{type.split('-')[1]}}</option>
					</select>
				</div>
				<div class="admin-socials__new-item-url">
					<input-form v-model="url" :passedLabel='"url"'></input-form>
				</div>
			</div>
			<div class="admin-socials__new-controls">
				<button :disabled="!type || !url" v-on:click="save">save</button>
				<button v-on:click="cancel">cancel</button>
			</div>
		</div>
	</div>
</template>

<script>
import Input from '../../../form-constructor/input/input.vue';

const fontAwesomeIcons = {
	facebook: 'fa-facebook-official',
	instagram: 'fa-instagram',
	twitter: 'fa-twitter',
	google: 'fa-google-plus',
	pinterest: 'fa-pinterest-square'
};

export default {
	data () {
		return {
			socials: [
				{
					type: 'facebook',
					url: 'facebook-url'
				},
				{
					type: 'instagram',
					url: 'instagram-url'
				}
			],
			types: fontAwesomeIcons,
			type: null,
			url: null,
			edit: false
		}
	},
	methods: {
		getClasses (type) {
			return ['fa', this.types[type]];
		},

		toggleEdit () {
			this.edit = true;
		},

		cancel () {
			this.edit = false;
			this.url = null;
			this.type = null;
		},

		save () {
			this.socials.push({
				type: this.type,
				url: this.url
			});

			this.cancel();
		}
	},
	components: {
		'input-form': Input
	}
}
</script>

<style scoped lang='sass'>
.admin-socials
	width: 500px
	&__item
		width: 300px
		display: flex
		border: 1px solid lighten(lightgray, 10%)
		border-radius: 5px
		box-sizing: border-box
		align-items: baseline
		padding: 0 5px
		margin: 5px 0
		cursor: pointer
		pointer-events: none
	&__item-title
		font-size: 45px
		margin-right: 10px
	&__item-url
		width: 100%
	&__new-item
		display: flex
		align-items: baseline
	&__new-controls
		margin-top: 10px
</style>

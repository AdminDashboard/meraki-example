<template>
	<label class="input">
		<input required type="text" v-model="value" class="input__field" v-bind:class="{'input_has_value': value}">
		<span class="input__label">{{label}}</span>
	</label>
</template>

<script>
export default {
	data () {
		return {
			value: null,
			label: null
		}
	},
	props: ['passedValue', 'passedLabel'],
	watch: {
		value () {
			this.$emit('input', this.value);
		}
	},
	created: function() {
		this.value = this.passedValue;
		this.label = this.passedLabel;
	}
}
</script>

<style scoped lang="sass">
.input
	position: relative
	border-bottom: 1px solid #ccc
	&__field
		box-sizing: border-box
		width: 100%
		background: none
		border: none
		font-size: .8em
		&:focus
			outline: none
			+ .input__label
				transform: translateY(-20px)
				font-size: .8em
	&_has_value
		+ .input__label
			transform: translateY(-20px)
			font-size: .8em
	&__label
		position: absolute
		top: 0px
		font-family: 'Futura PT'
		color: #ccc
		left: 5px
		font-size: .9em
		transition: transform .3s ease-in-out
</style>

<template>
	<div class="welcome">
		<div class="welcome__logo">
			<img :src="aboutLogo" alt="">
		</div>
		<div class="welcome__tap">Tap into uniqness</div>
	</div>
</template>

<script>
import aboutLogo from './../logo-2.png';

export default {
	data () {
		return {
			aboutLogo: aboutLogo
		}
	}
}
</script>

<style lang='sass'>
	.welcome
		width: 600px
		margin: 0 auto
		padding: 12% 0
		display: flex
		box-sizing: border-box
		flex-wrap: wrap
		text-align: center
		align-items: center
		height: 100%
		&__logo
			width: 100%
			img
				width: 100%
		&__tap
			text-decoration: center
			width: 100%
			color: #000
			text-transform: uppercase
			font-family: 'Futura pt'
			font-size: 2.6em
</style>

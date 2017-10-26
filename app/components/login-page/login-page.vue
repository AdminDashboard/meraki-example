<template>
	<div class="login-page">
		<header-nav nav-style="black"></header-nav>
		<div class="login-page__form">
			<login-form></login-form>
		</div>
	</div>
</template>

<script>
import Nav from '../nav/nav.vue';
import LoginForm from '../login/login.vue';

export default {
	components: {
		'header-nav': Nav,
		'login-form': LoginForm
	}
}
</script>

<style scoped lang='sass'>
.login-page
	margin: 100px 20px 20px 20px
	&__form
		width: 300px
		margin: 0 auto
		border: 1px solid lightgray
		padding: 10px
</style>

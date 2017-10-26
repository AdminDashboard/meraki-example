import 'normalize.css';
import Vue from 'vue';
import VueFire from 'vuefire';
import VueRouter from 'vue-router';
import Home from './home.vue';
import MobileHome from './home-mobile/home-mobile.vue';
import Products from '../products/products.vue';
import Product from '../product/product.vue';
import Admin from '../admin/admin.vue';
import Wishlist from '../wishlist/wishlist.vue';
import LoginPage from '../login-page/login-page.vue';
import 'font-awesome/css/font-awesome.css';
import './fonts/fonts.sass';
import isMobile from '../utils/mobile-detect';
import VueLocalStorage from 'vue-ls';

const NotFound = {template: '<p>Page not found</p>'};

const routes = [
  {path: '/', component: isMobile() ? MobileHome : Home},
  {path: '/products', component: Products, props: {depth: null}},
  {path: '/products/:cat', component: Products, props: {depth: 'super'}},
  {path: '/products/:cat/items', component: Products, props: {depth: 'products'}},
  {path: '/products/:cat/:sub/items', component: Products, props: {depth: 'sub'}},
  {path: '/product/:item', component: Product},
  {path: '/product', component: Product},
  {path: '/admin', component: Admin},
  {path: '/login', component: LoginPage},
  {path: '/wishlist', component: Wishlist}
];

const VueLocalStorageOptions = {
  namespace: 'vuejs__'
};

Vue.use(VueFire);
Vue.use(VueRouter);
Vue.use(VueLocalStorage, VueLocalStorageOptions);

const router = new VueRouter({routes});

new Vue({
	el: '#app',
	router,
	mounted () {
		if (isMobile()) {
			document.addEventListener('click', event => {
				const xPosition = event.clientX;
				const yPosition = event.clientY;

				const tapImage = document.createElement('div');

				tapImage.className = 'mouse-tap';
				tapImage.style.top = yPosition + 'px';
				tapImage.style.left = xPosition + 'px';

				document.getElementById('app').appendChild(tapImage);

				setTimeout(() => {
					tapImage.remove();
				}, 200);
			});
		}
	}
});

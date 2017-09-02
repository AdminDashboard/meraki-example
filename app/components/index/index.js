import 'normalize.css';
import Vue from 'vue';
import VueFire from 'vuefire';
import VueRouter from 'vue-router';
import $ from 'jquery';
import Home from './home.vue';
import MobileHome from './home-mobile/home-mobile.vue';
import Products from '../products/products.vue';
import Product from '../product/product.vue';
import Admin from '../admin/admin.vue';
import 'font-awesome/css/font-awesome.css';
import './fonts/fonts.sass';

window.$ = window.jQuery = $;

let isMobile = false;

if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	isMobile = true;
}

const NotFound = {template: '<p>Page not found</p>'};

const routes = [
  {path: '/', component: isMobile ? MobileHome : Home},
  {path: '/products', component: Products, props: {depth: null}},
  {path: '/products/:cat', component: Products, props: {depth: 'super'}},
  {path: '/products/:cat/items', component: Products, props: {depth: 'products'}},
  {path: '/products/:cat/:sub/items', component: Products, props: {depth: 'sub'}},
  {path: '/product/:item', component: Product},
  {path: '/product', component: Product},
  {path: '/admin', component: Admin}
];

Vue.use(VueFire);
Vue.use(VueRouter);

const router = new VueRouter({routes});

new Vue({
  el: '#app',
  router
});

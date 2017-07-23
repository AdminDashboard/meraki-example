import 'normalize.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';
import Home from './home.vue';
import Products from '../products/products.vue';
import Product from '../product/product.vue';
import 'font-awesome/css/font-awesome.css';
import './fonts/fonts.sass';

window.$ = window.jQuery = $;

const NotFound = { template: '<p>Page not found</p>' }

const routes = [
  {path: '/', component: Home},
  {path: '/products', component: Products},
  {path: '/product', component: Product}
];

Vue.use(VueRouter);

const router = new VueRouter({routes});

new Vue({
  el: '#app',
  router
});

import 'normalize.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';
import Home from './app.vue';
import Products from '../products/app.vue';

window.$ = window.jQuery = $;

const NotFound = { template: '<p>Page not found</p>' }

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products }
];

Vue.use(VueRouter);

const router = new VueRouter({routes});

new Vue({
  el: '#app',
  router
});

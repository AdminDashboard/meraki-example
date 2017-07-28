import Firebase from 'firebase';

const config = {
	apiKey: "AIzaSyBkzYfE9ZCd0dg93pHgjctTimkXsdbLkGk",
	authDomain: "meraki-test-eb979.firebaseapp.com",
	databaseURL: "https://meraki-test-eb979.firebaseio.com",
	projectId: "meraki-test-eb979",
	storageBucket: "meraki-test-eb979.appspot.com",
	messagingSenderId: "142705752674"
};

let firebase = Firebase.initializeApp(config);
let db = firebase.database();

export default db;

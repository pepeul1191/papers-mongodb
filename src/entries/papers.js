import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../stylesheets/styles.css';
import App from '../components/layouts/Papers.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
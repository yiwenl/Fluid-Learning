// addControls.js

import Settings from '../Settings';
import Config from '../Config';

const addControls = (scene) => {
	setTimeout(()=> {

		const controls = {
			reset:()=>{
				window.location.href = window.location.origin;
			}
		}


		gui.add(controls, 'reset').name('Reset Default');

	}, 200);
}


export default addControls;
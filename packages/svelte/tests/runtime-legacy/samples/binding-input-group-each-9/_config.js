import { flushSync } from 'svelte';
import { test } from '../../test';

// https://github.com/sveltejs/svelte/issues/7633
export default test({
	test({ assert, target, component }) {
		let inputs = target.querySelectorAll('input');

		assert.equal(inputs[0].checked, true);
		assert.equal(inputs[1].checked, false);
		assert.equal(inputs[2].checked, false);

		component.moveDown(0);
		flushSync();
		component.moveDown(1);
		flushSync();

		assert.htmlEqual(
			target.innerHTML,
			`
				<div class="item">
					b <label><input name="current" type="radio" value="b"> current</label>
				</div>
				<div class="item">
					c <label><input name="current" type="radio" value="c"> current</label>
				</div>
				<div class="item">
					a <label><input name="current" type="radio" value="a"> current</label>
				</div>
			`
		);

		// after shifting order, should still keep the correct radio checked
		assert.equal(inputs[0].checked, false);
		assert.equal(inputs[1].checked, false);
		assert.equal(inputs[2].checked, true);

		component.current = 'b';
		flushSync();

		assert.equal(inputs[0].checked, true);
		assert.equal(inputs[1].checked, false);
		assert.equal(inputs[2].checked, false);

		component.moveDown(1);
		flushSync();

		// after shifting order, should still keep the correct radio checked
		inputs = target.querySelectorAll('input');
		assert.equal(inputs[0].checked, true);
		assert.equal(inputs[1].checked, false);
		assert.equal(inputs[2].checked, false);
	}
});

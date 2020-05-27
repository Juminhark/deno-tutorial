import { sum } from './sample.js';
import { assertEquals } from './deps.js';

Deno.test('Testing sum', () => {
	assertEquals(sum(1, 2), 3);
});

import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { setupCounter } from './counter';

describe('counter increments when clicked', () => {
  const dom = new JSDOM(`<!DOCTYPE html><html><body>
    <button id="counter" type="button"></button>
</body></html>`);
  const document = dom.window.document;

  const counter = document.querySelector<HTMLButtonElement>('#counter')!;
  setupCounter(counter);

  it('initial state', () => {
    expect(counter.textContent).toBe('count is 0');
  });

  it('first click', () => {
    counter.click();
    expect(counter.textContent).toBe('count is 1');
  });

  it('double click', () => {
    counter.click();
    counter.click();
    expect(counter.textContent).toBe('count is 3');
  });
});

describe('Arithmetic test', () => {
  it('1 + 1 equals 2', () => {
    expect(1 + 1).toBe(2);
  });

  it('2 * 2 equals 4', () => {
    expect(2 * 2).toBe(4);
  });
});

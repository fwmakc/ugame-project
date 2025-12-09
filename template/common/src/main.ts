import './assets/style.css';

import { APP } from './app';
import splashScreen from './assets/splashscreen.svg';
import { setupCounter } from './counter';

console.log('🚀 Application is launched', APP);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://github.com/fwmakc/ugame" target="_blank">
      <img src="${splashScreen}" class="logo" alt="UGame logo" />
    </a>
    <h1>UGame ❤️ Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="card">${JSON.stringify(APP, null, ' ')}</div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

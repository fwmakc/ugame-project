import './assets/style.css';
import { setupCounter } from './counter';
import splashScreen from '/splashscreen.svg';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://github.com/fwmakc/ugame" target="_blank">
      <img src="${splashScreen}" class="logo" alt="UGame logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="card" id="license"></div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

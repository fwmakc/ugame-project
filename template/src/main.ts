import './assets/style.css';
import { setupCounter } from './counter';
// import { createFile } from './create';
// import { readFile } from './read';
import typescriptLogo from '/typescript.svg';
import viteLogo from '/vite.svg';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <div class="card" id="license"></div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

/*
const licenseContent = await readFile('license.txt');
const license = document.querySelector<HTMLButtonElement>('#license');

if (license && licenseContent) {
  license.innerHTML = licenseContent;
}

const licenseText = `MIT License

Copyright (c) 2024 My Electron App

Permission is hereby granted, free of charge...`;

createFile(`${Date.now()}.txt`, licenseText);
*/

import type { ILibraries } from '../interfaces/libraries.interface';
import type { ILibrariesParams } from '../interfaces/libraries_params.interface';
import { multiselect } from '../prompts/multiselect.prompt';

export async function preparePackageLibraries(): Promise<ILibraries> {
  const options = ['electron', '  builder', '  forge', 'capacitor', 'tauri'];

  const libraries = await multiselect(
    'Select extended project libraries?',
    options,
    true,
  );

  const devDependencies: ILibrariesParams = {};
  const dependencies: ILibrariesParams = {};
  const scripts: ILibrariesParams = {};
  let main: string = '';

  if (libraries.includes('capacitor')) {
    devDependencies['@capacitor/android'] = '^7.4.4';
    devDependencies['@capacitor/cli'] = '^7.4.4';
    devDependencies['@capacitor/core'] = '^7.4.4';
  }

  if (libraries.includes('electron')) {
    main = 'electron/main.ts';

    scripts['electron:dev'] = 'electron .';

    devDependencies['@electron-forge/cli'] = '^7.10.2';
    devDependencies['@electron/fuses'] = '^1.8.0';
    devDependencies['@types/electron-squirrel-startup'] = '^1.0.2';
    devDependencies['electron'] = '^39.2.2';

    dependencies['electron-squirrel-startup'] = '^1.0.1';

    if (libraries.includes('builder')) {
      scripts['electron:build'] =
        'electron-builder --config electron-builder.config.js';

      devDependencies['electron-builder'] = '^26.0.12';
      devDependencies['electron-builder-squirrel-windows'] = '^26.0.12';
    }

    if (libraries.includes('forge')) {
      scripts['electron:make'] = 'electron-forge make';
      scripts['electron:start'] = 'electron-forge start';
      scripts['electron:package'] = 'electron-forge package';

      devDependencies['@electron-forge/cli'] = '^7.10.2';
      devDependencies['@electron-forge/maker-deb'] = '^7.10.2';
      devDependencies['@electron-forge/maker-dmg'] = '^7.10.2';
      devDependencies['@electron-forge/maker-rpm'] = '^7.10.2';
      devDependencies['@electron-forge/maker-squirrel'] = '^7.10.2';
      devDependencies['@electron-forge/maker-zip'] = '^7.10.2';
      devDependencies['@electron-forge/plugin-auto-unpack-natives'] = '^7.10.2';
      devDependencies['@electron-forge/plugin-fuses'] = '^7.10.2';
    }
  }

  if (libraries.includes('tauri')) {
    scripts['tauri:build'] = 'tauri build';
    scripts['tauri:dev'] = 'tauri dev';
    scripts['tauri:init'] = 'tauri init --force';

    devDependencies['@tauri-apps/cli'] = '^2.9.5';
  }

  return {
    devDependencies,
    dependencies,
    scripts,
    main,
    libraries,
  };
}

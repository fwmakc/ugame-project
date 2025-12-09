import type { ILibraries } from '../interfaces/libraries.interface';
import type { ILibrariesParams } from '../interfaces/libraries_params.interface';
import { multiselect } from '../prompts/multiselect.prompt';

export async function librariesPackage(): Promise<ILibraries> {
  const options = ['electron', '  builder', '  forge', 'capacitor', 'tauri'];

  const libraries = await multiselect(
    'Select extended project libraries',
    options,
    true,
  );

  const devDependencies: ILibrariesParams = {};
  const dependencies: ILibrariesParams = {};
  const scripts: ILibrariesParams = {};
  let main: string = '';

  if (libraries.includes('capacitor')) {
    scripts['capacitor:android'] = 'cap add android';
    scripts['capacitor:ios'] = 'cap add ios';
    scripts['capacitor:assets'] =
      'capacitor-assets generate --android --ios --assetPath public --androidProject build/capacitor/android --iosProject build/capacitor/ios/App';
    scripts['capacitor:make'] =
      'npm run build && cap copy && npm run capacitor:assets';
    scripts['capacitor:dev'] =
      'cd build/capacitor/android && gradlew assembleDebug';
    scripts['capacitor:build'] =
      'cd build/capacitor/android && gradlew assembleRelease';

    devDependencies['@capacitor/android'] = '^7.4.4';
    devDependencies['@capacitor/assets'] = '^3.0.5';
    devDependencies['@capacitor/cli'] = '^7.4.4';
    devDependencies['@capacitor/core'] = '^7.4.4';
    devDependencies['@capacitor/ios'] = '^7.4.4';
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
    scripts['tauri:init'] = 'tauri init --force';
    scripts['tauri:dev'] = 'tauri dev --config tauri.config.json';
    scripts['tauri:build'] = 'tauri build --config tauri.config.json';

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

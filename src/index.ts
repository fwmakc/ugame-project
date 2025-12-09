import path from 'path';

import { copyProject } from './helpers/copy_project.helper';
import { error } from './helpers/error.helper';
import { installDependencies } from './helpers/install_dependencies.helper';
import { makeTargetFolder } from './helpers/make_target_folder.helper';
import { print } from './helpers/print.helper';
import { librariesPackage } from './package/libraries.package';
import { updatePackage } from './package/update.package';
import { valuesPackage } from './package/values.package';

async function main(): Promise<void> {
  print([
    '     ___',
    '    /__//___      ______',
    '     ___/  //    /     //',
    '    /     //    /     //   .:::.  .:::.  .:.   .:. .:::.',
    '   /_____//    /     //   ::     ::  :: :::: .::: ::  ::',
    "  ______      /     //   ::  :: :::::: :: ::' :: :::::'",
    " /__   //____/  ___//    ':::' ::  :: ::     ::  '::::'",
    '   /___________//',
  ]);

  print([
    '🚀 Creating UGame Project',
    '(will be installed in project name folder)',
    '',
    '⚠️  keys:',
    'arrows - select',
    '[enter] - confirm',
    '[esc] - abort and exit',
    '[space] - switch or clear',
    '[tab] - edit default value',
  ]);

  try {
    const packageValues = await valuesPackage();
    const packageLibraries = await librariesPackage();

    const projectFolder = path.resolve(packageValues.name);
    const sourceFolder = path.resolve(__dirname, '..');

    // Проверяем и создаем каталог проекта
    await makeTargetFolder(projectFolder);

    // Копируем файлы проекта
    await copyProject(sourceFolder, projectFolder, packageLibraries.libraries);

    // Обновляем package.json
    updatePackageJson(projectFolder, packageValues, packageLibraries);

    print(['✅ Project created successfully!']);

    // Запрашиваем установку зависимостей
    await installDependencies(projectFolder);

    print([
      'Run your game now:',
      `📁 cd ${packageValues.name}`,
      '📦 npm install',
      '📦 npm run build',
      '⭐ npm run preview',
      '',
      'Happy coding! 👋',
    ]);
  } catch (err) {
    error('Error creating project', err);
  }
}

main().catch(console.error);

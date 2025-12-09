import path from 'path';

import { copyFile } from '../helpers/copy_file.helper';
import { copyRecursive } from '../helpers/copy_recursive.helper';

export async function copyProject(
  sourceFolder: string,
  targetFolder: string,
  libraries: string[],
): Promise<void> {
  // Копируем файлы из template
  copyRecursive(path.join(sourceFolder, 'template', 'common'), targetFolder);

  if (libraries.includes('capacitor')) {
    copyRecursive(
      path.join(sourceFolder, 'template', 'capacitor'),
      targetFolder,
    );
  }

  if (libraries.includes('electron')) {
    copyRecursive(
      path.join(sourceFolder, 'template', 'electron'),
      targetFolder,
    );

    if (libraries.includes('builder')) {
      copyRecursive(
        path.join(sourceFolder, 'template', 'electron-builder'),
        targetFolder,
      );
    }

    if (libraries.includes('forge')) {
      copyRecursive(
        path.join(sourceFolder, 'template', 'electron-forge'),
        targetFolder,
      );
    }
  }

  if (libraries.includes('tauri')) {
    copyRecursive(path.join(sourceFolder, 'template', 'tauri'), targetFolder);
  }

  // Копируем остальные файлы
  copyFile('.gitignore', sourceFolder, targetFolder);
  copyFile('LICENSE', sourceFolder, targetFolder);
  copyFile('README.md', sourceFolder, targetFolder);
}

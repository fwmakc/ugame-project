import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

import { error } from '../helpers/error.helper';
import type { IPackage } from '../interfaces/package.interface';
import type { IPackageAuthor } from '../interfaces/package_author.interface';

export function updateTauri(
  targetDir: string,
  fields: IPackage,
  libraries: string[],
): void {
  const tauriConfigPath = path.join(targetDir, 'tauri.config.json');

  if (!libraries.includes('tauri') || !existsSync(tauriConfigPath)) {
    return;
  }

  const tauriConfig = JSON.parse(readFileSync(tauriConfigPath, 'utf8'));

  // Обновляем поля
  tauriConfig.productName = fields.name;
  tauriConfig.version = fields.version;

  const author = String(
    (fields.author as IPackageAuthor)?.name || fields.author || '',
  )
    .replaceAll(' ', '')
    .replace(/[\W_]+/giu, '-');
  const name = String(fields.name || '').replace(/[\W_]+/giu, '-');

  tauriConfig.identifier = `com.${author}.${name}`;
  tauriConfig.app.windows.title = fields.productName;

  try {
    writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2));
  } catch (err) {
    error('Error write tauri.config.json', err);
  }
}

import type { ILibrariesParams } from './libraries_params.interface';

export interface ILibraries {
  devDependencies: ILibrariesParams;
  dependencies: ILibrariesParams;
  scripts: ILibrariesParams;
  main: string;
  libraries: string[];
}

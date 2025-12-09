import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import packageJson from './package.json' with { type: 'json' };

const author = packageJson.author?.name || packageJson.author;
const name  = packageJson.name.replaceAll('-', '_');

export default {
  outDir: 'build/electron-forge/${version}',
  packagerConfig: {
    appBundleId: `com.${author}.${name}`,
    icon: 'public/app.ico',
    asar: true,
    asarUnpack: [
      'resources/**',
    ],
    extraResource: [
      'public/app.ico',
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // frameworkVersion: 'net461',
        iconUrl: 'file:///',
        setupIcon: 'public/app.ico',
        loadingGif: 'public/splash.png',
        createDesktopShortcut: true,
        createStartMenuShortcut: true,

        perMachine: false,
        noMsi: true,
        anonymizeUser: false,
        remoteReleases: '',
        remoteToken: '',
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: 'public/splash.png',
        format: 'ULFO',
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

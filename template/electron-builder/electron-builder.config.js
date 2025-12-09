import packageJson from './package.json' with { type: 'json' };

const author = String(packageJson.author?.name || packageJson.author || '')
  .toLowerCase()
  .replace(/[\W_]+/giu, '_');
const name  = packageJson.name.replace(/[\W_]+/giu, '_');

export default {
  appId: `com.${author}.${name}`,
  artifactName: '${productName}-v${version}.${ext}',
  icon: 'public/app.ico',
  asar: true,
  asarUnpack: [
    'resources/**',
  ],
  files: [
    'dist/**/*',
    'electron/**/*',
  ],
  // extraResources: [
  //   {
  //     from: 'public/app.ico',
  //     to: 'app.ico',
  //   },
  // ],
  directories: {
    // buildResources: "build/resources",
    output: 'build/electron-builder',
  },
  // mac: {
  //   category: 'your.app.category.type',
  // },
  win: {
    target: [
      'nsis',
    ],
  },
  // linux: {
  //   target: 'AppImage',
  // },
  nsis: {
    installerIcon: 'public/app.ico',
    uninstallerIcon: 'public/app.ico',
    license: 'LICENSE',
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    runAfterFinish: true,
  },
};

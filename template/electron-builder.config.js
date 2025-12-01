export default {
  appId: 'com.example.myapp',
  icon: 'electron/app.ico',
  asar: true,
  asarUnpack: [
    'resources/**',
  ],
  files: [
    'dist/**/*',
    'electron/**/*',
  ],
  extraResources: [
    {
      from: 'electron/app.ico',
      to: 'app.ico',
    },
  ],
  directories: {
    // buildResources: "build/resources",
    output: 'out/electron-builder',
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
    installerIcon: 'electron/app.ico',
    uninstallerIcon: 'electron/app.ico',
    license: 'LICENSE',
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    runAfterFinish: true,
  },
};

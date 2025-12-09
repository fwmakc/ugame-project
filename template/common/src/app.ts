type BuildTargetType = 'capacitor' | 'electron' | 'tauri';
type RuntimePlatformType = 'desktop' | 'mobile';

const BUILD_TARGET: BuildTargetType = import.meta.env.VITE_BUILD_TARGET;
const RUNTIME_PLATFORM: RuntimePlatformType = import.meta.env
  .VITE_RUNTIME_PLATFORM;

export const APP = {
  isCapacitor: BUILD_TARGET === 'capacitor',
  isElectron: BUILD_TARGET === 'electron',
  isTauri: BUILD_TARGET === 'tauri',
  isWeb: !BUILD_TARGET,

  isBrowser: !RUNTIME_PLATFORM,
  isDesktop: RUNTIME_PLATFORM === 'desktop',
  isMobile: RUNTIME_PLATFORM === 'mobile',
} as const;

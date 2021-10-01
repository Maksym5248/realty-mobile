import { Dimensions, NativeModules, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const { StatusBarManager } = NativeModules;

const orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

function getOrientation(height: number, width: number) {
  return width < height ? orientations.PORTRAIT : orientations.LANDSCAPE;
}

class DeviceClass {
  get statusBarHeight() {
    return this.isIOS ? 20 : StatusBarManager.HEIGHT;
  }
  // platform
  get isAndroid() {
    return Platform.OS === 'android';
  }
  get isIOS() {
    return Platform.OS === 'ios';
  }

  // dimensions
  get screenWidth() {
    return Dimensions.get('screen').width;
  }
  get screenHeight() {
    return Dimensions.get('screen').height;
  }
  get windowWidth() {
    return Dimensions.get('window').width;
  }
  get windowHeight() {
    return Dimensions.get('window').height;
  }

  get orientation() {
    return getOrientation(this.screenHeight, this.screenWidth);
  }
  get isLandscape() {
    return getOrientation(this.windowHeight, this.windowWidth) === orientations.LANDSCAPE;
  }

  // inserts
  get insetRight() {
    return initialWindowMetrics.insets.right;
  }
  get insetLeft() {
    return initialWindowMetrics.insets.left;
  }
  get insetTop() {
    return initialWindowMetrics.insets.top;
  }
  get insetBottom() {
    return initialWindowMetrics.insets.bottom;
  }

  // size screen
  get isSmallScreen() {
    return this.screenWidth <= 340;
  }
  get isShortScreen() {
    return this.screenHeight <= 600;
  }
  get screenAspectRatio() {
    return this.screenWidth < this.screenHeight
      ? this.screenHeight / this.screenWidth
      : this.screenWidth / this.screenHeight;
  }
  get isTablet() {
    return (
      // @ts-ignore
      Platform.isPad ||
      (this.screenAspectRatio < 1.6 && Math.max(this.screenWidth, this.screenHeight) >= 900)
    );
  }
  get isIphoneX() {
    return (
      this.isIOS &&
      // @ts-ignore
      !Platform.isPad &&
      !Platform.isTV &&
      (this.screenHeight >= 812 || this.screenWidth >= 812)
    );
  }

  addDimensionsEventListener(callback: any) {
    Dimensions.addEventListener('change', callback);
  }

  removeDimensionsEventListener(callback: any) {
    Dimensions.removeEventListener('change', callback);
  }
}

export const device = new DeviceClass();

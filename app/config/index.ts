import { configDev } from './config.dev';
// import { configProd } from './config.prod';
import { configStag } from './config.stag';

const IS_DEV = true;
const config = IS_DEV ? configDev : configStag;
export { config };

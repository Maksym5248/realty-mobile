import { configDev } from './config.dev';
import { configProd } from './config.prod';

const IS_DEV = true;
const config = IS_DEV ? configDev : configProd;
export { config };

import CryptoJS from 'crypto-js';
import { HASH_KEY } from '../configs/constants';

export function hash(string: string) {
  return CryptoJS.SHA1(string).toString()
}

import 'whatwg-fetch'
import { get } from './baseApi';

export function getProducts() {
  return get('products');
}
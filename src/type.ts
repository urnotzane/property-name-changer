import { toHump } from './lib/common';

export type CommonObject = {
  [key:string]:any;
};

export enum keyType {
  toHump = 'toHump',
  toLine =  'toLine',
};
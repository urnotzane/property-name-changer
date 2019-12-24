import * as _ from 'lodash';
import * as prettier from 'prettier';
import { CommonObject } from '../type';
import { message, toHump, logInfo, logError, deleteQuote } from './common';

export function jsonToSelector(str:string) : string {
  try {
    const obj = JSON.parse(str);
    const result = `export function yourSelector(data:any) : any { return ${selectorGenerator(obj)};}`;
    return selectorToFormatString(result);
  } catch (error) {
    logError(error);
    message.error('JSON解析失败！');
    return str;
  }
}

export function selectorGenerator(data:CommonObject | CommonObject[], itemName = 'data') : string {
  let result = '';
  if (_.isArray(data)) {
    result += `${itemName}.map((item:any) => (${selectorGenerator(data[0], 'item')}))`;
  } else {
    result += '{';
    for (let key in data) {
      const value = data[key];
      if (_.isObject(value) || _.isArray(value)) {
        result += `${toHump(key)}: ${selectorGenerator(value, `${itemName}.${key}`)},`;
      } else {
        result += `${toHump(key)}: ${itemName}.${key},`;
      }
    }
    result += '}';
  }
  return result;
}

/**
 * 
 * @param value:string 
 * @description 对象转为格式化后的字符串
 */
export function selectorToFormatString(value:string) : string {
  const text = prettier.format(value, {
    parser: "typescript",
    bracketSpacing: true,
    trailingComma: "all",
  });
  logInfo(deleteQuote(text));
  return deleteQuote(text);
}
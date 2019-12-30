import * as _ from 'lodash';
import * as prettier from 'prettier';
import { CommonObject } from '../type';
import { message, toHump, logInfo, logError, deleteQuote } from './common';

export function jsonToSelector(str:string, handler:Function = toHump) : string {
  try {
    const obj = JSON.parse(str);
    const resultFunction = `export function yourSelector(data:any) : any { return ${selectorGenerator(obj, handler)};}`;
    return selectorToFormatString(resultFunction);
  } catch (error) {
    logError(error);
    message.error('JSON解析失败！');
    return str;
  }
}

export function selectorGenerator(data:CommonObject | CommonObject[], handler:Function, itemName = 'data') : string {
  let result = '';
  if (_.isArray(data)) {
    const itemKeys = itemName.split('.');
    const itemKey = itemKeys[itemKeys.length - 1] + 'Item';
    result += `${itemName}.map((${itemKey}:any) => (${selectorGenerator(data[0], handler, itemKey)}))`;
  } else {
    result += '{';
    for (let key in data) {
      const value = data[key];
      if (_.isObject(value) || _.isArray(value)) {
        result += `${handler(key)}: ${selectorGenerator(value, handler, `${itemName}.${key}`)},`;
      } else {
        result += `${handler(key)}: ${itemName}.${key},`;
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
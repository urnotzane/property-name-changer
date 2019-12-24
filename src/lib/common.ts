import * as _ from 'lodash';
import * as vscode from 'vscode';
import { CommonObject } from '../type';

export const logInfo = console.info;
export const logError = console.error;
export const logWarn = console.warn;
export const vsWindow = vscode.window;
export const message = {
  info: vsWindow.showInformationMessage,
  warn: vsWindow.showWarningMessage,
  error: vsWindow.showErrorMessage,
};
/**
 * @description 驼峰转底杠
 * @example variableName => variable_name
*/
export const toBottomLine = (text:string) => {
  if (!text) {
    return '';
  }
  const reg = /([A-Z])/g;
  if (reg.test(text)) {
    return text.replace(reg, '_$1').toLowerCase();
  }
  return text;
};
/**
 * @description 底杠转驼峰
 * @example variable_name => variableName
*/
export const toHump = (text:string) => {
  if (!text) {
    return '';
  }
  const reg = /\_(\w)/g;
  if (reg.test(text)) {
    return text.replace(reg, (matchText, letter) => {
      return letter.toUpperCase();
    });
  }
  return text;
};
/**
 * @param text 字符串
 * @description 删除所有引号和双引号
 * @example 
 * - "value" => value
 * - 'value' => value
 */
export const deleteQuote = (text:string) => {
  if (!text) {
    return '';
  }
  const reg = /\'|\"/g;
  if (reg.test(text)) {
    return text.replace(reg, '');
  }
  return text;
};
/**
 * 
 * @param data 
 * @description 递归替换data对象或数组的字段名
 */
export function fieldReplacer(data:CommonObject|CommonObject[], handler:Function) : CommonObject|CommonObject[] {
  if (_.isArray(data)) {
    return _.map(data, (item) => {
      if (_.isArray(item) || _.isObject(item)) {
        return fieldReplacer(item, handler);
      }
      return item;
    });
  }
  const result:CommonObject = {};
  for(let key in data) {
    const newKey = handler(`${key}`);
    const value = data[key];
    if (_.isArray(value) || _.isObject(value)) {
      result[newKey] = fieldReplacer(value, handler);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}
/**
 * 
 * @param obj 
 * @description 删除JSON.stringify后的转义字符
 */
export function deleteEscapeSymbol(obj:CommonObject) {
  return JSON.stringify(obj)
    .replace(/\\f|\\n|\\r|\\t|\\v|\\/g, '')
    .replace(/\"{/g, '{')
    .replace(/}\"/g, '}');
}
/**
 *
 * @param str
 * @description 判断是否为正确的的JSON
 */
export function isJson(str:string) : boolean {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === 'object') {
        return true;
      }
      return false;
    } catch (error) {
      logError(error);
      return false;
    }
  }
  return false;
}


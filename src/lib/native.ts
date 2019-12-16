import * as _ from 'lodash';
import { toHump, logError, message, toBottomLine, deleteQuote } from './common';
/**
 * 
 * @param text 
 * @description 正则匹配带冒号的属性名并替换为驼峰模式
 */
export function jsonToHump(text:string) {
  try {
    if (!text) {
      return '';
    }
    /** 带冒号的JSON属性名 */
    const reg = /\"\b\S*\b\"\:/g;
    if (reg.test(text)) {
      return text.replace(reg, (matchText) => {
        return deleteQuote(toHump(matchText));
      });
    }
    return text;
  } catch (error) {
    logError(error);
    message.error(error);
    return text;
  }
}

/**
 * 
 * @param text 
 * @description 正则匹配带冒号的属性名并替换为底杠模式
 */
export function jsonToBottomLine(text:string) {
  try {
    if (!text) {
      return '';
    }
    /** 带冒号的对象属性名 */
    const reg = /\"\b\S*\b\"\:/g;
    if (reg.test(text)) {
      return text.replace(reg, (matchText) => {
        return deleteQuote(toBottomLine(matchText));
      });
    }
    return text;
  } catch (error) {
    logError(error);
    message.error(error);
    return text;
  }
}
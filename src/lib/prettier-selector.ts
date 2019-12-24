import * as prettier from 'prettier';
import * as _ from 'lodash';
import * as vscode from 'vscode';
import { toHump, logInfo } from './common';
import { selectorToFormatString } from './prettier';
import { CommonObject } from '../type';
var extra_interface = '';

export function GenPrettierSelector (data:string) {
  
  try {
    const obj = JSON.parse(data);
    var result = generateSelector(obj);
    return (result + '\n/* 自动生成的 Selector Function */\n' + extra_interface).trim();
  } catch (error) {
    vscode.window.showErrorMessage('json 解析错误！');
    logInfo(error);
  }
}


// 对象Object 生成：
const template = `
export function yourSelector(data:Object):Object {
  return {
    name: data.name,
    nRate: data.n_rate,
    deep_obj: {
      a: data.deep_obj.a,
    }
  };
};
`;
// 数组 生成example：
const templateArr = `
export function yourSelector(data:Object):Object {
  return data.forEach(item => ({
    name: data.name,
    nRate: data.n_rate,
  }));
};
`;
function generateSelector(data:(any[] | {[key:string]:any})):string {
  let funString = `\nexport function yourSelector (data:Object):Object { return `;
  logInfo(data);
  // todo how to generator from array data
  if (_.isArray(data)) {
    funString += 'data.map(item => (';
    data.forEach(item => {
      funString += generateRecursiveSelector(item) + ';';
      console.log(generateRecursiveSelector(item));
    });
    funString += "));";
  } else {
    funString += generateRecursiveSelector(data);
  }
  // funString += JSON.stringify(tpl);
  funString += `};`;
  return selectorToFormatString(funString);
}

function genObj(obj:CommonObject) {
  const tpl:any = {};
  Object.keys(obj).map(function(key){
    if (_.isObject(obj[key])) {
      tpl[toHump(key)] = generateRecursiveSelector(obj[key]);
    } else {
      tpl[toHump(key)] = 'data.' + key;
    }
  });
  return tpl;
}
function generateRecursiveSelector(data:(any[] | {[key:string]:any})):CommonObject | CommonObject[] {
  if (_.isArray(data)) {
    return data.map(function(item){
      if(_.isObject(data)) {
        return generateRecursiveSelector(item);
      }
      return item;
    });
  }
  
  return genObj(data);
}

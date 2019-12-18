import * as prettier from 'prettier';
import * as _ from 'lodash';
import * as vscode from 'vscode';
import { toHump } from './common';
import { selectorToFormatString } from './prettier';
import {  } from '../';
var extra_interface = '';

export function GenPrettierSelector (data:string) {
  try {
    const obj = JSON.parse(data);
    var result = generateSelector(obj);
    return (result + '\n/* 自动生成的 Selector Function */\n' + extra_interface).trim();
  } catch (error) {
    vscode.window.showErrorMessage('json 解析错误！');
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
  const tpl:any = generateRecursiveSelector(data);
  let funString = `\nexport function yourSelector (data:Object):Object {\n\treturn `;
  // todo how to generator from array data
  // if (_.isArray(data)) {
  //   data.forEach(item => {
  //     funString += 'data.forEach(item => (' + generateRecursiveSelector(item) + '))';
  //     console.log(generateRecursiveSelector(item));
  //   });
  // } else {
  //   funString += JSON.stringify(tpl);
  // }
  funString += JSON.stringify(tpl);
  funString += `\t};`;
  return selectorToFormatString(funString);
}

function genObj(obj:Object) {
  const tpl:any = {};
  Object.keys(obj).map(function(key){
    if (_.isObject(obj[key])) {
      tpl[toHump(key)] = generateRecursiveSelector(obj[key]);
    } else {
      tpl[toHump(key)] = 'data.' + key;
    }
  })
  return tpl;
}
function generateRecursiveSelector(data:(any[] | {[key:string]:any})):string {
  if (_.isArray(data)) {
    return data.map(function(item){
      if(_.isObject) {
        return generateRecursiveSelector(item);
      }
      return item;
    })
  }
  
  return genObj(data);
}

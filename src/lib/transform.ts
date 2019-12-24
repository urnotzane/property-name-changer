
import * as _ from 'lodash';
import { CommonObject, keyType } from '../type';
import { toHump, message } from './common';

let interfaceNames = ['YourInterfaceName'];
let extraInterface = '';
let transType = 'toLine';
export function toInterface (variable:string, type:keyType = keyType.toLine) {
  transType = type;
  try {
    const data = JSON.parse(variable);
    let result;
    if (_.isArray(data)) {
      result = generateInterface('YourInterfaceName', data[0], '');
    } else {
      result = generateInterface('YourInterfaceName', data, '');
    }
    const res = (result + '\n/* 自动生成的 Interface */\n' + extraInterface).trim();
    interfaceNames = ['YourInterfaceName'];
    extraInterface = '';
    return res;
  } catch (error) {
    message.error('json 解析错误！');
  }
}

function formatKey (key:string) {
  // if (!/^[a-z][a-z\d]*$/i.test(key))
  //   return JSON.stringify(key);

  return key;
}

function getVariableType (variable:{[props:string]:any}, name:string):string {
  if (variable === undefined) {
    return 'void /* undefined */';
  }
  
  const type = typeof variable;
  if (variable.constructor.name === 'Array') {
    // const tpl = [];
    // variable.map((item, index) => {
    //   const arrType = getVariableType(item, name);
    //   tpl.push(arrType);
    // })
    // const isNotSame = tpl.find(item => item !== tpl[0]);
    // if (isNotSame) {
    //   return tpl;
    // }
    return getVariableType(variable[0], name) + '[]';
  }
  if (type === 'object') {
    if (!variable) {
      return 'void /* 未知类型 */';
    }
    
    if (name.slice(-2) === 'es') {
      name = name.slice(0, -2);
    } else if (name.slice(-1) === 's') {
      name = name.slice(0, -1);
    }

    if (name) {
      name = name[0].toUpperCase() + name.slice(1);
    } else {
      name = 'Unknown';
    }
    let ifName = 'I' + name;

    if (interfaceNames.indexOf(ifName) !== -1) {
      let i = 1;
      while (interfaceNames.indexOf(ifName + '_' + i) !== -1) {
        i++;
      }

      ifName = ifName + '_' + i;
    }
    interfaceNames.push(ifName);
    const extra = generateInterface(ifName, variable, '');
    extraInterface = extra + extraInterface;
    return ifName;
  }

  return type;
}


const template = `
export function yourSelector(obj:Object):Object {
  return {
    name: obj.name,
    nRate: obj.n_rate,
  };
};
`;
function generateInterface (prefName:string, variable:CommonObject, indent:string) {
  var r = '\n' + indent + 'interface ' + prefName + ' {\n';
  var sub_indent = '\t' + indent;

  r += Object.keys(variable).map(function(k){
    if (transType === keyType.toHump) {
      return sub_indent + toHump(k) + ':' + getVariableType(variable[k], k);
    }
    return sub_indent + k + ':' + getVariableType(variable[k], k);
  }).join(';\n') + ';\n';

  r += indent + '}\n';

  return r;
}

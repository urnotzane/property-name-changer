
import * as vscode from 'vscode';
import * as _ from 'lodash';
var interfaceNames = ['YourInterfaceName'];
var extra_interface = '';
export function toInterface (variable: string) {
  try {
    const data = JSON.parse(variable);
    let result;
    if (_.isArray(data)) {
      result = generateInterface('YourInterfaceName', data[0], '');
    } else {
      result = generateInterface('YourInterfaceName', data, '');
    }
    return (result + '\n/* 自动生成的 Interface */\n' + extra_interface).trim();
  } catch (error) {
    vscode.window.showErrorMessage('json 解析错误！');
  }
}

function formatKey (key:string) {
  // if (!/^[a-z][a-z\d]*$/i.test(key))
  //   return JSON.stringify(key);

  return key;
}

function getVariableType (variable:string, name:string):string {
  if (variable === undefined) {
    return 'void /* undefined */';
  }
  
  var type = typeof variable;
  if (type == 'object') {
    if (!variable)
      return 'void /* 未知类型 */';
    
    // if (name.slice(-2) == 'es') {
    //   name = name.slice(0, -2);
    // } else if (name.slice(-1) == 's') {
    //   name = name.slice(0, -1);
    // }
    if (variable.constructor.name == 'Array') {
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

    if (name) {
      name = name[0].toUpperCase() + name.slice(1);
    } else {
      name = 'Unknown';
    }
    var ifName = 'I' + '_' + name;

    if (interfaceNames.indexOf(ifName) != -1) {
      var i = 1;
      while (interfaceNames.indexOf(ifName + '_' + i) != -1) {
        i++;
      }

      ifName = ifName + '_' + i;
    }
    interfaceNames.push(ifName);
    var extra = generateInterface(ifName, variable, '');
    extra_interface = extra + extra_interface;
    return ifName;
  }

  return type;
}

// interface IUnknown {
// 	url: string;
// 	posts: IPost[];
// 	"last-update": number;
// }
const template = `
export function yourSelector(obj:Object):Object {
  return {
    name: obj.name,
    nRate: obj.n_rate,
  };
};
`;
function generateInterface (prefName:string, variable:{[]:string}, indent:string) {
  var r = '\n' + indent + 'interface ' + prefName + ' {\n';
  var sub_indent = '\t' + indent;

  r += Object.keys(variable).map(function(k){
    return sub_indent + formatKey(k) + ':' + getVariableType(variable[k], k);
  }).join(';\n') + ';\n';

  r += indent + '}\n';

  return r;
}

# varname-changer

Change your variable name easily!

## Use:sparkles:
> Select your string and use the following commands.

Function | Example | Command | Keybindings
-|-|-|-
底杠转驼峰 | variable_name => variableName | varname.toHump | `ctrl+shift+1`
驼峰转底杠 | variableName => variable_name | varname.toBottomLine | `ctrl+shift+2`
JSON底杠转驼峰 | { "variable_name": "value" } => { "variableName": "value" } | varname.toHump | `ctrl+shift+3`
JSON驼峰转底杠 | { "variableName": "value" } => { "variable_name": "value" } | varname.toBottomLine | `ctrl+shift+4`
删除引号 | 'variableName' => variableName | varname.deleteQuote | `ctrl+shift+'`

## Schedule:pencil:
- 根据逗号和分号确定对象字段名，并且仅更改等号或冒号前的字符串，如果没有可区分的符号，则默认更改所有选中的字符串。
  
  Determines object fields name based on commas and semicolons, and only changes the string before the equals or colons.

- 每次转换type时皆生成一个字段名映射的selector函数。
  
  Generate a `selector` function for field name mapping every time when type is converted.

## Undetermined:pushpin:
I called this project `varnameChanger` in the outset.But it will do more. So maybe call it `fields-generator`?
I am not sure of this.

## Installation:package:
Open your VSCode and search `varnameChanger` in extensions store.

## Finally:camera_flash:
If you have any problem in using.Please send [email](mailto:urnotzane@163.com) or create an [issue](https://github.com/urnotzane/varname-changer-vscode/issues) to me.Thanks!

**Enjoy:see_no_evil:!**

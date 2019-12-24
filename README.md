# property-name-changer

Change your property name easily!

## Use:sparkles:
> Select your string and use the following commands.

Function | Example | Command | Keybindings
-|-|-|-
底杠转驼峰 | property_name => propertyName | varname.toHump | `ctrl+shift+1`
驼峰转底杠 | propertyName => property_name | varname.toBottomLine | `ctrl+shift+2`
JSON底杠转驼峰 | { "property_name": "value" } => { "propertyName": "value" } | varname.toHump | `ctrl+shift+3`
JSON驼峰转底杠 | { "propertyName": "value" } => { "property_name": "value" } | varname.toBottomLine | `ctrl+shift+4`
删除引号 | 'propertyName' => propertyName | varname.deleteQuote | `ctrl+shift+'`
json生成interface | `{"title": "test my interface"}` => `interface YourNameInterface { title:string }` | propertyNameChanger.toType | `ctrl+i`

## Schedule:pencil:
- 根据逗号和分号确定对象字段名，并且仅更改等号或冒号前的字符串，如果没有可区分的符号，则给出提示。
  
  Determines object fields name based on commas and semicolons, and only changes the string before the equals or colons.

- 每次转换type时皆生成一个字段名映射的selector函数。
  
  Generate a `selector` function for field name mapping every time when type is converted.

## Undetermined:pushpin:
I called this project `propertyNameChanger` in the outset.But it will do more. So maybe call it `fields-generator`?
I am not sure of this.

## Installation:package:
Open your VSCode and search `propertyNameChanger` in extensions store.

## Finally:camera_flash:
If you have any problem in using.Please send [email](mailto:urnotzane@163.com) or create an [issue](https://github.com/urnotzane/property-name-changer/issues) to me.Thanks!

**Enjoy:see_no_evil:!**

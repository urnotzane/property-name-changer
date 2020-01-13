import * as vscode from 'vscode';
import { toHump, logWarn, logInfo, deleteQuote, toBottomLine } from './lib/common';
import { jsonToBottomLine, jsonToHump } from './lib/name-changer';
import { toInterface } from './lib/transform';

function replaceFactory(handler:Function, name:string, extra?:any) {
	// 注册编辑器事件
	return vscode.commands.registerTextEditorCommand(`propertyNameChanger.${name}`, (textEditor, edit) => {
		const getText = textEditor.document.getText;
		// 选中的内容Range数组
		const selectRange = textEditor.selections;
		selectRange.forEach((range:any) => {
			const { start, end } = range;
			const text = getText(range);
			if (text) {
				const location = new vscode.Range(start, end);
				edit.replace(location, handler(text, extra));
			} else {
				logWarn('未选中任何文字！');
			}
		});
	});
}
export function activate(context:vscode.ExtensionContext) {
	logInfo(`propertyNameChanger is now active!`);

	context.subscriptions.push(replaceFactory(toBottomLine, 'toBottomLine'));
	context.subscriptions.push(replaceFactory(toHump, 'toHump'));
	context.subscriptions.push(replaceFactory(jsonToBottomLine, 'jsonToBottomLine'));
	context.subscriptions.push(replaceFactory(jsonToHump, 'jsonToHump'));
  context.subscriptions.push(replaceFactory(deleteQuote, 'deleteQuote'));
  context.subscriptions.push(replaceFactory(toInterface, 'toType'));
}

// this method is called when your extension is deactivated
export function deactivate() {}

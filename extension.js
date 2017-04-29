// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode   = require('vscode');
const findTags = require('./findTags');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "compulim-vscode-closetag" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      'closeTag.closeHTMLTag',
      (textEditor, edit) => {
        closeSelections(textEditor, edit);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      'closeTag.closeHTMLTagInPlace',
      (textEditor, edit) => {
        const newSelections = textEditor.selections;

        closeSelections(textEditor, edit);

        textEditor.selections = newSelections;
      }
    )
  );
}

function closeSelections(textEditor, edit) {
  textEditor.selections.forEach(selection => {
    let startLine = selection.start.line;
    let startCharacter = selection.start.character;

    const tagToClose = findTags(() => {
      if (startLine < 0) {
        return;
      } else {
        const line = getLineText(textEditor, startLine--, startCharacter);

        startCharacter = Infinity;

        return line;
      }
    });

    if (tagToClose) {
      const closeTag = `</${ tagToClose }>`;

      if (selection.start.line !== selection.end.line || selection.start.character !== selection.end.character) {
        edit.replace(selection, closeTag);
      } else {
        edit.insert(selection.anchor, closeTag);
      }
    }
  });
}

function getLineText(textEditor, line, char) {
  return textEditor.document.getText(
    new vscode.Range(line, 0, line, char)
  );
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

exports.deactivate = deactivate;
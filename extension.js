// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode    = require('vscode');

const findTags            = require('./findTags');
const normalizeIgnoreTags = require('./utils/normalizeIgnoreTags');
const reduceMap           = require('./utils/reduceMap');

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
      (textEditor, edit, args) => {
        closeSelections(textEditor, edit, args);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'closeTag.closeHTMLTagInPlace',
      async (args) => {
        const { activeTextEditor: textEditor } = vscode.window;

        if (textEditor) {
          const prevSelections = textEditor.selections;

          await textEditor.edit(edit => {
            closeSelections(textEditor, edit, args);
          });

          prevSelections.forEach((selection, index) => {
            // If a range of text was selected previously, then just keep it
            // since the new replacement text will be selected already.
            // Otherwise, restore the previous cursor position.

            if (selection.isEmpty) {
              textEditor.selections[index] = selection;
            }
          });
        }
      }
    )
  );
}

function closeSelections(textEditor, edit, overrideOptions) {
  const ignoreTags = reduceMap(
    Object.assign(
      {},
      normalizeIgnoreTags(vscode.workspace.getConfiguration('closeTag').get('ignoreTags')),
      normalizeIgnoreTags((overrideOptions || {}).ignoreTags)
    ),
    (result, value, name) => {
      value && result.push(name);
      return result;
    },
    []
  );

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
    }, { ignoreTags });

    if (tagToClose) {
      const closeTag = `</${ tagToClose }>`;

      if (selection.start.line !== selection.end.line || selection.start.character !== selection.end.character) {
        edit.replace(selection, closeTag);
      } else {
        edit.insert(selection.anchor, closeTag);
      }
    }
  }, { ignoreTags });
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

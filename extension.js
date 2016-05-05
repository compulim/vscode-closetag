'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// We will ignore empty tag
const HTML_TAG_PATTERN = /<(\/?)([\w_:][\d\w\.\-_:]*)(\s+\w[\d\w]*(=".*?")?)*\s*>/g;

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
        closeTag(textEditor, edit);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      'closeTag.closeHTMLTagInPlace',
      (textEditor, edit) => {
        const newSelections = textEditor.selections;

        textEditor.edit(edit => {
          closeTag(textEditor, edit);
        }).then(done => {
          textEditor.selections = newSelections;
        });
      }
    )
  );
}

function closeTag(textEditor, edit) {
  textEditor.selections.forEach(selection => {
    let
      startLine = selection.start.line,
      tags = [];

    while (startLine >= 0) {
      let text = getLineText(textEditor, startLine);

      // If we are on the first line of selection, omit the letters beyond the start of selection
      if (startLine === selection.start.line) {
        text = text.substr(0, selection.start.character);
      }

      const newTags = findTags(text).reverse();

      tags = tags.concat(newTags);

      const tag = firstOpenTag(tags);

      if (tag) {
        const closeTag = `</${tag.tagName}>`;

        if (selection.start.line !== selection.end.line || selection.start.character !== selection.end.character) {
          edit.replace(selection, closeTag);
        } else {
          edit.insert(selection.anchor, closeTag);
        }

        break;
      } else {
        startLine--;
      }
    }
  });
}

function findTags(line) {
  const result = [];
  let match;

  while ((match = HTML_TAG_PATTERN.exec(line))) {
    result.push({
      tagName: match[2],
      close: match[1] === '/'
    });
  }

  return result;
}

exports.findTags = findTags;

function firstOpenTag(tags) {
  for (let i = 0, l = tags.length; i < l; i++) {
    const tag = tags[i];

    if (!tag.close) {
      let closed;

      for (let j = i - 1; j >= 0; j--) {
        if (tags[j].tagName === tag.tagName && tags[j].close) {
          closed = true;
          break;
        }
      }

      if (!closed) {
        return tag;
      }
    }
  }
}

exports.firstOpenTag = firstOpenTag;

function getLineText(textEditor, line) {
  return textEditor.document.getText(
    new vscode.Range(line, 0, line, Infinity)
  );
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

exports.deactivate = deactivate;
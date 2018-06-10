/* global describe, beforeEach, afterEach, it */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer-their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const fs     = require('fs');
const path   = require('path');
const vscode = require('vscode');

const { commands, workspace, window, Range, Selection } = vscode;

// Defines a Mocha test suite to group tests of similar kind together
describe('Extension Test', () => {
  describe('with "sample.xml"', () => {
    let textEditor;

    beforeEach(() => {
      return workspace.openTextDocument(path.join(__dirname, '../sample.xml'))
        .then(document => {
          return window.showTextDocument(document);
        })
        .then(editor => {
          textEditor = editor;
        });
    });

    describe('Close tag at (5, 0)', () => {
      beforeEach(() => {
        textEditor.selection = new Selection(5, 0, 5, 0);

        return commands.executeCommand('closeTag.closeHTMLTag');
      });

      it('should close as expected', () => {
        return assertContent(textEditor.document, 'simpleCloseTag.xml');
      });
    });

    describe('Close tags at (5, 13) and (6, 13)', () => {
      beforeEach(() => {
        textEditor.selections = [
          new Selection(5, 13, 5, 13),
          new Selection(6, 13, 6, 13),
        ];

        return commands.executeCommand('closeTag.closeHTMLTag');
      });

      it('should close as expected', () => {
        return assertContent(textEditor.document, 'multipleCloseTags.xml');
      });
    });

    describe('Close tags in-place at (5, 13)-(5, 16)', () => {
      beforeEach(() => {
        textEditor.selection = new Selection(5, 13, 5, 16);

        return commands.executeCommand('closeTag.closeHTMLTagInPlace');
      });

      it('should close as expected', () => {
        return assertContent(textEditor.document, 'simpleCloseTagInPlace.xml');
      });

      it('should select newly closed tag', () => {
        const { selection } = textEditor;

        assert.equal(selection.anchor.line, 5);
        assert.equal(selection.anchor.character, 13);
        assert.equal(selection.active.line, 5);
        assert.equal(selection.active.character, 21);
      });
    });

    describe('Close tags in-place at (5, 13)', () => {
      beforeEach(() => {
        textEditor.selection = new Selection(5, 13, 5, 13);

        return commands.executeCommand('closeTag.closeHTMLTagInPlace');
      });

      it('should close as expected', () => {
        return assertContent(textEditor.document, 'simpleCloseTagInPlaceInsert.xml');
      });

      it('should not move cursor', () => {
        const { selection } = textEditor;

        assert.equal(selection.anchor.line, 5);
        assert.equal(selection.anchor.character, 13);
        assert.equal(selection.active.line, 5);
        assert.equal(selection.active.character, 13);
      });
    });

    describe('Close tags in-place at (5, 13) and (6, 13)', () => {
      beforeEach(() => {
        textEditor.selections = [
          new Selection(5, 13, 5, 13),
          new Selection(6, 13, 6, 13)
        ];

        return commands.executeCommand('closeTag.closeHTMLTagInPlace');
      });

      it('should close as expected', () => {
        return assertContent(textEditor.document, 'multipleCloseTagsInPlaceInsert.xml');
      });

      it('should select newly closed tags', () => {
        const { selections } = textEditor;

        assert.equal(selections[0].anchor.line, 5);
        assert.equal(selections[0].anchor.character, 13);
        assert.equal(selections[0].active.line, 5);
        assert.equal(selections[0].active.character, 13);

        assert.equal(selections[1].anchor.line, 6);
        assert.equal(selections[1].anchor.character, 13);
        assert.equal(selections[1].active.line, 6);
        assert.equal(selections[1].active.character, 13);
      });
    });

    afterEach(() => {
      // return commands.executeCommand('workbench.action.revertAndCloseActiveEditor');

      return commands.executeCommand('workbench.action.files.revert').then(() => {
        return commands.executeCommand('workbench.action.closeActiveEditor');
      });
    });
  });

  describe('closing <div><img> and ignore "img" tag', () => {
    let textDocument;

    beforeEach(() => {
      return createTextEditorWithContent('<div><img>').then(textEditor => {
        textDocument = textEditor.document;

        textEditor.selection = new Selection(0, 10, 0, 10);

        return commands.executeCommand('closeTag.closeHTMLTag', { ignoreTags: { img: true } });
      });
    });

    it('should close <div>', () => {
      assert.equal(
        textDocument.getText(new Range(0, 0, Infinity, Infinity)),
        '<div><img></div>'
      );
    });

    afterEach(() => revertAndClose());
  });

  describe('closing <div></img> and ignore "img" tag', () => {
    let textDocument;

    beforeEach(() => {
      return createTextEditorWithContent('<div></img>').then(textEditor => {
        textDocument = textEditor.document;

        textEditor.selection = new Selection(0, 11, 0, 11);

        return commands.executeCommand('closeTag.closeHTMLTag', { ignoreTags: { img: true } });
      });
    });

    it('should close <div>', () => {
      assert.equal(
        textDocument.getText(new Range(0, 0, Infinity, Infinity)),
        '<div></img></div>'
      );
    });

    afterEach(() => revertAndClose());
  });
});

function createTextEditorWithContent(content) {
  return workspace.openTextDocument({ content, language: 'html' })
    .then(document => {
      return window.showTextDocument(document);
    });
}

function revertAndClose() {
  // return commands.executeCommand('workbench.action.revertAndCloseActiveEditor');

  return commands.executeCommand('workbench.action.files.revert').then(() => {
    return commands.executeCommand('workbench.action.closeActiveEditor');
  });
}

function assertContent(textDocument, expectedFilename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'baseline', expectedFilename), 'utf8', (err, expected) => {
      if (err) { return reject(err); }

      try {
        const actual = textDocument.getText(new Range(0, 0, Infinity, Infinity));

        assert.equal(actual, expected, `Content does not match "${ expectedFilename }"`);
      } catch (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

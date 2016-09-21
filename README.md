# Close tag keyboard shortcut
Closes last opened HTML or XML tag with `Alt+.`

![Demo showing how close tag works](https://raw.githubusercontent.com/compulim/vscode-closetag/master/demo.gif)

## Usage
By default, close tag is bound to `Alt+.`. You can still run it thru Command Palette.
* Bring up Command Palette (`F1`, or `Ctrl+Shift+P` on Windows and Linux, or `Shift+CMD+P` on OSX)
* Type or select "Close Tag: Close last opened HTML/XML tag"

To close tags without moving cursors or selections, press `Alt+Shift+.` or `closeTag.closeHTMLTagInPlace` command.

You can also modify keyboard shortcut with JSON below.
```
{
  "key": "alt+.",
  "command": "closeTag.closeHTMLTag",
  "when": "editorTextFocus"
},
{
  "key": "alt+shift+.",
  "command": "closeTag.closeHTMLTagInPlace",
  "when": "editorTextFocus"
}
```

## Change log
* 0.1.1 (2016-09-21)
  * Fix: not closing <h1> properly
* 0.1.0 (2016-09-13)
  * Feature: close React JSX elements and other non-standard XML elements
  * Fix: will now close elements spanning across multiple lines
* 0.0.9 (2016-05-05)
  * Feature: close tag in-place and lock current cursor positions
* 0.0.8 (2016-04-22)
  * Fix: not closing elements with value-less attributes
* 0.0.7 (2016-04-19)
  * Fix: not closing correctly when element name contains `.`, `-`, `_`, `:`
  * Feature: close multiple tags
* 0.0.6 (2016-03-25)
  * Behavior: will no longer highlight newly added close tag
  * Fix: when a tag span across multiple lines, the close tag is incorrect
  * Fix: when the cursor is in the middle of the line, the close tag is incorrect
* 0.0.5 (2016-02-09): Updated to use new API reference, technically `vscode^0.11.x`, to align with VS Code 0.10.8 (January 2016)

## Contributions
Love this extension? [Star](https://github.com/compulim/vscode-closetag/stargazers) us!

Want to make this extension even more awesome? [Send us your wish](https://github.com/compulim/vscode-closetag/issues/new/).

Hate how it is working? [File an issue](https://github.com/compulim/vscode-closetag/issues/new/) to us.

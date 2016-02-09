# Close tag keyboard shortcut
Closes last opened HTML or XML tag with `Alt+.`

![Demo showing how close tag works](https://raw.githubusercontent.com/compulim/vscode-closetag/master/demo.gif)

## Usage
By default, close tag is bound to `Alt+.`. You can still run it thru Command Palette.
* Bring up Command Palette (`F1`, or `Ctrl+Shift+P` on Windows and Linux, or `Shift+CMD+P` on OSX)
* Type or select "Close Tag: Close last opened HTML/XML tag"

You can also modify keyboard shortcut with JSON below.
```
{
  "key": "alt+.",
  "command": "closeTag.closeHTMLTag",
  "when": "editorTextFocus"
}
```

## Change log
* 0.0.5 (2016-02-09): Updated to use new VS Code API reference, technically `vscode^0.11.x`

## Contributions
Love this extension? [Star](https://github.com/compulim/vscode-closetag/stargazers) us!

Want to make this extension even more awesome? [Send your wish](https://github.com/compulim/vscode-closetag/issues/new/) to us.

Hate how it is working? [File an issue](https://github.com/compulim/vscode-closetag/issues/new/) to us.
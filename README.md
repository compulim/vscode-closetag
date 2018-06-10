# Close tag keyboard shortcut

[![Version](https://vsmarketplacebadge.apphb.com/version/Compulim.compulim-vscode-closetag.svg)](https://marketplace.visualstudio.com/items?itemName=Compulim.compulim-vscode-closetag) [![Build Status](https://travis-ci.org/compulim/vscode-closetag.svg?branch=master)](https://travis-ci.org/compulim/vscode-closetag)

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

You can look at the change log [here](CHANGELOG.md).

## Contributions

Love this extension? [Star](https://github.com/compulim/vscode-closetag/stargazers) us!

Want to make this extension even more awesome? [Send us your wish](https://github.com/compulim/vscode-closetag/issues/new/).

Hate how it is working? [File an issue](https://github.com/compulim/vscode-closetag/issues/new/) to us.

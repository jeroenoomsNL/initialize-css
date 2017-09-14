# Initialize.css
Initialize.css is a complete and customizable collection of CSS best practices based on Normalize.css and HTML5 Boilerplate. Available in CSS and configurable SASS (SCSS) format.

## Install

npm:
```bash
npm install initialize-css
```

bower:
```bash
bower install initialize-css
```

## Usage

sass / scss (from node_modules or bower_components):
```
@import "module_folder_name/initialize-css/dist/initialize";
```

with browserify:
```
@import "initialize";
```

## Configure

### Overwrite default values for generic typography
```
$initialize-box-sizing: border-box;
$initialize-font-family: sans-serif;
$initialize-font-size: 1em;
$initialize-line-height: 1.4;
```

### Options

```
$initialize-print-styles: true;
$initialize-html5-boilerplate-overwrites: true;
```

Microsoft [dropped support](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support) for IE8, IE9 & IE10. If you still have to support these old dinosaur browsers, just set dinosaur mode to true. This option is set to false by default.
```
$initialize-dinosaur-mode: true;
```

### Optional values
```
$initialize-color: #000;
$initialize-block-margins: 0 0 0.75em;
```

```
$initialize-heading-color: #000;
$initialize-heading-font-family: sans-serif;
$initialize-heading-margins: 1em 0 0.75em;
```

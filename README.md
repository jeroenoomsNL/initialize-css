# Initialize.css
Initialize.css is a complete and customizable collection of CSS best practices based on Normalize.css and HTML5 Boilerplate.

## Usage

npm:
```bash
npm install initialize-css
```

sass / scss:
```
@import: "node_modules/initialize-css/initialize";
```

with browserify:
```
@import: "initialize";
```

## Configure

Overwrite default values for generic typography:
```
$initialize-font-family: sans-serif;
$initialize-font-size: 1em;
$initialize-line-height: 1.4;
```

Optional values:
```
$initialize-color: #000;
$initialize-block-margins: 0 0 0.75em;
```

```
$initialize-heading-color: #000;
$initialize-heading-font-family: sans-serif;
$initialize-heading-margins: 1em 0 0.75em;
```
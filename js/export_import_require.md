# export, import, require

## Overview

- CommonJS Syntax
  - `require`
  - `exports.foo`
  - `module.exports`
- ES6 Syntax
  - `import`
  - `export`
- Babel transpiles `import` into `require`
- Functions without `export` keywords aren't available even when you `require` it in other files

## CommonJS

```js
// sayAdd is available in other files
exports.sayAdd = function(a, b) {
  say(a + b);
};

// saySubstract is NOT available in other files
saySubtract = function(a, b) {
  say(a - b);
};
```

```js
var Movie = function(title) {
  this.title = title;
};

Movie.prototype.sayTitle = function() {
  say(this.title);
};

module.exports = Movie;
```

## ES6 `import`

- Reference:

  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

- `import *` is convenient, but not recommended

```js
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export1 [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import {
  reallyReallyLongModuleExportName as shortName,
  anotherLongModuleName as short
} from '/modules/my-module.js';
import "module-name";
var promise = import("module-name");
```

### Dynamic Import

- Use `import` in the control statement
- This will be useful for app performance

```js
const main = document.querySelector("main");
for (const link of document.querySelectorAll("nav > a")) {
  link.addEventListener("click", e => {
    e.preventDefault();

    import("/modules/my-module.js")
      .then(module => {
        module.loadPageInto(main);
      })
      .catch(err => {
        main.textContent = err.message;
      });
  });
}



// import supports await
let module = await import('/modules/my-module.js');

// import is thenable
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
});
```


## ES6 `export`

- References:
  - https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
- Named Exports vs Default Exports
  - default をつけた場合には、一つのファイルに一つの export しか書けない
  - default をつけた場合、import 時に`{}`が不要
- You can `export` anything; function, class, varible...

```js
// Exporting individual features
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function functionName(){...}
export class ClassName {...}

// Export list
export { name1, name2, …, nameN };

// Renaming exports
export { variable1 as name1, variable2 as name2, …, nameN };

// Exporting destructured assignments with renaming
export const { name1, name2: bar } = o;

// Default exports
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

// Aggregating modules
export * from …; // does not set the default export
export * as name1 from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …;

```

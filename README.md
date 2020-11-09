# Typescript Review

## Getting started

`npm i -g typescript` (this repo is using Node v12.16.2)
then `tsc` (assuming the tsconfig.json file is configured) to compile

## General Notes

- open-source typed syntactic superset of JavaScript, developed by Microsoft.

* Compiles to readable Javascript.

* Comes in 3 parts:

  - Language itself

    - Language Server - a program that feeds text editor a lot of helpful information - autocompletes, tooltips in VS Code

    - Compiler - does type checking, compiles to JS.

  - Like a really fancy linter.

- Works seamlessly with Babel 7.

## Why use Typescript

- Encode constraints and assumptions as part of developer intent
- catch common mistakes, like spelling errors, or incomplete refactors (e.g., adding an argument to a function and leaving one of the function call sites without the extra argument)
- move some runtime errors to compile time, brings static analysis to code.
- provides great DX.

# To compile like ES3 -

`tsc [filename]` => it converts.
use flags: `tsc src/index.ts --target = ES2017 (or ES2015)`
for node: `tsc src/index.ts --target ES2017 --module commonjs` (to get CommonJS)
to watch: `tsc src/indes.ts --watch`

## tsconfig.json

Adding `"declaration": true` to tsconfig generates a _type declaration file_ (.d.ts) that indicates specifics of all variable and function declarations.

Consider having `"strict": true` ultimately, once migrated from JS.
`"noImplicitAny": true` - good to have, to have type safety.
`"target": "es2015"` or whatever target output format we want to have.

Recommended to let Typescript convert to very modern JS, and then use Babel to take it the rest of the way. So leave target as esnext.

Example of more complex tsconfig.json:

```
{
  "compilerOptions": {
    "jsx": "react",
    "strict": true,
    "sourceMap": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "allowJs": true,
    "types": [],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": node,
    "target": "es2015"
  }
}
```

This allows for tsx files. Strict is important after migrating.

## Some notes:

### Top Types

"Any" type is a "top type," which we should probably not use very often, and have it be intentionally a wildcard value.

### Type Annotation

e.g., `let z: number`. So if we are declaring a variable but not initializing it, we can still declare the type.

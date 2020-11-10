# Typescript Review

From Front End Masters course on Typescript 3 Fundamentals - https://frontendmasters.com/courses/typescript-v2/

Supplemental notes from here: https://www.tutorialsteacher.com/typescript

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

This allows for tsx files. Strict is important after migrating. Maybe set target at "esnext" and use Babel to handle transpilation.

## Some notes:

### Top Types

"Any" type is a "top type," which we should probably not use very often, and have it be intentionally a wildcard value. It generally defeats the purpose of typescript to use this.

### Type Annotation

e.g., `let z: number`. So if we are declaring a variable but not initializing it, we can still declare the type.

### Variables

If we assign `let x = "Hi";` and then later write `x = 42`, it will throw an error, because we have tried to change type.

If we assign `const y = "hello";`, then the type of y is specifically "hello". This is called a literal type.

If we want to instantiate a variable in ts without assigning it a value, we can type `let z:number`, for example.

### Arrays

To declare an array, we can do `let aa: number[] = [];`

_Important_: if we do `let aa = []`, it creates an array of "nevers", a bottom type, and we can't add anything to it.

### Tuple

A tuple in TS is an array of fixed length, with conventions:

```
let bb: [number, string, string, number] = [
  123,
  "Fake Street",
  "Nowhere, USA",
  10110
];
```

Note: if you push to a tuple it is not checked in TS currently. Don't use array methods.

If we want something to be either string or number, we can do `(string | number)`. Or `any`.

### Object Types & Interfaces

`let cc: { houseNumber: number; streetName: string };`

If we do this, all properties are mandatory.

If we want to make something optional, we should make it like this:

`let cc1: { houseNumber: number; streetName?: string }`.

So add `?:`.

#### Interfaces

If we want to re-use this type, we can create an interface.

An interface is a name for a structure.

```
Interface Address {
  houseNumber: number;
  streetName?: string;
}
```

We can then use this like this as a type:

`let ee: Address = { houseNumber: 33 };`

We can then import and export these from modules just like values.

### Intersection & Union

Intersection Example:

```
export interface HasPhoneNumber {
  name: string;
  phone: number;
}

export interface HasEmail {
  name: string;
  email: string;
}
```

We can use this:

```
let contactInfo: HasEmail | HasPhoneNumber =
  Math.random > 0.5
    ? {
      // assigning type HasPhoneNumber
      name: "Mike",
      phone: 212121212
    }
    : {
      // assigning type HasEmail
      name: "mike",
      email: "mike@example.com"
    }

```

In this scenario, we can then _only_ access the name, since it's the venn diagram overlap of both types.

Union example:

```

let otherContactInfo = HasEmail & HasPhoneNumber {
  name: "mike",
  email: "mike@example.com",
  phone: "1212212121"
}

```

Now it _has_ to have all properties in the union.

### Type Systems

Type Equivalence

Java, for ex., is a nominal type system - it checks if something is an instance of a class.

Typescript only cares about the shape and structure of an object. It's a structural type system.

Typescript uses the terms "wider" and "narrower" to describe the relative differences in a range of a type's allowable value: Anything (any) > array (any[]) - narrower > array of strings (string[]) > array of 3 ([string, string, string]) > ... > nothing (never)

## Function Basics

Function arguments and return values can have type annotations:

```
function sendEmail(to: HasEmail): { recipient: string; body: string } {
  return {
    recipient: `${to.name} <${to.email}>`,
    body: "You're pre-qualified for a loan! LOL"
  };
}
```

Ex of fat arrow function:

```
const sendMessage = (to: HasPhoneNumber): { recipient: string; body: string } => {
  return {
    recipient: `${to.name} <${to.email}>`,
    body: "You're pre-qualified for a loan! LOL"
  };
}
```

Return types can _always_ be inferred.

Rest parameters are like using `arguments` when the number of arguments in a function is unknown. These have to be array-like:

When the number of parameters that a function will receive is not known or can vary, we can use rest parameters. In JavaScript, this is achieved with the "arguments" variable. However, with TypeScript, we can use the rest parameter denoted by ellipsis ....

```
function Greet(greeting: string, ...names: string[]) {
    return greeting + " " + names.join(", ") + "!";
}

Greet("Hello", "Steve", "Bill"); // returns "Hello Steve, Bill!"

Greet("Hello");// returns "Hello !"
```

We can overload function signatures; e.g., contact via email or via phone:

```

function contactPeople(
  method: "email" | "phone",
  ...people: (HasEmail | HasPhoneNumber)[]
): void {
  if (method === "email") {
    (people as HasEmail[]).forEach(sendEmail);
  } else {
    (people as HasPhoneNumber[]).forEach(sendTextMessage);
  }
  }
}
```

## Interfaces In Depth

Interfaces give us a way to define custom types and use them throughout our code base.

- Call, construct, and Index signatures
- Open interfaces - augmenting types (say imported from other library)
- Access modifier keywords
- Heritage clauses ("extends", "implements")

### Type aliases

we can give a type a name:

`type StringOrNumber = string | number;`

`type HasName = { name: string }`

### Extending interfaces

E.g.,

```
export interface HasInternationalPhoneNumber extends HasPhoneNumber {
  countryCode: string
}
```

### Use interface to describe a call signature

Interfaces can describe objects, functions, arrays - anything that extends from JS object type. No way to use interface for primitive types.

```
// interface
interface ContactMessenger1 {
  (contact: HasEmail | HasPhoneNumber, message: string): void;
}

// alias:
type ContactMessenger2 = (
  contact: HasEmail | HasPhoneNumber,
  message: string
) => void;
```

With function types, we get something called "contextual inference":

```

const emailer: ContactMessenger1 = (_contact, _message) => {
  /** ... */
}

```

### Construct signatures:

very similar to call signatures:

```
interface ContactConstructor {
  new(...args: any[]): HasEmail | HasPhoneNumber;
}
```

### Array example:

```

interface PhoneNumberDict {
  [numberName: string]:
  | undefined
  | {
    areaCode: number;
    num: number;
  };
}

```

Saying this will either not be there, or have the form of the object. By adding undefined, we force a check. So:

```
const d: PhoneNumberDict = {};

if (d.abc) {
  d.abc // now we know this is not undefined, so it has to be
}

```

### Testing!

dtslint - you can test types. https://github.com/microsoft/dtslint

### Classes

New concepts:

- Fields
- Access Modifier Keywords

```

export class Contact implements HasEmail {
  email: string;
  name: string;
  constructor(name:string, email: string) {
    this.email = email;
    this.name = name;
  }
}

```

_implements_ is new - we can implement an interface - a class aligning with an interface.

This above example is verbose.

So shortcut: parameter properties.

Also there are access modifier keywords: `public` - everyone, `protected` - me and subclasses, and `private` - just me.

Different example:

```
class ParamPropContact implements HasEmail {
  constructor {
    public name: string,
    public email: string = "no email";
  }
}
```

There is also `readonly`. Note that there may be javascript consumers of this and that will not prevent any JS people from rewriting it.

#### Abstract Classes

can't be instantiated directly, but can be used to make subclasses.

/**
 * Variable Basics
 */

let x = "Hello World";

/**
 * This reassignment works because the type hasn't changed.
 */
x = "Hello Moon";

/**
 * The below will give us an error, because the type has changed.
 */

// x = 42; // error

/**
 * This is an example of a "string literal type"
 */

const test = "testing123";

// The type is literally "testing123", not string

/** Array */

/**
 * This works
 */

let aa: number[] = [];

// if we just declare an array,
let bb = [];

/**
 * The above is BAD.  It's an array of "nevers" - Typescript's Bottom Type
 * */

/**
 * Tuples
 */

/**
 * Tuples are essentially immutable arrays.
 * We need to be careful to avoid using methdos
 */

/**
 * This takes in Address (num), Street (string),
 * City and Country (string) and zip (num)
 */

const cc: [number, string, string, number] = [
  123,
  "Fake Street",
  "Some Place, USA",
  10110,
];

/**
 * Gotcha for this: Be careful not to use array methods
 * with tuples, because as of right now it doesn't have type safety.
 */

/**
 * Objects
 */

/**
 * Object Types
 */

/**
 * We can declare types like the below.
 * Use : instead of = to assign, and
 * ; after each property
 */

let myObj: { houseNumber: number; streetName: string };

/**
 * Can use optional checks
 */

let myObject2: { houseNumber: number; streetName?: string };

/**
 * Operators
 */

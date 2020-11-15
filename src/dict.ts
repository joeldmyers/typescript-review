export type Dict<T> = {
  [k: string]: T | undefined;
};

// Array.prototype.map, but for Dict
export function mapDict<T, S>(dict: Dict<T>, fn: (arg: T) => S): Dict<S> {
  const out: Dict<S> = {};

  Object.keys(dict).forEach((dKey, idx) => {
    const thisItem = dict[dKey];
    if (typeof thisItem !== "undefined") {
      out[dKey] = fn(thisItem);
    }
  });
  return out;
}

const newDict = mapDict(
  {
    a: "a",
    b: "b",
  },
  (str) => ({ val: str })
);
console.log("new dict", newDict);

// Array.prototype.reduce, but for Dict
export function reduceDict() {}

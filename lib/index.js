'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isObjLiteral(_obj) {
    var _test = _obj;
    return (typeof _obj !== 'object' || _obj === null ? false : ((function () {
        while (!false) {
            if (Object.getPrototypeOf(_test = Object.getPrototypeOf(_test)) === null) {
                break;
            }
        }
        return Object.getPrototypeOf(_obj) === _test;
    })()));
}

class Collection extends Map {
    /**
     * Another way is to use `base: new () => T` or `base: T&Function` but this does not work with abstract classes.
     *
     * @param {AbstractClass | null} [base] The type of the collection, even though it's optional it's better to always pass a param
     * @param {T[] | Record<string|number|symbol, T> | null} [from] Construct new Collection with items from array or object
     *
     * @example
     * ```ts
     * const collection = new Collection<array>(null, ["foo", "bar", "baz"]);
     * const collection = new Collection<array>(Array, ["foo", "bar", "baz"])
     * const collection = new Collection<array>(Array)
     * ```
     */
    constructor(base, from) {
        super();
        this.TName = base ? base.name : "any";
        if (from) {
            if (Array.isArray(from)) {
                for (let i = 0; i < from.length; i++) {
                    this.set(i, from[i]);
                }
            }
            else if (isObjLiteral(from)) {
                for (const [key, value] of Object.entries(from)) {
                    this.set(key, value);
                }
            }
        }
    }
    /**
     * @since 0.4.0
     *
     * @returns {boolean} true if collection is empty else false
     */
    get isEmpty() {
        return this.size === 0;
    }
    /**
     * @since 0.2.0
     *
     * Create a Collection from an Array or Object
     *
     * @param {any[] | Record<string|number|symbol, any>} x The array you want to create a collection from
     * @returns {Collection<any>} The created collection
     */
    static from(x) {
        const col = new Collection();
        if (Array.isArray(x)) {
            for (let i = 0; i < x.length; i++) {
                col.set(i, x[i]);
            }
        }
        else if (isObjLiteral(x)) {
            for (const [key, value] of Object.entries(x)) {
                col.set(key, value);
            }
        }
        return col;
    }
    /**
     * @since 0.3.4
     *
     * Merge multiple collections together
     *
     * @param {Collection<any>[]} collections All the collections you want to merge together
     */
    static merge(...collections) {
        const temp = new Collection();
        for (let i = 0; i < collections.length; i++) {
            for (const [key, value] of collections[i].entries()) {
                temp.set(key, value);
            }
        }
        return temp;
    }
    /**
     * @since 0.2.0
     *
     * Simple set function
     * If `v` has an index named `_key` it will use it as the key
     *
     * @param {T} v Value to add to the collection
     *
     * @example
     * ```ts
     * const collection = new Collection<string>(String);
     * collection.add("foo");
     * // Collection {
     * //     0 => 'foo'
     * // }
     * ```
     */
    add(v) {
        if (v["_key"]) {
            this.set(v["_key"], v);
        }
        else {
            this.set(this.size, v);
        }
    }
    /**
     * @since 0.3.3
     * @since 0.4.3 Added addMany from Collection
     *
     * Add multiple items at once to the collection
     *
     * @param {T[] | Record<string|number|symbol, T>} x The array with items
     *
     * @example
     * ```ts
     * const collection = new Collection<string>(String);
     * collection.addMany(["foo", "bar", "baz", "123"]);
     * collection.addMany({ "foo": "bar", "baz": "123" });
     * // Collection {
     * //     0 => 'foo',
     * //     1 => 'bar',
     * //     2 => 'baz',
     * //     3 => '123',
     * //     'foo' => 'bar',
     * //     'baz' => '123'
     * // }
     * ```
     */
    addMany(x) {
        if (x instanceof Collection) {
            for (const [key, value] of x.entries()) {
                this.set(key, value);
            }
        }
        else if (Array.isArray(x)) {
            for (let i = 0; i < x.length; i++) {
                this.set(this.size, x[i]);
            }
        }
        else if (isObjLiteral(x)) {
            for (const [key, value] of Object.entries(x)) {
                this.set(key, value);
            }
        }
    }
    /**
     * @since 0.1.0
     *
     * Returns first matching Object or undefined if no match
     *
     * @param {Predicate<T>} fn A function that returns true if it matches the given param
     * @returns {T | undefined} The first matching object or undefined if none found
     *
     * @example
     * ```ts
     * const collection = new Collection<string>(String, ["foo", "bar", "baz", "123"]);
     * collection.find((item) => item === "foo");
     * // "foo"
     * ```
     */
    find(fn) {
        for (const item of this.values()) {
            if (fn(item))
                return item;
        }
        return undefined;
    }
    /**
     * @since 0.1.0
     *
     * Returns an Array with all the elements that make the function evaluate true
     *
     * @param {Predicate<T>} fn A function that returns true if it matches the given param
     * @returns {T[]} An array with all the elements that evaluated true
     *
     * @example
     * ```ts
     * const collection = new Collection<string>(String, ["foo", "bar", "baz", "123"]);
     * collection.filter((item) => item.includes("a"));
     * // [
     * //     "bar",
     * //     "baz"
     * // ]
     * ```
     */
    filter(fn) {
        const results = [];
        for (const item of this.values()) {
            if (fn(item))
                results.push(item);
        }
        return results;
    }
    /**
     * @since 0.1.0
     *
     * Returns an Array with the results of applying the given function to each element
     *
     * @param {Function} fn A function that returns a result
     * @returns {R[]} An array with the results
     *
     * @example
     * ```ts
     * const collection = new Collection<string>(String, ["foo", "bar", "baz", "123"]);
     * collection.map((v) => v.replace("a", "o"));
     * // [
     * //     "foo",
     * //     "bor",
     * //     "boz",
     * //     "123"
     * // ]
     * ```
     */
    map(fn) {
        const results = [];
        const arr = Array.from(this.values());
        for (let i = 0; i < arr.length; i++) {
            results.push(fn(arr[i], i, this));
        }
        return results;
    }
    /**
     * @since 0.1.0
     *
     * Merge two collections
     *
     * @param {Collection<T>} x A collection to merge together with this
     * @returns {Collection<T>} The merged collection
     */
    merge(x) {
        const temp = new Collection();
        for (const [_, value] of this) {
            temp.add(value);
        }
        for (const [_, value] of x) {
            temp.add(value);
        }
        return temp;
    }
    /**
     * @since 0.1.0
     *
     * Returns a random Object from the Collection or undefined if the Collection is empty
     *
     * @returns {T|undefined} The random object or undefined if none exist
     */
    random() {
        if (!this.size)
            return undefined;
        return Array.from(this.values())[Math.floor(Math.random() * this.size)];
    }
    /**
     * @since 0.1.0
     */
    toString() {
        return `[Collection<${this.TName}>]`;
    }
    /**
     * @since 0.4.0
     *
     * Returns true if all element matche predicate.
     *
     * @param {Predicate<T>} fn A function that returns a result
     *
     * @returns {boolean}
     */
    all(fn) {
        let allTrue = false;
        for (const [_, value] of this) {
            if (fn(value))
                allTrue = true;
            else
                allTrue = false;
        }
        return allTrue;
    }
    /**
     * @since 0.4.0
     *
     * Returns true if collection has at least one or if predicate is given true when atleast one element matches the predicate.
     *
     * @param {Predicate<T>} fn A function that returns a result
     *
     * @returns {boolean}
     */
    any(fn) {
        if (fn) {
            for (const [_, value] of this) {
                if (fn(value))
                    return true;
            }
            return false;
        }
        else {
            return this.size >= 1;
        }
    }
    /**
     * @since 0.4.0
     *
     * Checks if element is in the collection
     *
     * @param {T} element Element you want to check
     *
     * @returns {boolean} true if element is in collection else false
     */
    contains(element) {
        for (const [_, value] of this) {
            if (element === value)
                return true;
        }
        return false;
    }
    /**
     * @since 0.4.0
     *
     * Checks if all values from given collection are in this collection
     *
     * @param {Collection<T>} collection The collection with values you want to check
     *
     * @returns {boolean} true if all values are in this collection else false
     */
    containsAll(collection) {
        let containsAll = false;
        for (const [_, value] of collection) {
            if (this.contains(value))
                containsAll = true;
            else
                return false;
        }
        return containsAll;
    }
    /**
     * @since 0.4.0
     *
     * Gives the number of items in the collection, if predicate is given the number of items that evaluated true
     *
     * @param {Predicate<T>} fn A function that returns a result
     *
     * @returns {number}
     */
    count(fn) {
        if (fn) {
            let i = 0;
            for (const [_, value] of this) {
                if (fn(value))
                    i++;
            }
            return i;
        }
        else {
            return this.size;
        }
    }
    /**
     * @since 0.4.0
     *
     * Convert collection values to array
     *
     * @returns {T[]}
     */
    array() {
        const arr = [];
        for (const value of this.values()) {
            arr.push(value);
        }
        return arr;
    }
    /**
     * @since 0.4.0
     *
     * Convert collection to object
     *
     * @returns {Record<string|number|symbol, T>}
     */
    object() {
        const obj = {};
        for (const [key, value] of this) {
            obj[key] = value;
        }
        return obj;
    }
}

exports.Collection = Collection;
exports.default = Collection;

export interface AbstractClass {
	name: string;
}
export declare class Collection<T> extends Map<string | number, T> {
	private TName;
	/**
	 * Another way is to use `base: new () => T` or `base: T&Function` but this does not work with abstract classes.
	 *
	 * @param {AbstractClass | null} [base] The type of the collection, even though it's optional it's better to always pass a param
	 * @param {T[] | Record<string|number|symbol, T> | null} [from] Construct new Collection with items from array or object
	 */
	constructor(base?: AbstractClass | null, from?: T[] | Record<string | number | symbol, T> | null);
	/**
	 * @since 0.2.0
	 *
	 * Create a Collection from an Array or Object
	 *
	 * @param {any[] | Record<string|number|symbol, any>} x The array you want to create a collection from
	 * @returns {Collection<any>} The created collection
	 */
	static from(x: any[] | Record<string | number | symbol, any>): Collection<any>;
	/**
	 * @since 0.3.4
	 *
	 * Merge multiple collections together
	 *
	 * @param {Collection<any>[]} collections All the collections you want to merge together
	 */
	static merge(...collections: Collection<any>[]): Collection<any>;
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
	add(v: T): void;
	/**
	 * @since 0.3.3
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
	addMany(x: T[] | Record<string | number | symbol, T>): void;
	/**
	 * @since 0.1.0
	 *
	 * Returns first matching Object or undefined if no match
	 *
	 * @param {Function} fn A function that returns true if it matches the given param
	 * @returns {T | undefined} The first matching object or undefined if none found
	 *
	 * @example
	 * ```ts
	 * const collection = new Collection<string>(String, ["foo", "bar", "baz", "123"]);
	 * collection.find((item) => item === "foo");
	 * // "foo"
	 * ```
	 */
	find(fn: (i: T) => boolean): T | undefined;
	/**
	 * @since 0.1.0
	 *
	 * Returns an Array with all the elements that make the function evaluate true
	 *
	 * @param {Function} fn A function that returns true if it matches the given param
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
	filter(fn: (i: T) => boolean): T[];
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
	map<R>(fn: (v: T, i: number, a: Collection<T>) => R): R[];
	/**
	 * @since 0.1.0
	 *
	 * Merge two collections
	 *
	 * @param {Collection<T>} x A collection to merge together with this
	 * @returns {Collection<T>} The merged collection
	 */
	merge(x: Collection<T>): Collection<T>;
	/**
	 * @since 0.1.0
	 *
	 * Returns a random Object from the Collection or undefined if the Collection is empty
	 *
	 * @returns {T|undefined} The random object or undefined if none exist
	 */
	random(): T | undefined;
	/**
	 * @since 0.1.0
	 */
	toString(): string;
}
export default Collection;

export {};

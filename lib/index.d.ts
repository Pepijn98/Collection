export interface AbstractClass {
	name: string;
}
export declare type Predicate<T> = (i: T) => boolean;
export declare class Collection<T> extends Map<string | number, T> {
	private TName;
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
	constructor(base?: AbstractClass | null, from?: T[] | Record<string | number | symbol, T> | null);
	/**
	 * @since 0.4.0
	 *
	 * @returns {boolean} true if collection is empty else false
	 */
	readonly isEmpty: boolean;
	/**
	 * @since 0.4.0
	 *
	 * @since 0.4.7 make getter and rename
	 *
	 * Convert collection values to array
	 *
	 * @returns {T[]}
	 */
	readonly asArray: T[];
	/**
	 * @since 0.4.0
	 *
	 * @since 0.4.7 make getter and rename
	 *
	 * Convert collection to object
	 *
	 * @returns {Record<string|number|symbol, T>}
	 */
	readonly asObject: Record<string | number | symbol, T>;
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
	addMany(x: T[] | Record<string | number | symbol, T> | Collection<T>): void;
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
	find(fn: Predicate<T>): T | undefined;
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
	filter(fn: Predicate<T>): T[];
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
	/**
	 * @since 0.4.0
	 *
	 * Returns true if all element matche predicate.
	 *
	 * @param {Predicate<T>} fn A function that returns a result
	 *
	 * @returns {boolean}
	 */
	all(fn: Predicate<T>): boolean;
	/**
	 * @since 0.4.0
	 *
	 * Returns true if collection has at least one or if predicate is given true when atleast one element matches the predicate.
	 *
	 * @param {Predicate<T>} fn A function that returns a result
	 *
	 * @returns {boolean}
	 */
	any(fn?: Predicate<T> | null): boolean;
	/**
	 * @since 0.4.0
	 *
	 * Checks if element is in the collection
	 *
	 * @param {T} element Element you want to check
	 *
	 * @returns {boolean} true if element is in collection else false
	 */
	contains(element: T): boolean;
	/**
	 * @since 0.4.0
	 *
	 * Checks if all values from given collection are in this collection
	 *
	 * @param {Collection<T>} collection The collection with values you want to check
	 *
	 * @returns {boolean} true if all values are in this collection else false
	 */
	containsAll(collection: Collection<T>): boolean;
	/**
	 * @since 0.4.0
	 *
	 * Gives the number of items in the collection, if predicate is given the number of items that evaluated true
	 *
	 * @param {Predicate<T>} fn A function that returns a result
	 *
	 * @returns {number}
	 */
	count(fn?: Predicate<T> | null): number;
}
export default Collection;

export {};

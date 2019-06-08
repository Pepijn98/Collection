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
	 * Create a Collection from an Array or Object
	 *
	 * @since 0.2.0
	 *
	 * @param {any[] | Record<string|number|symbol, any>} x The array you want to create a collection from
	 * @returns {Collection<any>} The created collection
	 */
	static from(x: any[] | Record<string | number | symbol, any>): Collection<any>;
	/**
	 * Merge multiple collections together
	 *
	 * @since 0.3.4
	 *
	 * @param {Collection<any>[]} collections All the collections you want to merge together
	 */
	static merge(...collections: Collection<any>[]): Collection<any>;
	/**
	 * Simple set function
	 * If `v` has an index named `_key` it will use it as the key
	 *
	 * @since 0.2.0
	 *
	 * @param {T} v Value to add to the collection
	 */
	add(v: T): void;
	/**
	 * Add multiple items at once to the collection
	 * Works the same as with Collection#add() but with multiple items
	 *
	 * @since 0.3.3
	 *
	 * @param {T[]} a The array with items
	 */
	addMany(a: T[]): void;
	/**
	 * Returns first matching Object or undefined if no match
	 *
	 * @since 0.1.0
	 *
	 * @param {Function} fn A function that returns true if it matches the given param
	 * @returns {T | undefined} The first matching object or undefined if none found
	 */
	find(fn: (i: T) => boolean): T | undefined;
	/**
	 * Returns an Array with all the elements that make the function evaluate true
	 *
	 * @since 0.1.0
	 *
	 * @param {Function} fn A function that returns true if it matches the given param
	 * @returns {T[]} An array with all the elements that evaluated true
	 */
	filter(fn: (i: T) => boolean): T[];
	/**
	 * Returns an Array with the results of applying the given function to each element
	 *
	 * @since 0.1.0
	 *
	 * @param {Function} fn A function that returns a result
	 * @returns {R[]} An array with the results
	 */
	map<R>(fn: (v: T, i: number, a: Collection<T>) => R): R[];
	/**
	 * Merge two collections
	 *
	 * @since 0.1.0
	 *
	 * @param {Collection<T>} x A collection to merge together with this
	 * @returns {Collection<T>} The merged collection
	 */
	merge(x: Collection<T>): Collection<T>;
	/**
	 * Returns a random Object from the Collection or undefined if the Collection is empty
	 *
	 * @since 0.1.0
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

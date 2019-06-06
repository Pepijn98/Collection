interface AbstractClass<T> {
    name: string;
}

export class Collection<T> extends Map<string | number, T> {
    private TName: string;

    /**
     * Another way is to use `base: new () => T` or `base: T&Function` but this does not work with abstract classes.
     *
     * @param {AbstractClass<T>} [base] The type of the collection, even though it's optional it's better to always pass a param
     */
    public constructor(base?: AbstractClass<T>) {
        super();
        this.TName = base ? base.name : "any";
    }

    /**
     * Create a Collection from an array type
     *
     * @param {any[] | Record<string|number|symbol, any>} x The array you want to create a collection from
     * @returns {Collection<any>} The created collection
     */
    public static from(x: any[] | Record<string|number|symbol, any>): Collection<any> {
        const col = new Collection();
        if (Array.isArray(x)) {
            for (let i = 0; i < x.length; i++) {
                col.set(i, x[i]);
            }
        } else if (x instanceof Object) {
            for (const [key, value] of Object.entries(x)) {
                col.set(key, value);
            }
        }
        return col;
    }

    /**
     * Simple set function
     *
     * @param {T} v Value to add to the collection
     */
    public add(v: T): void {
        if ((v as any)["_id"])
            this.set((v as any)["_id"], v);
        else
            this.set(this.size, v);
    }

    /**
     * Returns first matching Object or undefined if no match
     *
     * @param {Function} fn A function that returns true if it matches the given param
     * @returns {T | undefined} The first matching object or undefined if none found
     */
    public find(fn: (i: T) => boolean): T | undefined {
        for (const item of this.values()) {
            if (fn(item)) return item;
        }
        return undefined;
    }

    /**
     * Returns an Array with all the elements that make the function evaluate true
     *
     * @param {Function} fn A function that returns true if it matches the given param
     * @returns {T[]} An array with all the elements that evaluated true
     */
    public filter(fn: (i: T) => boolean): T[] {
        const results: T[] = [];
        for (const item of this.values()) {
            if (fn(item)) results.push(item);
        }
        return results;
    }

    /**
     * Returns an Array with the results of applying the given function to each element
     *
     * @param {Function} fn A function that returns a result
     * @returns {R[]} An array with the results
     */
    public map<R>(fn: (i: T) => R): R[] {
        const results: R[] = [];
        for (const item of this.values()) {
            results.push(fn(item));
        }
        return results;
    }

    /**
     * Merge two collections
     *
     * @param {Collection<T>} x A collection to merge together with this
     * @returns {Collection<T>} The merged collection
     */
    public merge(x: Collection<T>): Collection<T> {
        const temp = new Collection<T>();
        for (const [key, value] of x) {
            temp.set(key, value);
        }
        return temp;
    }

    /**
     * Returns a random Object from the Collection or undefined if the Collection is empty
     *
     * @returns {T|undefined} The random object or undefined if none exist
     */
    public random(): T | undefined {
        if (!this.size) return undefined;
        return Array.from(this.values())[Math.floor(Math.random() * this.size)];
    }

    public toString(): string {
        return `[Collection<${this.TName}>]`;
    }
}

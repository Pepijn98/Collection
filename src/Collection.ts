interface AbstractClass<T> {
    name: string;
}

export class Collection<T> extends Map<string | number, T> {
    private TName: string;

    /**
     * Another way is to use `base: new () => T` or `base: T&Function` but this does not work with abstract classes.
     *
     * @param base The type of the collection
     */
    public constructor(base: AbstractClass<T>) {
        super();
        this.TName = base.name;
    }

    /** Returns first matching Object or undefined if no match */
    public find(fn: (i: T) => boolean): T | undefined {
        for (const item of this.values()) {
            if (fn(item)) return item;
        }
        return undefined;
    }

    /** Returns an Array with all the elements that make the function evaluate true */
    public filter(fn: (i: T) => boolean): T[] {
        const results: T[] = [];
        for (const item of this.values()) {
            if (fn(item)) results.push(item);
        }
        return results;
    }

    /** Returns an Array with the results of applying the given function to each element */
    public map<R>(fn: (i: T) => R): R[] {
        const results: R[] = [];
        for (const item of this.values()) {
            results.push(fn(item));
        }
        return results;
    }

    /** Merge two collections */
    public merge(x: Collection<T>): Collection<T> {
        for (const [key, value] of x) {
            this.set(key, value);
        }
        return this;
    }

    /** Returns a random Object from the Collection or undefined if the Collection is empty */
    public random(): T | undefined {
        if (!this.size) return undefined;
        return Array.from(this.values())[Math.floor(Math.random() * this.size)];
    }

    public toString(): string {
        return `[Collection<${this.TName}>]`;
    }
}

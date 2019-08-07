import Collection from "../../";

describe("Collection", () => {
    describe("#from()", () => {
        const testColl1 = new Collection<string>(String);
        testColl1.add("foo");
        testColl1.add("bar");
        testColl1.add("baz");
        testColl1.add("test");

        const testColl2 = new Collection<string>(String);
        testColl2.set("foo", "foo");
        testColl2.set("bar", "bar");
        testColl2.set("baz", "baz");
        testColl2.set("test", "test");

        const arr = ["foo", "bar", "baz", "test"];
        const obj = { foo: "foo", bar: "bar", baz: "baz", test: "test" };

        it("should be equal to collections made manually", () => {
            const collFromArr = Collection.from(arr);
            const collFromObj = Collection.from(obj);

            expect(collFromArr).toStrictEqual(testColl1);
            expect(collFromObj).toStrictEqual(testColl2);
        });
    });

    describe("#add()", () => {
        const collection = Collection.from(["foo", "bar", "baz", "test"]);
        collection.add("new-item");
        it("should have a size of 5", () => {
            expect(collection.size).toBe(5);
        })
    });

    describe("#addMany()", () => {
        const collection = new Collection<string>(String);
        collection.addMany(["foo", "bar", "baz", "test"]);
        it("should have a size of 4", () => {
            expect(collection.size).toBe(4);
        })
    });

    describe("#find()", () => {
        const collection = Collection.from(["foo", "bar", "baz", "test"]);
        const item = collection.find((v) => v === "foo");
        it("should return foo", () => {
            expect(item).toBe("foo");
        });
    });

    describe("#filter()", () => {
        const collection = Collection.from(["foo", "bar", "baz", "test"]);
        const items = collection.filter((v) => v.includes("a"));
        it("should return 2 items", () => {
            expect(items).toStrictEqual(["bar", "baz"]);
        });
    });

    describe("#map()", () => {
        const collection = Collection.from(["foo", "bar", "baz", "test"]);
        const items = collection.map((v, i) => `${i} => ${v}`);
        const result = ["0 => foo", "1 => bar", "2 => baz", "3 => test"]
        it("should return string[] equal to result", () => {
            expect(items).toStrictEqual(result);
        });
    });

    describe("#merge()", () => {
        const collection = Collection.from(["foo", "bar", "baz", "test"]);
        const collection2 = Collection.from(["new1", "new2"]);

        const shouldBe = Collection.from(["foo", "bar", "baz", "test", "new1", "new2"]);
        const items = collection.merge(collection2);

        it("should merge both collections", () => {
            expect(items).toStrictEqual(shouldBe);
        });
    });

    describe("#random()", () => {
        const collection = Collection.from(["foo", "bar", "baz", "test"]);
        const item = collection.random();
        it("should return a random string", () => {
            expect(typeof item).toBe("string");
        });
    });

    describe("#toString()", () => {
        const collection = new Collection(String);
        it("should return a string", () => {
            expect(collection.toString()).toBe("[Collection<String>]");
        });
    });
});

import Collection from "../../";

describe("Collection", () => {
    describe("#from()", () => {
        const arr = ["foo", "bar", "baz", "test"];
        const obj = { foo: "foo", bar: "bar", baz: "baz", test: "test" };

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

        it("should be equal to collections made manually", () => {
            const aColl = Collection.from(arr);
            const oColl = Collection.from(obj);

            expect(aColl).toStrictEqual(testColl1);
            expect(oColl).toStrictEqual(testColl2);
        });
    });
});

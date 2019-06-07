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
        const testColl1 = new Collection<string>(String);
        testColl1.add("foo");
        testColl1.add("bar");
        testColl1.add("baz");
        testColl1.add("test");
        testColl1.add("new-item");

        it("should have a size of 5", () => {
            expect(testColl1.size).toBe(5);
        })
    });

    describe("#find()", () => {
        const testColl1 = new Collection<string>(String);
        testColl1.add("foo");
        testColl1.add("bar");
        testColl1.add("baz");
        testColl1.add("test");

        const item = testColl1.find((v) => v === "foo");

        it("should return foo", () => {
            expect(item).toBe("foo");
        });
    });

    describe("#filter()", () => {
        const testColl1 = new Collection<string>(String);
        testColl1.add("foo");
        testColl1.add("bar");
        testColl1.add("baz");
        testColl1.add("test");

        const items = testColl1.filter((v) => v.includes("a"));

        it("should return 2 items", () => {
            expect(items).toStrictEqual(["bar", "baz"]);
        });
    });

    describe("#map()", () => {
        const testColl1 = new Collection<string>(String);
        testColl1.add("foo");
        testColl1.add("bar");
        testColl1.add("baz");
        testColl1.add("test");

        const items = testColl1.map((v, i) => `${i} => ${v}`);
        const result = ["0 => foo", "1 => bar", "2 => baz", "3 => test"]

        it("should return string[] equal to result", () => {
            expect(items).toStrictEqual(result);
        });
    });

    describe("#merge()", () => {
        const testColl1 = new Collection<string>(String);
        testColl1.add("foo");
        testColl1.add("bar");
        testColl1.add("baz");
        testColl1.add("test");

        const testColl2 = new Collection<string>(String);
        testColl2.add("new-item2");
        testColl2.add("new-item3");

        const shouldBe = new Collection<string>(String);
        shouldBe.add("foo");
        shouldBe.add("bar");
        shouldBe.add("baz");
        shouldBe.add("test");
        shouldBe.add("new-item2");
        shouldBe.add("new-item3");

        const items = testColl1.merge(testColl2);

        it("should merge both collections", () => {
            expect(items).toStrictEqual(shouldBe);
        });
    });

    describe("#random()", () => {
        const testColl1 = new Collection<string>(String);
        testColl1.add("foo");
        testColl1.add("bar");
        testColl1.add("baz");
        testColl1.add("test");

        const item = testColl1.random();

        it("should return a random string", () => {
            expect(typeof item).toBe("string");
        });
    });

    describe("#toString()", () => {
        const testColl1 = new Collection<string>(String);
        testColl1.add("foo");
        testColl1.add("bar");
        testColl1.add("baz");
        testColl1.add("test");

        it("should return a string", () => {
            expect(testColl1.toString()).toBe("[Collection<String>]");
        });
    });
});

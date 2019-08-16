import { Collection } from "../../"

async function main(): Promise<void> {
    const col = new Collection<string>(String, { "foo": "1", "bar": "2", "baz": "3" })
    const col2 = new Collection<string>(String, { "foo2": "4", "bar2": "5", "baz2": "6" })

    col.addMany(col2)
    console.log(col);
}

main().catch(console.error)
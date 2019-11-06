<div align="center">
    <br />
    <p>
        <a href="https://discord.gg/p895czC">
            <img src="https://discordapp.com/api/guilds/240059867744698368/embed.png" alt="Discord server" />
        </a>
        <a href="https://www.npmjs.com/package/@kurozero/collection">
            <img src="https://img.shields.io/npm/v/@kurozero/collection.svg?maxAge=3600" alt="NPM version" />
        </a>
        <a href="https://www.npmjs.com/package/@kurozero/collection">
            <img src="https://img.shields.io/npm/dt/@kurozero/collection.svg?maxAge=3600" alt="NPM downloads" />
        </a>
        <a href="https://david-dm.org/KurozeroPB/rssemitter">
            <img src="https://img.shields.io/david/kurozeropb/rssemitter.svg?maxAge=3600" alt="Dependencies" />
        </a>
        <a href="https://www.patreon.com/Kurozero">
            <img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" />
        </a>
    </p>
    <p>
        <a href="https://nodei.co/npm/@kurozero/collection/">
            <img src="https://nodei.co/npm/@kurozero/collection.png?downloads=true&stars=true" alt="NPM info" />
        </a>
    </p>
</div>

# Collection

## Docs
https://kurozeropb.github.io/Collection/

## Browser
https://unpkg.com/collection@{VERSION}/lib/index.min.js
```html
<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="Cars">
        <meta name="keywords" content="HTML,JavaScript,Cars">
        <meta name="author" content="KurozeroPB">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cars</title>
    </head>
    <body>
        <script src="https://unpkg.com/collection@{VERSION}/lib/index.min.js"></script>
        <script lang="javascript">
            class Car {
                constructor(details) {
                    this._key = details.name; // _key will be used as the collection key
                    this.name = details.name;
                    this.brand = details.brand;
                }
            }

            const cars = new Collection(Car, [
                new Car({ name: "A6", brand: "Audi" }),
                new Car({ name: "A1", brand: "Audi" }),
                new Car({ name: "A3", brand: "Audi" }),
                new Car({ name: "Polo", brand: "Volkswagen" })
            ]);

            const audis = cars.filter((car) => car.brand === "Audi");
            console.log(audis);
            // [
            //     Car { name: 'A6', brand: 'Audi' },
            //     Car { name: 'A1', brand: 'Audi' },
            //     Car { name: 'A3', brand: 'Audi' }
            // ]
        </script>
    </body>
</html>
```

<br/><br/>

## Node
`yarn add @kurozero/collection` or `npm i --save @kurozero/collection`
```ts
import Collection from "@kurozero/collection";

interface ICarDetails {
    name: string;
    brand: string;
}

class Car {
    public _key: string;
    public name: string;
    public brand: string;

    public constructor(details: ICarDetails) {
        this._key = details.name; // _key will be used as the collection key
        this.name = details.name;
        this.brand = details.brand;
    }
}

const cars = new Collection<Car>(Car);
cars.addMany([
    new Car({ name: "A6", brand: "Audi" }),
    new Car({ name: "A1", brand: "Audi" }),
    new Car({ name: "A3", brand: "Audi" }),
    new Car({ name: "Polo", brand: "Volkswagen" })
]);

const audis = cars.filter((car) => car.brand === "Audi");
console.log(audis);
// [
//     Car { name: 'A6', brand: 'Audi' },
//     Car { name: 'A1', brand: 'Audi' },
//     Car { name: 'A3', brand: 'Audi' }
// ]
```

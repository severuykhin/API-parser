const fs = require('fs');
const file = process.argv[2];
const path = require('path');

let cities;

try {
    cities = require(`./src/data/${file}`);
} catch (e) {
    console.log('No such file');
    process.exit();
}

cities.cities.forEach((element, index) => {
    element.id = index;
});

let filePath = path.resolve(__dirname, `src/data/${file}.json`);

fs.writeFileSync(filePath, JSON.stringify(cities));



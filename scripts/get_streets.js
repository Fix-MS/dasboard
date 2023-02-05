
const fs = require('fs');

const data = fs.readFileSync('./data/raw/strassen_opendata.geojson').toString();
const json = JSON.parse(data);
const streets = json.features;
const result = {
  streets: [],
};
streets.forEach((street) => {
  (result.streets).push(street.properties.NAME);
});
const dirname = 'src/app/dashboard/assets/geo/';
if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}
fs.writeFileSync( dirname + './streets.json', JSON.stringify(result));


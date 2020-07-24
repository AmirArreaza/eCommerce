// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const ColorThief = require('colorthief');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());


async function asyncCall() {
    const URL_CORS = "https://cors-anywhere.herokuapp.com/";
    const URL = "https://www.farfetch.com/uk/plpslice/listing-api/query?setId=9645&view=180&gender=Men";

    const config = {
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    }

    const values =
        await axios.get(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }

        }).then(function (response) {
            return response.data.listing.products.slice(0, 10);
        })
            .catch(function (error) {
                console.log(error);
            });
    return values;
}

async function getColorPredominance(img) {
    const rgb = await ColorThief.getColor(img)
    .then(color => {
        const hex = rgbToHex(color[0], color[1], color[2]);
        return hex;
    });
    return rgb;
}

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('')

app.get('/', async (req, res) => {

    console.log('Calling now');


    const products = await asyncCall();

    const prominentProducts = [];

    var promises = products.map(async (product) => {
        const hex = await getColorPredominance(product.images.cutOut).then(color => {
            console.log(color);
            prominentProducts.push({
                name: product.id,
                designer: product.brand.name,
                description: product.shortDescription,
                link: product.url,
                image: product.images.cutOut,
                colour: color
            });
        });
    });

    Promise.all(promises).then(function (results) {
        res.send(prominentProducts);
    });



});

app.listen(5000, err => {
    console.log('I am up and running!');

});


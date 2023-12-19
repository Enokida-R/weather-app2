const express = require("express");
const request = require("request");
const dotenv = require("dotenv").config();

const app = express();



app.use(express.static('public'));

app.get('/weather', (req,res) => {
    const location = req.query.location;

    if (!location) {
        return res.status(400).send('場所が指定されていません');
    }

    const options = {
        url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.API_KEY}`,
        method: "GET",
        json: true,
    };

    request(options,(error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).send('APIリクエストに失敗しました');
        }

        res.json(body);
    });
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
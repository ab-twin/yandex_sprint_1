const express = require('express');
const app = express();
const port = 8081;

const idToLocationMapper = {
    1: "Living Room",
    2: "Bedroom",
    3: "Kitchen",
}

const getData = (id) => {
    const location = idToLocationMapper[id] || 'Unknown';

    return {
        id: id,
        location: location,
        value: Math.floor(Math.random() * 14) + 15,
        unit: '°C',
        status: 'active',
        timestamp: new Date().toISOString(),
        description: ''
    };
}

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

const locationToIdMapper = {
    "Living Room": 1,
    "Bedroom": 2,
    "Kitchen": 3,
}

app.get('/temperature', (req, res) => {
    const location = req.query.location;

    const id = locationToIdMapper[location] || 0;

    const response = getData(id);
    res.json(response);
});



app.get('/temperature/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(!id)) {
        return res.status(400).json({ error: 'ID must be a number' });
    }

    const response = getData(id);
    res.json(response);
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
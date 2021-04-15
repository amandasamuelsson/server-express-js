const express = require('express');
const app = express();
const port = 3000;
const hostname = 'localhost';

const cats = [
    {
        id: 1,
        name: "Marie",
        description: "Marie is a major character in the 1970 Disney animated feature film, The Aristocats.",
        color: "white",
        breed: "turkish angora"
    },
    {
        id: 2,
        name: "Salem Saberhagen",
        description: "Salem Saberhagen is a fictional character from the American Archie Comics comic series Sabrina the Teenage Witch.",
        color: "black",
        breed: "american shorthair"
    },
    {
        id: 3,
        name: "Garfield",
        description: "Garfield is a fictional cat and the protagonist of the comic strip of the same name, created by Jim Davis.",
        color: "orange",
        breed: "persian"
    },
    {
        id: 4,
        name: "Luna",
        description: "Luna is a fictional character from the Japanese manga Sailor Moon.",
        color: "black",
        breed: "alien"
    }
];

//parse incoming body from json to jsobject 
app.use(express.json());

app.get('/api/cats/:id', (req, res) => {
    const id = req.params.id

    const foundCat = cats.find((cat) => {
        return cat.id == id
    })

    if(!foundCat) {
        res.json({"Error": "Detta id finns inte"});
 
    }

    res.json(foundCat);
});

app.get('/api/cats', (req, res) => {
    res.json(cats);
});

app.post('/api/cats', (req, res) => {
    const bodyToSave = req.body

    let idToSave = 0;
    cats.forEach((cat) => {
        if(cat.id > idToSave) {
            idToSave = cat.id
        }
    })
    idToSave++

    cats.push({
        id: idToSave,
        body: bodyToSave
    })
    res.json({
        status: "Added new cat"
    })
});

app.put('/api/cats/:id', (req, res) => {
    const id = req.params.id;
    const bodyToUpdate = req.body
    const updatedCat = {
        id: id,
        body: bodyToUpdate
    };

    for (let i = 0; i < cats.length; i++) {
        if (cats[i].id == id) {
            cats[i] = updatedCat;
            return res.status(201).send({
                success: true,
                updatedCat
        })
    }
}
    res.json(updatedCat);
});

app.delete('/api/cats/:id', (req, res) => {
    let index = cats.findIndex((cat) => {
        return cat.id == req.params.id
    });
    cats.splice(index, 1)

    return res.send(cats);
});


//Start the server
app.listen(port, hostname, () => {
console.log(`Server is running on http://${hostname}:${port}`);
});
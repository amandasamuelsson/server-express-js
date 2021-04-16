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

app.use(express.json());

app.get('/api/cats', (req, res) => {
    res.json(cats);
});

app.get('/api/cats/:id', (req, res) => {
    const id = req.params.id

    const foundCat = cats.find((cat) => {
        return cat.id == id
    })

    if(!foundCat) {
        res.status(404).json({"Error": "This id does not exist"});
    }

    res.json(foundCat);
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
    bodyToSave.id = idToSave

    cats.push(bodyToSave);

    res.status(201).json({
        success: true
    });
});

app.put('/api/cats/:id', (req, res) => {
    const id = req.params.id;
    const bodyToUpdate = req.body
    
    bodyToUpdate.id = parseInt(id)

    for (let i = 0; i < cats.length; i++) {
        if (cats[i].id == id) {
            cats[i] = bodyToUpdate;
            return res.status(201).send({
                success: true
            });
        }
    }   
});

app.delete('/api/cats/:id', (req, res) => {
    let index = cats.findIndex((cat) => {
        return cat.id == req.params.id
    });
    if (index == -1) {
        res.status(404).send('This id does not exist')
        return
    }
    cats.splice(index, 1)

    return res.status(200).send({
        success: true
    });
});

//Start the server
app.listen(port, hostname, () => {
console.log(`Server is running on http://${hostname}:${port}`);
});
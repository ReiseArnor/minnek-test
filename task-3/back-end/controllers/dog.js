const fs = require("fs");
const path = require("path");
const db = require("../models");
const { dog: Dog, subbreed: SubBreed } = db;

const OP = db.Sequelize.Op;

exports.get_dog = async (req, res) => {
    try {
    const id = Number(req.params.id);
        const found_dog = await Dog.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.subbreed
            }]
        });

        if (found_dog) {
            return res.status(200).send({dog: found_dog});
        }

        return res.status(404).send({message: "Dog doesn't exist!"});
    } catch (err) {
        return res.status(500).send({message: err});
    }
};

exports.get_dogs_list = async (req, res) => {
    const startIndex = Number(req.query.startIndex);
    const numberOfItems = Number(req.query.numberOfItems);
    let search = "%";

    if (req.query.search)
    {
        search += req.query.search + "%";
    }

    try {
        const dog_list = await Dog.findAll({
            where: {
                name: {
                    [OP.like]: search
                }
            },
            offset: startIndex,
            limit: numberOfItems,
            include: [{
                model: db.subbreed,
                attributes: ['name'],
            }],
        });

        return res.send({ dog_list: dog_list });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.last_dogs = async (req, res) => {
    try {
        const last_dogs = await Dog.findAll({
            offset: 0,
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{
                model: db.subbreed
            }]
        });

        return res.send({dog_list: last_dogs});
    } catch (err) {
        return res.status(500).send({message: err});
    }
};

exports.create_dog = async (req, res) => {
    const { name, breed, sub_breed } = req.body;
    try {
        console.log("files: ");
        console.log(req.file);

        const new_dog = await Dog.create({
            name: name,
            breed: breed,
            image: req.file.filename,
            user_id: req.user_id,
        });

        if (sub_breed) {
            const new_sub_breeds = sub_breed.split(",");
            for (var index = 0; index < new_sub_breeds.length; index++) {
                await SubBreed.findOrCreate({
                    where: {
                        name: new_sub_breeds[index],
                    },
                    defaults: {
                        name: new_sub_breeds[index],
                    },
                });
            }

            const sub_breeds = await SubBreed.findAll({
                where: {
                    name: {
                        [OP.or]: new_sub_breeds,
                    },
                },
            });

            await new_dog.setSub_breeds(sub_breeds);
            return res
                .status(200)
                .send({ message: "Dog and sub-breeds created!", done: true });
        }

        return res.send({ message: "Dog created!", done: true });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.update_dog = async (req, res) => {
    try {
        const { dog_id, name, breed, sub_breed } = req.body;
        console.log("files: ");
        console.log(req.file);

        const old_dog = await Dog.findOne({
            where: { id: dog_id }
        });
        if (!old_dog) {
            return res.status(404).send({message: "Dog not found!"});
        }

        const n_name = name || old_dog.name;
        const n_breed = breed || old_dog.breed;
        const n_image = req.file.filename || old_dog.image;

        await Dog.update({
            name: n_name,
            breed: n_breed,
            image: n_image,
        }, {
            where: { id: dog_id}
        });

        const updated_dog = await Dog.findOne({
            where: { id: dog_id}
        });

        if (sub_breed) {
            const new_sub_breeds = sub_breed.split(",");
            for (var index = 0; index < new_sub_breeds.length; index++) {
                await SubBreed.findOrCreate({
                    where: {
                        name: new_sub_breeds[index],
                    },
                    defaults: {
                        name: new_sub_breeds[index],
                    },
                });
            }

            const sub_breeds = await SubBreed.findAll({
                where: {
                    name: {
                        [OP.or]: new_sub_breeds,
                    },
                },
            });
            await updated_dog.setSub_breeds(sub_breeds);
            return res
                .status(200)
                .send({ message: "Dog and sub-breeds updated!", done: true });
        }

        return res.send({ message: "Dog updated!", done: true });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.delete_dog = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await Dog.destroy({
            where: { id: id },
        });

        if (!result) {
            return res.status(404).send({ message: "Dog not found!" });
        }

        return res.send({ message: "Dog deleted!", done: true });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.get_dog_count = async (req, res) => {
    try {
        let search = "%";
        if (req.query.search)
        {
            search += req.query.search + "%";
        }

        const count = await Dog.count({
            where: {
                name: {
                    [OP.like]: search
                }
            }
        });
        return res.send({ count: count });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.get_image = async (req, res) => {
    try {
        var file = req.params.img;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({ mensaje: 'Image doesn\'t exist!' });
            }
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

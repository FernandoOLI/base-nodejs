const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save new
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Dado não pode ser vazio!"
        });
        return;
    }

    // Create
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save 
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu durante a criação."
            });
        });
};

// Retrieve all
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.iLike]: `%${title}%`
        }
    } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu durante a recuperação."
            });
        });
};

// Find a single
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro aconteceu durante a recuperação id=" + id
            });
        });
};

// Update
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial foi atualizado com sucesso."
                });
            } else {
                res.send({
                    message: ` Não foi possível atualizar id=${id}. Talvez não tenha sido encontrado ou req.body está vazio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao atualizar id=" + id
            });
        });
};

// Delete a Tutorial
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deletado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não é possivel deletar id=${id}. Talvez não tenha sido encotrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não é possível deletetar id=" + id
            });
        });
};

// Delete all 
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Deletado com sucesso!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu durante a remoção total."
            });
        });
};

// Find all 
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro ocorreu durante a recuperação."
            });
        });
};
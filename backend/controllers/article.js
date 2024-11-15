const Article = require('../models/article');
const fs = require('fs');

exports.getAllArticles = (req, res, next) => {
    Article.find()
        .then((articles) => res.status(200).json({ articles }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
};

exports.createArticle = (req, res, next) => {
    const articleObject = JSON.parse(req.body.article);
    delete articleObject._id;
    delete articleObject._userId;
    
    const article = new Article({
        ...articleObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    article.save()
        .then(() => res.status(201).json({ message: 'Article enregistré !' }))
        .catch((error) => res.status(400).json({ error }));
};
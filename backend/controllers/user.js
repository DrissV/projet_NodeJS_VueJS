const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const { firstname, lastname, phone, email, password, confirmPassword } = req.body;

    if (password === confirmPassword) {
        bcrypt.hash(password, 10)
            .then((hash) => {
                const user = new User({
                    firstname,
                    lastname,
                    phone,
                    email,
                    password: hash,
                });
                
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
    } else {
        res.status(400).send('Les mots de passe ne correspondent pas !');
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' })
                    }
                    
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.getProfile = (req, res, next) => {
    User.findById(req.auth.userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json({
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone,
                email: user.email
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.updateProfile = (req, res, next) => {
    const { firstname, lastname, phone, email, password, confirmPassword } = req.body;
    const updatedData = { firstname, lastname, phone, email };
    const confirmedPassword = password === confirmPassword;
    if (password && confirmedPassword) {
        bcrypt.hash(password, 10)
            .then((hash) => {
                updatedData.password = hash;
                return User.findByIdAndUpdate(req.auth.userId, updatedData, { new: true });
            })
            .then((user) => res.status(200).json({ message: 'Profil mis à jour ', user }))
            .catch((error) => res.status(500).json({ error }));
    } else if (password && !confirmedPassword) {
        res.status(401).json({ message: 'Les mots de passe ne correspondent pas !' });
    } else {
        User.findByIdAndUpdate(req.auth.userId, updatedData, { new: true })
            .then((user) => res.status(200).json({ message: 'Profil mis à jour ', user }))
            .catch((error) => res.status(500).json({ error }));
    }
};
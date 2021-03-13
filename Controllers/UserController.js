const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const validator = require("validator");

const Conversation = require("../Models/Conversation");
const Message = require("../Models/Message");
const Friend = require("../Models/Friend");

exports.signup = (req, res, next) => {
  if (!validator.isStrongPassword(req.body.password)) {
    throw (
      "Le mot de passe doit contenir: une lettre minuscule, une lettre majuscule, un chiffre, " +
      "un caractère spécial et doit faire plus de 8 caractères."
    );
  }
  if (!validator.isEmail(req.body.email)) {
    throw "L'adresse mail renseignée n'est pas valide.";
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.statut(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.statut(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jsonWebToken.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

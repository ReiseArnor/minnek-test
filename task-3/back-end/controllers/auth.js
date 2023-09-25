const db = require("../models");
const config = require("../config/auth");
const { user: User, refresh_token: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(401).send({message: "Invalid credentials!"});
        }

        await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 12),
        });

        return res.send({ message: "User was registered successfully!" });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.signin = async (req, res) => {
    try {
        if (!req.body.username){
            return res.status(401).send({message: "Invalid credentials!"});
        }
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        console.log(1);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        console.log(2);
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid password!",
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration, // 24 hours
        });

        const refresh_token = await RefreshToken.create_token(user);

        return res.status(200).send({
            id: user.id,
            username: user.username,
            accessToken: token,
            refresh_token: refresh_token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.refresh_token = async (req, res) => {
    const { refresh_token: request_token } = req.body;

    if (request_token == null) {
        return res.status(403).send({ message: "Refresh Token is required!" });
    }

    try {
        let refresh_token = await RefreshToken.findOne({
            where: { token: request_token },
        });

        if (!refresh_token) {
            res.status(403).send({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verify_expiration(refresh_token)) {

            RefreshToken.destroy({ where: { id: refresh_token.id } });

            res.status(403).send({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refresh_token.getUser();
        let new_access_token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).send({
            access_token: new_access_token,
            refresh_token: refresh_token.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

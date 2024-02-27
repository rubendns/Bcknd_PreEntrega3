import userModel from '../services/models/user.model.js';
import jwt from "jsonwebtoken";
import { isValidPassword, generateJWToken, PRIVATE_KEY } from "../utils.js";

class JWTController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email: email });

            if (!user) {
                console.warn("User doesn't exist with email: " + email);
                return res.status(204).send({
                    error: "Not found",
                    message: "User not found with email: " + email,
                });
            }

            if (!isValidPassword(user, password)) {
                console.warn("Invalid credentials for user: " + email);
                return res.status(401).send({
                    status: "error",
                    error: "Invalid username or password!",
                });
            }

            const tokenUser = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: user.role,
            };

            const access_token = generateJWToken(tokenUser);

            res.cookie("jwtCookieToken", access_token, {
                maxAge: 60000,
                httpOnly: false,
            });

            res.send({
                status: "success",
                message: "Login success!",
                user: tokenUser,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: "Internal application error.",
            });
        }
    }

    async register(req, res, next) {
        try {
            const existingUser = await userModel.findOne({ email: req.body.email });
            if (existingUser) {
                console.log(`User with email ${req.body.email} already exists.`);
                return res.redirect("/api/jwt/fail-register");
            }
            passport.authenticate("register", {
                failureRedirect: "/api/jwtfail-register",
                successRedirect: "/api/jwt/success-register",
            })(req, res, next);
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).send({ status: "error", message: "Error registering user." });
        }
    }

    async logout(req, res) {
        const token = req.cookies.jwtCookieToken;

        if (!token) {
            return res.redirect("/users/login");
        }
        const decodedToken = jwt.verify(token, PRIVATE_KEY);
        const userName = decodedToken.user.name;

        res.clearCookie("jwtCookieToken");

        console.log(`User ${userName} logged out successfully.`);

        res.redirect("/users/login");
    }
}

export default new JWTController();

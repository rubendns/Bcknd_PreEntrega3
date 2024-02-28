import cartsService from "../services/carts.services.js";

async function getAllCarts(req, res) {
    try {
        let carts = await cartsService.getAllCarts();
        res.json({
        status: "success",
        carts,
        });
    } catch (error) {
        res.json({
        status: "Error",
        error,
        });
    }
    }

    async function getCartById(req, res) {
    try {
        let cid = req.params.cid;
        let cart = await cartsService.getCartById(cid);
        res.json({
        status: "success",
        cart,
        });
    } catch (error) {
        res.send(error.message);
    }
    }

    async function createCart(req, res) {
    try {
        let cart = await cartsService.createCart();
        res.json({
        status: "success",
        cart,
        });
    } catch (error) {
        res.json({
        status: "Error",
        error,
        });
    }
    }

    async function addProductToCart(req, res) {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let response = await cartsService.addProductToCart(cid, pid);
        res.json({
        status: "success",
        response,
        });
    } catch (error) {
        res.send(error.message);
    }
    }

    async function deleteProductFromCart(req, res) {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let response = await cartsService.deleteProductFromCart(cid, pid);
        res.json({
        status: "success",
        response,
        });
    } catch (error) {
        res.send(error.message);
    }
    }

    async function updateCart(req, res) {
    try {
        let cid = req.params.cid;
        let products = req.body;
        let response = await cartsService.updateCart(cid, products);
        res.json({
        status: "success",
        response,
        });
    } catch (error) {
        res.send(error.message);
    }
    }

    async function updateProductQuantity(req, res) {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let quantity = req.body.quantity;
        let response = await cartsService.updateProductQuantity(cid, pid, quantity);
        res.json({
        status: "success",
        response,
        });
    } catch (error) {
        res.send(error.message);
    }
    }

    async function deleteCart(req, res) {
    try {
        let cid = req.params.cid;
        await cartsService.deleteCart(cid);
        res.json({
        status: "success",
        message: "Cart deleted",
        });
    } catch (error) {
        res.send(error.message);
    }
    }

    export {
    getAllCarts,
    getCartById,
    createCart,
    addProductToCart,
    deleteProductFromCart,
    updateCart,
    updateProductQuantity,
    deleteCart,
};

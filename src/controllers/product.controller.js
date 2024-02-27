import ProductDao from "../services/dao/products.dao.js";

const productService = new ProductDao();
export const getAllProducts = async (req, res, next) => {
	try {
		const { page, limit, sort } = req.query;
		const products = await productService.getAllProducts(page, limit, sort);
		res.json(products);
	} catch (error) {
		next(error);
	}
};

export const getProductById = async (req, res, next) => {
	try {
		const { pid } = req.params;
		const product = await productService.getProductById(pid);
		res.json({ message: "success", response: product });
	} catch (error) {
		next(error);
	}
};

export const createProduct = async (req, res, next) => {
	try {
		const product = req.body;
		await productService.createProduct(product);
		res.redirect("/productManager");
	} catch (error) {
		next(error);
	}
};

export const updateProduct = async (req, res, next) => {
	try {
		const { pid } = req.params;
		const product = req.body;
		const response = await productService.updateProduct(pid, product);
		res.json({ message: "success", response });
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (req, res, next) => {
	try {
		const { pid } = req.params;
		const response = await productService.deleteProduct(pid);
		res.json({ message: "Product deleted", response });
	} catch (error) {
		next(error);
	}
};

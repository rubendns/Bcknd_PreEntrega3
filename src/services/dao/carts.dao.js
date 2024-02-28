import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";

class CartDao {
  async getAllCarts() {
    return await cartModel.find();
  }

  async getCartById(cid) {
    return await cartModel.findById(cid);
  }

  async createCart() {
    return await cartModel.create({});
  }

  async addProductToCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const product = await productModel.findById(pid);
    if (!product) {
      throw new Error("Product not found");
    }
    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId === pid
    );
    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, aumenta su cantidad
      cart.products[existingProductIndex].quantity++;
    } else {
      // Si el producto no está en el carrito, agrégalo al carrito
      cart.products.push({ productId: pid, quantity: 1 });
    }
    // Guardar el carrito actualizado en la base de datos
    await cart.save();
    return cart;
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const index = cart.products.findIndex(
      (product) => product.productId === pid
    );
    if (index === -1) {
      throw new Error("Product not found in cart");
    }
    cart.products.splice(index, 1);
    await cart.save();
    return cart;
  }

  async updateCart(cid, products) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    cart.products = products;
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const product = cart.products.find((product) => product.productId === pid);
    if (!product) {
      throw new Error("Product not found in cart");
    }
    product.quantity = quantity;
    await cart.save();
    return cart;
  }

  async deleteCart(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    await cart.remove();
  }
}

export default new CartDao();

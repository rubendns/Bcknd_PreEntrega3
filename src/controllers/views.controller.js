// Cambia esta línea:
import { getAllProducts } from './product.controller.js';

const viewController = {
  renderIndexPage: async (req, res) => {
    try {
      // Obtener todos los productos
      const products = await getAllProducts(req, res); // Cambio aquí

      // Verificar si el usuario está autenticado
      const user = req.session.user || null;

      // Renderizar la vista index con los datos necesarios
      res.render("index", { user: user, products: products });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).send("Error al obtener los productos");
    }
  },
};

export default viewController;


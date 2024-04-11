const {getItem, getItems } = require('../core/item.core'); // Asegúrate de importar correctamente tu función
const { fetchItem, fetchDescription } = require("../repository/item.repository") // Importa tus funciones de la API

// Mock de las funciones de la API para controlar sus respuestas
jest.mock('../repository/item.repository', () => ({
  fetchItem: jest.fn(),
  fetchDescription: jest.fn(),
}));

describe('Pruebas para getItem', () => {
  it('debería responder con un item y autor cuando no hay error', async () => {
    const mockReq = { params: { id: '123' } };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Permite encadenar .json()
    };

    // Configura las respuestas simuladas
    fetchItem.mockResolvedValue({
      id: '123',
      title: 'Producto de prueba',
      currency_id: 'MXN',
      price: 100,
      thumbnail: 'http://example.com/imagen.jpg',
      condition: 'new',
      shipping: { free_shipping: true },
      error: false,
    });
    fetchDescription.mockResolvedValue({
      plain_text: 'Descripción del producto de prueba',
    });

    await getItem(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      author: expect.anything(), // Asume que tienes una variable 'author' definida
      item: {
        id: '123',
        title: 'Producto de prueba',
        price: {
          currency: 'MXN',
          amount: 100,
          decimals: 0,
        },
        picture: 'http://example.com/imagen.jpg',
        condition: 'new',
        free_shipping: true,
        description: 'Descripción del producto de prueba',
      },
    });
  });

  it('debería responder con un error 404 cuando fetchItem retorna un error', async () => {
    const mockReq = { params: { id: '123' } };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // Configura fetchItem para que simule un error
    fetchItem.mockResolvedValue({
      error: true,
    });

    await getItem(mockReq, mockRes);

    // Verifica que el estado 404 y el mensaje de error sean enviados
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(expect.anything()); // Asume que enviarás algún objeto de error
  });
});
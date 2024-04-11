const axios = require('axios');




const fetchItems = 
    async (params = {}) => {
        try {
          const response = await axios.get(process.env.HOST_MELI+"/sites/MLA/search", { params });
          return response.data;
        } catch (error) {
          return {
            "error":true,
            "meaage":"Error al llamar a la API"
          }
        }
      };

     
const fetchItem = 
  async (id) => {
        try {
        const response = await axios.get(process.env.HOST_MELI+"/items/"+id);
        return response.data;
        } catch (error) {
            return {
                "error":true,
                "meaage":"Error al llamar a la API"
              }
        }
  };

  const fetchDescription = 
    async (id) => {
        try {
        const response = await axios.get(process.env.HOST_MELI+"/items/"+id+"/description");
        return response.data;
        } catch (error) {
            return {
                "error":true,
                "meaage":"Error al llamar a la API"
              }
        }
  };


  module.exports = {
    fetchItems,
    fetchItem,
    fetchDescription
  }
const {request, response} = require('express');

const {fetchItems, fetchItem, fetchDescription } = require("../repository/item.repository")


const author = {
   "name":process.env.AUTHOR_NAME,
   "lastname":process.env.AUTHOR_LASTNAME
}


const getItems = async (req = request, res = response) => {

   const {q} = req.query;
   const params = {
    q,
    limit: 4
  };  
   const responseItems = await fetchItems(params);
   const categories = [];
   const items = [];
   responseItems.results.forEach(item => {
    var category_id = item.category_id;

    if(responseItems.filters.length == 0){
      categories.push(category_id);
    }

    responseItems.filters.forEach(filter => {
      if(filter.id == 'category'){
        filter.values.forEach(value => {
          if(value.id == category_id){
            categories.push(value.name);
          }
        });
      }
    });
      var item={
        "id": item.id,
        "title": item.title, 
        "price":{
          "currency": item.currency_id, 
          "amount": item.price, 
          "decimals": 0
        },
        "picture": item.thumbnail,
        "condition": item.condition, 
        "free_shipping": item.shipping.free_shipping  
      }
      
      items.push(item);     
   

    
  });
    res.json({
        'author':author,
        'categories':categories,
        'items':items
    })
  }

  const getItem = async (req = request, res = response) => {
    const id = req.params.id;

    const responseItem = await fetchItem(id);

    if(responseItem.error == true){
      console.log(responseItem);
      return res.status(404).json(responseItem);
    }
    
    const responseDescription = await fetchDescription(id);

    var item={
      "id": responseItem.id,
      "title": responseItem.title, 
      "price":{
        "currency": responseItem.currency_id, 
        "amount": responseItem.price, 
        "decimals": 0
      },
      "picture": responseItem.thumbnail,
      "condition": responseItem.condition, 
      "free_shipping": responseItem.shipping.free_shipping,
      "description": responseDescription.plain_text  
    }

    res.json({
      'author':author,
      'item':item});


    }


  module.exports = {
    getItems,
    getItem
  }
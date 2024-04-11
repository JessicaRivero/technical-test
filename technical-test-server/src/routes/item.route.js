const {Router} = require('express');
const {getItem, getItems } = require('../core/item.core');

const itemRouter = Router();

itemRouter.get('/:id', getItem );
itemRouter.get('/', getItems );

module.exports = itemRouter;


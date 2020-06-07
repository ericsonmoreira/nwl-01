import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

// index, show, create, updata, delete --> Dadão da comunidade.

// usado para upload de arquivos.
const upload = multer(multerConfig);

// Listar os items
routes.get('/items', itemsController.index);

// Criar um novo ponto de coleta
routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    })
  }, { abortEarly: false }),
  pointsController.create
);

// Lista os pontos de coleta
routes.get('/points', pointsController.index);

// Buscar um ponto de coleta expecífico
routes.get('/points/:id', pointsController.show);

export default routes;
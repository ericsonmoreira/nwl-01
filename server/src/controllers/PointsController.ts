import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {

  async index(request: Request, response: Response) {
    // filtros: cidade, uf, items --> buscar pelos Query
    const { city, uf, items } = request.query;

    // trim() => tira os espaços que ficam na direita e esquerda de uma String.
    const parsedItems = String(items).
      split(',').
      map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.1.2:3333/uploads/${point.image}`
      }
    });

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    // se ponto de coleta não existir, retorna uma mensagem de erro.
    if (!point)
      return response.status(400).json({ message: 'Point not found.' });

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.1.2:3333/uploads/${point.image}`
    }

    const items = await knex('items').
      join('point_items', 'items.id', '=', 'point_items.item_id').
      where('point_items.point_id', id)
      .select('items.title');

    // retorna o ponto com seus itens
    return response.json({ point: serializedPoint, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    // criando a trasaction
    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0]

    // Os itens vêm como uma string separados por virgula. ex.: 1, 2, 4
    const pointItems = items
      .split(',') // separando pela virgula
      .map((item: string) => Number(item.trim())) // removendo possíveis espaçoes e transformando em number.
      .map((item_id: number) => {
        return {
          point_id,
          item_id
        }
      });

    try {
      await trx('point_items').insert(pointItems);
      await trx.commit(); // commit das auterações.
    } catch (error) {
      await trx.rollback();
      return response.status(400).json({ message: 'Falha na inserção na tabela point_items, verifique se os items informados são válidos' })
    }

    return response.json({ id: point_id, ...point, });
  }
}

export default PointsController;
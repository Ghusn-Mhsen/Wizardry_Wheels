import request from 'supertest';
import { initializeApp, stopServer } from '../../src/index';
import AppDataSource from "../../src/config/DB/db.connection"

import { Application } from 'express';
let app: Application;

beforeAll(async () => {
  app = await initializeApp();
});


afterAll(async () => {
  await AppDataSource.disconnect();
  await stopServer();
});


interface Item {
  _id: string;
  name: string;
  weight: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

describe(' Add Item API', () => {
  it('should create a new  item', async () => {
    const newItem = {
      name: "item5",
      weight: 2,
    };

    const res = await request(app)
      .post('/api/v1/items/')
      .send(newItem);

    expect(res.statusCode).toEqual(201); // Check for created status code
    expect(res.body).toHaveProperty('message', 'Created'); // Check for success message
    expect(res.body).toHaveProperty('data'); // Check for data object

    const createdItem = res.body.data;
    expect(createdItem).toHaveProperty('name', newItem.name); // Check item name
    expect(createdItem).toHaveProperty('weight', newItem.weight); // Check item weight
  });

  it('should fetch a list of  items', async () => {
    const res = await request(app)
      .get('/api/v1/items/')
      .send();

    expect(res.statusCode).toEqual(200); // Check for successful response
    expect(res.body).toHaveProperty('message', 'Success'); // Check for success message
    expect(res.body).toHaveProperty('data'); // Check for data array

    const items = res.body.data;
    expect(items).toBeInstanceOf(Array); // Ensure data is an array


    items.forEach((item: Item) => {
      expect(item).toHaveProperty('_id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('weight');
      expect(item).toHaveProperty('createdAt');
      expect(item).toHaveProperty('updatedAt');
    });
  });
});
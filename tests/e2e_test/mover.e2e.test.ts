import request from "supertest";
import { initializeApp, stopServer } from "../../src/index";
import AppDataSource from "../../src/config/DB/db.connection"
import { Application } from "express";
let app: Application;

beforeAll(async () => {
  app = await initializeApp();
});


afterAll(async () => {
  await AppDataSource.disconnect();
  await stopServer();
});




describe("Mover Endpoints", () => {
  let createdMoverId: string;

  it("should create a new Mover", async () => {
    const res = await request(app)
      .post("/api/v1/movers")
      .send({
        weightLimit: 600,
        questState: "resting",
        items: [
          "6796460f9f51605cfbf77f43",

        ],
        missionsCompleted: 0
      });


    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Created");
    expect(res.body.data).toHaveProperty("weightLimit", 600);
    expect(res.body.data).toHaveProperty("questState", "resting");
    expect(res.body.data).toHaveProperty("missionsCompleted", 0);
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data).toHaveProperty("createdAt");
    expect(res.body.data).toHaveProperty("updatedAt");
    expect(res.body.data).toHaveProperty("__v");

    // Test that the items array is populated
    const createdMover = res.body.data;
    expect(Array.isArray(createdMover.items)).toBeTruthy();
    expect(createdMover.items.length).toBeGreaterThan(0);

    createdMover.items.forEach((itemId: string) => {
      expect(itemId).toMatch(/^[a-f\d]{24}$/); // MongoDB ObjectId pattern
    });

    createdMoverId = res.body.data._id;
  });

  it("should fetch all Movers", async () => {
    const res = await request(app).get("/api/v1/movers");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Success");
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  it("should load items into a Mover", async () => {


    const resItems = await request(app).get("/api/v1/items/").send();
    const ItemId = resItems.body.data[0]._id;

    const res = await request(app)
      .post("/api/v1/movers/load")
      .send({ MoverId: createdMoverId, itemIds: [ItemId] });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Success");
    expect(Array.isArray(res.body.data.items)).toBeTruthy();
    expect(res.body.data.items[0]).toBeTruthy();
  });

  it("should start a mission for a Mover", async () => {
    const res = await request(app)
      .post("/api/v1/movers/start-mission")
      .send({ MoverId: createdMoverId });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Success");
    expect(res.body.data.questState).toEqual("on-mission");
  });

  it("should end a mission for a Mover", async () => {

    const res = await request(app)
      .post("/api/v1/movers/end-mission")
      .send({ MoverId: createdMoverId });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Success");
    expect(res.body.data.questState).toEqual("resting");
    expect(res.body.data.missionsCompleted).toEqual(1);
  });

  it("should fetch the Mover with the most missions completed", async () => {
    const res = await request(app).get("/api/v1/movers/most-completed");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Success");
    expect(Array.isArray(res.body.data)).toBeTruthy();

    const topMover = res.body.data[0];
    expect(topMover).toHaveProperty("_id");
    expect(topMover).toHaveProperty("missionsCompleted");
  });
});

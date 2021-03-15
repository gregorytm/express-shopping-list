process.env.NODE_ENV = "test";

//grab app, supertest and the db
const request = require("supertest");
const app = require("./app");
const items = require("./fakeDb")

let newSnack =  { name: "cheetos", price: ".99"}

beforeEach(async function() {
    items.push(newSnack);
});

afterEach(async function(){
    items.length = 0;
})

describe("GET /items request for all items", () =>{
    test("get all shopping list items", async () => {
        const res = await request(app).get("/items")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ shoppingList: [newSnack] })
    })
})

describe("POST /items", () =>{
    test("create an item for list", async() => {
        const res = await request(app).post("/items").send({ name: "Blue", price: ".99" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item:{name: "Blue", price:".99"} });
    } )
})

describe("/PATCH to /items/:name", () => {
    test ("Updating an item name or price", async () =>{
        const res = await request(app).patch(`/items/${newSnack.name}`).send({ name: "Green", price:".99" })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({item: {name:"Green", price:".99"} });
    })
    test("Responds with 500 if can't find item", async ()  => {
        const response = await request(app).patch(`/items/0`);
        expect(response.statusCode).toBe(500);
      });
    })



        
    describe("DELETE /items/:name", () => {
        test("Deletes a single a item", async () => {
          const response = await request(app)
            .delete(`/items/${newSnack.name}`);
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({ message: "Deleted" });
        });
      });

    // describe("Delete item from db", () =>{
    //     test("removing a item", async () => {
    //         const res = await request(app).delete(`/items/${newSnack.name}`);
    //         expect(res.statusCode).toBe(200);
    //         expect(res.body.toEqual( {message: 'Deleted'} ))
    //     })
    // })
import { randomUUID } from "node:crypto";
import { json } from "./middleware/json.js";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    }
  },
  {
    method: "POST",
    path: "/users",
    handler: async (req, res) => {
      await json(res, req);

      const { name, email } = req.body;

      return res.writeHead(201).end(
        JSON.stringify(
          database.insert("users", {
            id: randomUUID(),
            name,
            email
          })
        )
      );
    }
  },
  {
    method: "DELETE",
    path: "/users/:id",
    handler: async (req, res) => {
      await json(res, req);

      const { name, email } = req.body;

      console.log(email);

      const user = database.select("users").find((value) => value.email === email);
      if (!user) res.writeHead(404).end("Usuário não encontrado");
      console.log(user);
    }
  }
];

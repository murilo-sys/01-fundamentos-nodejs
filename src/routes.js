import { randomUUID } from "node:crypto";
import { json } from "./middleware/json.js";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-rote-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
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
    path: buildRoutePath("/users/:id"),
    handler: async (req, res) => {
      const { id } = req.params;

      database.delete("users", id);
      res.writeHead(200).end("Usuário deletado");
    }
  }
];

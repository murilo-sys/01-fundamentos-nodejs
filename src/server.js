import http from "node:http";
import { routes } from "./routes.js";

// GET BUSCAR RECURSO
// POST CRIAR RECURSO
// PUT ATUALIZAR UM RECURSO ( VARIAS ATUALIZAÇÃÕES AO MESMO TEMPO )
// PATCH ATUALIZAR UMA INFO ESPECIFICA (ESPECIFICO TIPO ACEITAR NOTIFICAÇÕES SIM OU NÃO)
// DELETE DELETAR UM RECURSO NO BACK END

// Stateful - informações guardadas na memória, se derrubar, pode mudar comportamento posteriormente
// Stateless - não depende das informações guardadas na memória

//Cabeçalhos => Metadados

//HTTP - Status Code

// UUID => UNIQUE UNIVERSAL ID

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  console.log(url);

  const route = routes.find((value) => value.method === method && value.path === url);

  if (!route) return res.writeHead(404).end("Not Found");

  route.handler(req, res);
});

//Ouve a porta 3333 no localhost
server.listen(3333);

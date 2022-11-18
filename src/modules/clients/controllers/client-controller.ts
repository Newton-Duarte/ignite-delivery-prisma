import { json, Request, Response } from "express";
import { CreateClientService } from "../services/create-client-service";
import { FindClientService } from "../services/find-client-service";

export class ClientController {
  async index(request: Request, response: Response) {
    const client_id = request.client_id;

    const findClientService = new FindClientService();

    const client = await findClientService.execute(client_id);

    return response.json(client);
  }

  async create(request: Request, response: Response) {
    const { name, username, password, address } = request.body;

    const createClientService = new CreateClientService();

    const client = await createClientService.execute({ name, username, password, address });

    return response.json(client);
  }
}
import { json, Request, Response } from "express";
import { CreateClientService } from "../services/create-client-service";

export class ClientController {
  async create(request: Request, response: Response) {
    const { name, username, password, address } = request.body;

    const createClientService = new CreateClientService();

    const client = await createClientService.execute({ name, username, password, address });

    return response.json(client);
  }
}
import { json, Request, Response } from "express";
import { CreateClientService } from "../services/create-client-service";

export class ClientController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const createClientService = new CreateClientService();

    const client = await createClientService.execute({ username, password });

    return response.json(client);
  }
}
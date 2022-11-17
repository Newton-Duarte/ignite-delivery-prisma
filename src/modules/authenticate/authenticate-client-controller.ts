import { Request, Response } from "express";
import { AuthenticateClientService } from "./authenticate-client-service";

export class AuthenticateClientController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateService = new AuthenticateClientService();

    const result = await authenticateService.execute({ username, password });

    return response.json(result);
  }
}
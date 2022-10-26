import { Request, Response } from "express";
import { AuthenticateClientService } from "./authenticate-client-service";

export class AuthenticateController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateService = new AuthenticateClientService();

    const token = await authenticateService.execute({ username, password });

    return response.json({ token });
  }
}
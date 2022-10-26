import { Request, Response } from "express";
import { AuthenticateDeliverymanService } from "./authenticate-deliveryman-service";

export class AuthenticateDeliverymanController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateService = new AuthenticateDeliverymanService();

    const token = await authenticateService.execute({ username, password });

    return response.json({ token });
  }
}
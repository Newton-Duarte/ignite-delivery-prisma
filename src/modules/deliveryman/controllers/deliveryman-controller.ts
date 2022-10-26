import { json, Request, Response } from "express";
import { CreateDeliverymanService } from "../services/create-deliveryman-service";

export class DeliverymanController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const createDeliverymanService = new CreateDeliverymanService();

    const deliveryman = await createDeliverymanService.execute({ username, password });

    return response.json(deliveryman);
  }
}
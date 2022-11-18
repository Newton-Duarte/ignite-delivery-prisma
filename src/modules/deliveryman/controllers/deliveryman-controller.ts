import { json, Request, Response } from "express";
import { CreateDeliverymanService } from "../services/create-deliveryman-service";
import { FindDeliverymanService } from "../services/find-deliveryman-service";

export class DeliverymanController {
  async index(request: Request, response: Response) {
    const deliveryman_id = request.deliveryman_id;

    const findDeliverymanService = new FindDeliverymanService();

    const client = await findDeliverymanService.execute(deliveryman_id);

    return response.json(client);
  }

  async create(request: Request, response: Response) {
    const { name, username, password } = request.body;

    const createDeliverymanService = new CreateDeliverymanService();

    const deliveryman = await createDeliverymanService.execute({ name, username, password });

    return response.json(deliveryman);
  }
}
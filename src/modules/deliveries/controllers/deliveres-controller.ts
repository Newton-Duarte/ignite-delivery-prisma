import { Request, Response } from "express";
import { CreateDeliveryService } from "../services/create-delivery-service";

export class DeliveriesController {
  async create(request: Request, response: Response) {
    const { item_name } = request.body;
    const { client_id } = request;

    const createDeliveryService = new CreateDeliveryService();

    const delivery = await createDeliveryService.execute({ item_name, client_id });

    return response.status(201).json(delivery);
  }
}
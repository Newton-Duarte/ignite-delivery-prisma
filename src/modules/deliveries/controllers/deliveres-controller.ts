import { Request, Response } from "express";
import { CreateDeliveryService } from "../services/create-delivery-service";
import { FindPendingDeliveries } from "../services/find-pending-deliveries";
import { UpdateDeliveryService } from "../services/update-delivery-service";

export class DeliveriesController {
  async index(request: Request, response: Response) {
    const findPendingDeliveriesService = new FindPendingDeliveries();
    const pendingDeliveries = await findPendingDeliveriesService.execute();
    return response.json(pendingDeliveries);
  }

  async create(request: Request, response: Response) {
    const { item_name } = request.body;
    const { client_id } = request;

    const createDeliveryService = new CreateDeliveryService();

    const delivery = await createDeliveryService.execute({ item_name, client_id });

    return response.status(201).json(delivery);
  }
}
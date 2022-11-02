import { Request, Response } from "express";
import { FindClientDeliveriesService } from "../services/find-client-deliveries-service";

export class ClientDeliveriesController {
  async index(request: Request, response: Response) {
    const { client_id } = request;

    const findClientDeliveriesService = new FindClientDeliveriesService();
    const clientDeliveries = await findClientDeliveriesService.execute(client_id);

    return response.json(clientDeliveries);
  }
}
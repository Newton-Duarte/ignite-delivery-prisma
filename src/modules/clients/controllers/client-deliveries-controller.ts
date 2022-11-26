import { Request, Response } from "express";
import { FindClientDeliveriesService } from "../services/find-client-deliveries-service";

export class ClientDeliveriesController {
  async index(request: Request, response: Response) {
    const { page, per_page } = request.query;
    const { client_id } = request;

    const findClientDeliveriesService = new FindClientDeliveriesService();
    const clientDeliveries = await findClientDeliveriesService.execute({ client_id, page: Number(page) || 1, per_page: Number(per_page) || 5 });

    return response.json(clientDeliveries);
  }
}
import { Request, Response } from "express";
import { FinalizeDeliveryService } from "../services/finalize-delivery-service";

export class FinalizeDeliveryController {
  async update(request: Request, response: Response) {
    const { delivery_id } = request.params;
    const { deliveryman_id } = request;

    const finalizeDeliveryService = new FinalizeDeliveryService();

    const finalizedDelivery = await finalizeDeliveryService.execute({ delivery_id, deliveryman_id });

    response.json(finalizedDelivery);
  }
}
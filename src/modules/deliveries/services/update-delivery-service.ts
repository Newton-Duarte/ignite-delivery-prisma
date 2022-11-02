import { prisma } from "../../../database/prisma";

interface IRequest {
  delivery_id: string;
  deliveryman_id: string;
}

export class UpdateDeliveryService {
  async execute({ delivery_id, deliveryman_id }: IRequest) {
    const delivery = await prisma.deliveries.update({
      where: {
        id: delivery_id
      },
      data: {
        deliveryman_id
      }
    });

    return delivery;
  }
}
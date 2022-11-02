import { prisma } from "../../../database/prisma";

interface IRequest {
  delivery_id: string;
  deliveryman_id: string;
}

export class FinalizeDeliveryService {
  async execute({ delivery_id, deliveryman_id }: IRequest) {
    const delivery = await prisma.deliveries.findFirst({
      where: {
        id: delivery_id
      }
    });

    if (!delivery) {
      throw new Error('Delivery does not exist');
    }

    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new Error('Cannot finalize a delivery from another deliveryman');
    }

    const updatedDelivery = await prisma.deliveries.update({
      where: {
        id: delivery_id
      },
      data: {
        end_at: new Date()
      }
    });

    return updatedDelivery;
  }
}
import { prisma } from "../../../database/prisma";

export class FindDeliverymanService {
  async execute(deliveryman_id: string) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        id: deliveryman_id
      },
      select: {
        id: true,
        username: true,
        name: true,
        deliveries: true,
      }
    });

    return deliveryman;
  }
}
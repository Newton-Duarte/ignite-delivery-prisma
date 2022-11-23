import { prisma } from "../../../database/prisma";

export class FindPendingDeliveriesService {
  async execute() {
    const pendingDeliveries = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        deliveryman_id: null
      },
      include: {
        client: true
      }
    });

    return pendingDeliveries;
  }
}
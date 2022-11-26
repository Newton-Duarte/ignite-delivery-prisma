import { prisma } from "../../../database/prisma";

interface IRequest {
  deliveryman_id: string
  page: number
  per_page?: number
}
export class FindDeliverymanDeliveriesService {
  async execute({ deliveryman_id, page, per_page = 5 }: IRequest) {
    const totalDeliveries = await prisma.deliveries.count({
      where: {
        deliveryman_id
      },
    })
    const deliveries = await prisma.deliveries.findMany({
      where: {
        deliveryman_id
      },
      skip: (page - 1) * per_page,
      take: per_page,
      include: {
        client: true,
        deliveryman: true
      }
    });

    return { data: deliveries, total: totalDeliveries };
  }
}
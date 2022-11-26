import { prisma } from "../../../database/prisma";

interface IRequest {
  client_id: string
  page: number
  per_page?: number
}

export class FindClientDeliveriesService {
  async execute({ client_id, page, per_page = 5 }: IRequest) {
    const totalDeliveries = await prisma.deliveries.count({
      where: {
        client_id
      }
    })
    const deliveries = await prisma.deliveries.findMany({
      where: {
        client_id
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
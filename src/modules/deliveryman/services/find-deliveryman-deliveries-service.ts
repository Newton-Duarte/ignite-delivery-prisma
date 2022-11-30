import { prisma } from "../../../database/prisma";

interface IRequest {
  deliveryman_id: string
  page: number
  per_page?: number
  sort_by: string
  sort: string
  search?: string
}
export class FindDeliverymanDeliveriesService {
  async execute({ deliveryman_id, page, per_page = 5, sort_by, sort, search }: IRequest) {
    const totalDeliveries = await prisma.deliveries.count({
      where: {
        deliveryman_id,
        OR: [
          {
            client: {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            },
          },
          {
            item_name: {
              contains: search,
              mode: 'insensitive'
            },
          }
        ]
      },
    })
    const deliveries = await prisma.deliveries.findMany({
      where: {
        deliveryman_id,
        OR: [
          {
            client: {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            },
          },
          {
            item_name: {
              contains: search,
              mode: 'insensitive'
            },
          }
        ]
      },
      include: {
        client: true,
        deliveryman: true
      },
      skip: (page - 1) * per_page,
      take: per_page,
      orderBy: {
        [sort_by]: sort_by === 'client' ? { name: sort } : sort
      }
    });

    return { data: deliveries, total: totalDeliveries };
  }
}
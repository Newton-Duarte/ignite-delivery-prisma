import { prisma } from "../../../database/prisma";

interface IRequest {
  page: number;
  per_page: number;
  search: string;
  sort: string;
  sort_by: string;
}

export class FindPendingDeliveriesService {
  async execute({ page, per_page, search, sort, sort_by }: IRequest) {
    const totalDeliveries = await prisma.deliveries.count({
      where: {
        end_at: null,
        deliveryman_id: null,
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
      }
    });

    const pendingDeliveries = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        deliveryman_id: null,
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
        client: true
      },
      skip: (page - 1) * per_page,
      take: per_page,
      orderBy: {
        [sort_by]: sort
      }
    });

    return { data: pendingDeliveries, total: totalDeliveries };
  }
}
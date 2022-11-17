import { hash } from "bcrypt";
import { prisma } from "../../../database/prisma";

interface ICreateClient {
  name: string;
  username: string;
  password: string;
  address: string;
}

export class CreateClientService {
  async execute({ name, username, password, address }: ICreateClient) {
    const clientAlreadyExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });

    if (clientAlreadyExists) {
      throw new Error('Client already exists!');
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        name,
        username,
        password: hashPassword,
        address
      }
    });

    return client;
  }
}
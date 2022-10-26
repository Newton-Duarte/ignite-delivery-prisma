import { hash } from "bcrypt";
import { prisma } from "../../../database/prisma";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientService {
  async execute({ username, password }: ICreateClient) {
    const clientAlreadyExists = await prisma.clients.findFirst({
      where: {
        username: {
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
        username,
        password: hashPassword,
      }
    });

    return client;
  }
}
import { Address } from "./Address";

export class Client {
  id: string;
  name: string;
  address: Address;
  phoneNumber: string;
  cpfCnpj: string;
  email: string;
  registeredAt?: Date
}
import { Address } from "./Address";

export class Client {
  id: string;
  name: string;
  address: Address;
  phoneNumber: string;
  personType?: string; // TODO trocar para enum
  cpfCnpj: string;
  email: string;
  registeredAt?: Date
}
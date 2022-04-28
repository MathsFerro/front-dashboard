import { Equipment } from "src/app/shared/models/Equipment";
import { Address } from "./Address";

export class Client {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  address: Address;
  equipments: Equipment[];
}
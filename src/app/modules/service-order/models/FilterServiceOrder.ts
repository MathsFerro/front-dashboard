import { Client } from "src/app/shared/models/Client";
import { Equipment } from "src/app/shared/models/Equipment";
import { ServiceOrderStatus } from "src/app/shared/models/ServiceOrderStatus";

export class FilterServiceOrder {
  client?: Client;
  equipment?: Equipment;
  serviceOrderStatus: ServiceOrderStatus[];
  numberServiceOrder?: number;
}

import { Billing } from "src/app/modules/service-order/types/Billing";
import { Annotation } from "./Annotation";
import { Client } from "./Client";
import { Equipment } from "./Equipment";

export class ServiceOrder {
  id?: number;
  accessory?: string;
  defect?: string;
  assurance?: string;
  diagnostic?: string;
  annotations?: Annotation[];
  billings?: Billing[];
  equipment?: Equipment;
  client?: Client;
}
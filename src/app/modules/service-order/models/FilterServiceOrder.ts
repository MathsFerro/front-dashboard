import { Client } from "src/app/shared/models/Client";
import { EquipmentType } from "src/app/shared/models/enums/EquipmentType";
import { Equipment } from "src/app/modules/equipment/models/Equipment";
import { ServiceOrderStatus } from "src/app/shared/models/ServiceOrderStatus";

export class FilterServiceOrder {
  name?: string;
  serialNumber: number;
  equipmentType: EquipmentType;
  equipment?: Equipment;
  serviceOrderStatus: ServiceOrderStatus[];
  numberServiceOrder?: number;
}
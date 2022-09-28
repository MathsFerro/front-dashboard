import { EquipmentType } from "../../../shared/models/enums/EquipmentType";

export class Equipment {
  id: string;
  description: string;
  serialNumber: string;
  equipmentType: EquipmentType
}
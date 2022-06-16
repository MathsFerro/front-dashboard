import { ServiceOrderStatus } from "../models/ServiceOrderStatus";

export const statusList: ServiceOrderStatus[] = [
  { name: 'Pendente', value: 'PENDING', color: '#0d6efd', selected: false },
  { name: 'Concluida', value: 'COMPLETED', color: '#198754', selected: false },
];
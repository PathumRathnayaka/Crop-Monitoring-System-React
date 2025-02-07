export class EquipmentModel {
    equipmentId: string;
    name: string;
    type: string;
    status: string;
    assignedStaff: string;

    constructor(equipmentId: string, name: string, type: string, status: string, assignedStaff: string) {
        this.equipmentId = equipmentId;
        this.name = name;
        this.type = type;
        this.status = status;
        this.assignedStaff = assignedStaff;
    }
}
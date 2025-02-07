export class VehicleModel{

    vehicleCode: string;
    licensePlate: string;
    vehicleCategory: string;
    fuelType: string;
    status: string;
    allocatedStaff: string;

    constructor(vehicleCode : string, licensePlate : string, vehicleCategory : string, fuelType : string, status : string, allocatedStaff : string) {
        this.vehicleCode = vehicleCode;
        this.licensePlate = licensePlate;
        this.vehicleCategory = vehicleCategory;
        this.fuelType = fuelType;
        this.status = status;
        this.allocatedStaff = allocatedStaff;
    }

}
export class FieldModel {
    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    size: string;
    crops: string;
    staff: string;
    image: string;

    constructor(fieldCode: string, fieldName: string, fieldLocation: string, size: string, crops: string, staff: string, image: string) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.size = size;
        this.crops = crops;
        this.staff = staff;
        this.image = image;
    }



}
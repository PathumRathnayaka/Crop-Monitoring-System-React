export class LogModel{
    logCode: string;
    logDate: string;
    field: string;
    crop: string;
    staff: string;
    logDetails: string;
    observedImage: string;

    constructor(logCode: string, logDate: string, field: string, crop: string, staff: string, logDetails: string, observedImage: string) {
        this.logCode = logCode;
        this.logDate = logDate;
        this.field = field;
        this.crop = crop;
        this.staff = staff;
        this.logDetails = logDetails;
        this.observedImage = observedImage;
    }
}
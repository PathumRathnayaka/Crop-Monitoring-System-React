export class CropModel {
    cropCode: string;
    commonName: string;
    scientificName: string;
    image: string;
    category: string;
    season: string;
    field: string;


    constructor(cropCode: string, commonName: string, scientificName: string, image: string, category: string, season: string, field: string) {
        this.cropCode = cropCode;
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.image = image;
        this.category = category;
        this.season = season;
        this.field = field;
    }

}
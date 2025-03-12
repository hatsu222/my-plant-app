import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Img } from './img.entity';
import { Plant } from '../plants/plant.entity';
import { PlantImgDto } from './dto/plant-img.dto';

@Injectable()
export class ImgService {
  constructor(
    @InjectRepository(Img)
    private imgRepository: Repository<Img>,
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  async savePlantImgs(fileDataArray: PlantImgDto[]): Promise<any> {
    const plant = await this.plantRepository.findOne({
      where: { id: fileDataArray[0].plantId },
    });
    if (fileDataArray[0].plantId) {
      await this.imgRepository.delete({
        plantId: plant,
      });
    }
    for (const fileData of fileDataArray) {
      const plantImgData = new Img();
      plantImgData.plantId = plant;
      plantImgData.fileName = fileData.fileName;
      plantImgData.base64Data = fileData.base64Data;

      await this.imgRepository.save(plantImgData);
    }
    return '画像が正常に保存されました。';
  }

  async getPlantImg(userId: number): Promise<any> {
    const query = `
     SELECT file_name,base64_data,plant_id,plant.favorite,possessed,plant.price,plant.purchase_date
     FROM img
    JOIN plant ON plant.id = img.plant_id
     WHERE (img.plant_id,img.uploaded_at)IN(
     SELECT img.plant_id,MIN(img.uploaded_at)
     FROM img
     JOIN plant ON plant.id=img.plant_id
     WHERE plant.user_id=$1 
     GROUP BY img.plant_id
     )
     `;

    const result = await this.imgRepository.query(query, [userId]);
    return result;
  }
}

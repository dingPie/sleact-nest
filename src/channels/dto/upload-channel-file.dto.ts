import { ApiProperty } from '@nestjs/swagger';

export class UploadChannelFileParamDto {
  @ApiProperty({
    description: 'url',
    example: 'url',
  })
  url: string;

  @ApiProperty({
    description: 'name',
    example: 'name',
  })
  name: string;

  @ApiProperty({
    description: 'userId',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'files',
    example: [
      {
        fieldname: 'image',
        originalname: 'image.png',
        encoding: '7bit',
        mimetype: 'image/png',
      },
    ],
  })
  files: Express.Multer.File[];
}

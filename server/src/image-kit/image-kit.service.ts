import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';

@Injectable()
export class ImageKitService {
    private imagekit: ImageKit;

    constructor(private readonly configService: ConfigService) {
        this.imagekit = new ImageKit({
            publicKey: this.configService.get<string>('IMAGEKIT_PUBLIC_KEY') ?? '',
            privateKey: this.configService.get<string>('IMAGEKIT_PRIVATE_KEY') ?? '',
            urlEndpoint: this.configService.get<string>('IMAGEKIT_URL_ENDPOINT') ?? '',
        });
    }

    getInstance() {
        return this.imagekit;
    }
}

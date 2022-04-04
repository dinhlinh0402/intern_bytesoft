import { Controller, HttpException, HttpStatus, Post, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtUserAuthGuardRestApi } from 'src/auth/jwt-auth-restapi.guard';
import { JwtUserAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileService } from '../uploadfile/file.service';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService,
        private fileService: FileService
    ) { }

    @Post('/upload-thumbnail-product')
    @UseInterceptors(
        FileInterceptor('thumbnail', {
            // storage: diskStorage({
            //     filename: (req, file, callback) => {
            //         console.log('File in filename: ', file);

            //         const name = file.originalname.split('.')[0];
            //         const fileExtName = extname(file.originalname);
            //         console.log('fileExtName', fileExtName);
            //         const randomName = Math.floor(Date.now() / 1000)
            //         callback(null, `linh-${name}-${randomName}-${fileExtName}`);
            //     },
            // }),
            fileFilter: (req, file, callback) => {
                console.log('File in fileFilter: ', file);
                const imageMimeType = [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/webp'
                ];
                if (!imageMimeType.includes(file.mimetype)) {
                    return callback(
                        new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST),
                        false
                    );
                }
                callback(null, true)
            }
        }))
    // @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtUserAuthGuardRestApi)

    async uploadImageThumbnail(
        @UploadedFile() file,
        @Request() req,
    ) {
        console.log(file);
        console.log(req.user);
        const urlImage = await this.fileService.uploadSingleFile(req.user, file)

        if (!urlImage) {
            throw new HttpException('Upload image failed', HttpStatus.BAD_REQUEST);
        }

        return {
            status: 200,
            success: true,
            urlImage
        }
    }
    @Post('/upload-video-product')
    @UseInterceptors(
        FileInterceptor('video', {

            fileFilter: (req, file, callback) => {
                console.log('File in fileFilter: ', file);
                const imageMimeType = [
                    'video/mp4',
                    'video/mp2t',
                ];
                if (!imageMimeType.includes(file.mimetype)) {
                    return callback(
                        new HttpException('Only video files are allowed!', HttpStatus.BAD_REQUEST),
                        false
                    );
                }
                callback(null, true)
            }
        }))
    // @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtUserAuthGuardRestApi)
    async uploadVideo(
        @UploadedFile() file,
        @Request() req,
    ) {
        console.log(file);
        console.log(req.user);

        const urlVideo = await this.fileService.uploadSingleFile(req.user, file)

        if (!urlVideo) {
            throw new HttpException('Upload video failed', HttpStatus.BAD_REQUEST);
        }

        return {
            status: 200,
            success: true,
            urlVideo
        }
    }

    // Array of file
    @Post('/upload-images-product')
    @UseInterceptors(FilesInterceptor('images'))
    @UseGuards(JwtUserAuthGuardRestApi)
    async uploadListImage(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Request() req
    ) {
        console.log(files);
        const imageMimeType = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ];

        for (const file of files) {
            if (!imageMimeType.includes(file.mimetype)) {
                throw new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST)
            }
        }

        const listUrl = await this.fileService.uploadMultiFile(req.user, files)
        // console.log('list Url fomr product.controller: ', listUrl);
        return listUrl;

    }

    // Multiple files
    // @Post('test-multiple')
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'avatar', maxCount: 2 },
    //     { name: 'background', maxCount: 1 },
    // ]))
    // uploadFile(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    //     console.log(files);
    // }
}

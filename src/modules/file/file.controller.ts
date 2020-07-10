import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FILE_MULTER } from '../../libs/providers/storage.provider';
import File from '../../entities/File';
import { FileService } from './file.service';
import { Paginable } from '../../libs/interfaces/paginable';
import { Response } from 'express';
import { JwtAuthGuard } from '../../libs/guards/jwt-auth.guard';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FILE_MULTER)
  @UseGuards(JwtAuthGuard)
  public uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    return this.fileService.create(file);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public getFile(@Param('id') id: string): Promise<File> {
    return this.fileService.getOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public deleteFile(@Param('id') id: string): Promise<void> {
    return this.fileService.remove(id);
  }

  @Get('download/:id')
  @UseGuards(JwtAuthGuard)
  public async downloadFile(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const file = await this.fileService.getOne(id);
    console.log(file.toJSON());
    res.setHeader('Content-Type', file.mimeType);
    res.download(file.path, file.originalName);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FILE_MULTER)
  public replaceFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<File> {
    return this.fileService.replace(id, file);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  public getFiles(
    @Query('page') page: number,
    @Query('list_size') limit: number,
  ): Promise<Paginable<File>> {
    page = page ? +page : undefined;
    limit = limit ? +limit : undefined;
    return this.fileService.getAllInPage(limit, page);
  }
}

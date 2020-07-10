import { Injectable } from '@nestjs/common';
import File from '../../entities/File';
import { Paginable } from '../../libs/interfaces/paginable';

@Injectable()
export class FileService {
  public static readonly DEFAULT_PAGE = 1;
  public static readonly DEFAULT_LIMIT = 10;

  public async create(file: Express.Multer.File): Promise<File> {
    const newFile = new File();
    newFile.init(file);
    try {
      return await newFile.save();
    } catch (e) {
      console.log(e);
      await File.removeFile(newFile);

      throw e;
    }
  }

  public getOne(id: string): Promise<File> {
    return File.findByPk(id);
  }

  public async getAllInPage(
    limit = FileService.DEFAULT_LIMIT,
    page = FileService.DEFAULT_PAGE,
  ): Promise<Paginable<File>> {
    const data = await this.getAll(limit, page);
    const total = await File.count();

    return {
      page,
      limit,
      data,
      total,
    };
  }

  public async getAll(
    limit = FileService.DEFAULT_LIMIT,
    page = FileService.DEFAULT_PAGE,
  ): Promise<File[]> {
    const offset = (page - 1) * limit;

    return File.findAll({ offset, limit });
  }

  public async remove(id: string): Promise<void> {
    const file = await this.getOne(id);
    return file.destroy();
  }

  public async replace(id: string, file: Express.Multer.File): Promise<File> {
    const oldFile = await this.getOne(id);
    const newFile = new File();
    newFile.init(file);
    newFile.id = oldFile.id;
    await oldFile.destroy();
    return newFile.save();
  }
}

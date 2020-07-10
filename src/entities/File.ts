import { extname } from 'path';
import {
  BeforeDestroy,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { stat, Stats, unlink } from 'fs';

@Table
export default class File extends Model<File> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  extension: string;

  @Column
  mimeType: string;

  @Column(DataType.BIGINT)
  size: number;

  @Column(DataType.TEXT)
  path: string;

  @CreatedAt
  uploadedAt: Date;

  public get originalName(): string {
    return `${this.name}.${this.extension}`;
  }

  public init(file: Express.Multer.File): void {
    this.extension = extname(file.originalname).slice(1);

    this.name = File.removeExtension(file.originalname);
    this.id = File.removeExtension(file.filename);
    this.size = file.size;
    this.mimeType = file.mimetype;
    this.path = file.path;
  }

  public checkFileStatus(): Promise<Stats> {
    return new Promise((resolve, reject) => {
      stat(this.path, (err, status) => {
        if (err) return reject(err);

        return resolve(status);
      });
    });
  }

  protected async deleteFile(): Promise<boolean> {
    if (await this.checkFileStatus()) {
      return new Promise((resolve, reject) => {
        unlink(this.path, err => {
          if (err) return reject(err);

          return resolve(true);
        });
      });
    }
    return false;
  }

  @BeforeDestroy
  public static async removeFile(file: File): Promise<void> {
    try {
      await file.deleteFile();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  private static removeExtension(name: string): string {
    const splited = name.split('.');
    return splited.slice(0, splited.length - 1).join('');
  }
}

import * as multer from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

const MULTER_STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return cb(null, `${randomName}${extname(file.originalname)}`);
  },
});

export const FILE_MULTER = FileInterceptor('file', {
  storage: MULTER_STORAGE,
});

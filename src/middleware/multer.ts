import multer from "multer";
import { ErrorApp, extensible } from "../utils";





export const multerMiddleWare = (allowed: string[] = extensible.img) => {
    const fileUploaded = multer({
        storage: multer.diskStorage({}),
        fileFilter: (req: any, file: any, cb: any) => allowed.includes(file?.mimetype) ? cb(null, true)
            : cb(new ErrorApp("Invalid file type", 400), false),
    });
    return fileUploaded
}
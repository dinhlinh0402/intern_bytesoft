export interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
    buffer: any;
}

export interface IFiles extends IFile {
    newName?: string;
}
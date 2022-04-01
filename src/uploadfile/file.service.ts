import { Injectable } from "@nestjs/common";
import { IFile } from "./file.dto";
// const admin = require("firebase-admin");

// import { cert, initializeApp } from 'firebase-admin/app';
// const { getStorage } = require('firebase-admin/storage');
// import { serviceAccount } from '../config/firebase-key'

import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { extname } from "path";
import { UserJwtDto } from "./userJwt.dto";


@Injectable()
export class FileService {
    async uploadSingleFile(user: UserJwtDto, fileInfo: IFile): Promise<any> {
        // console.log('nameFolder: ' + nameFolder);
        console.log('fileInfo: ' + fileInfo);

        /* const BUCKET = 'webbanhang-nestjs.appspot.com'
        initializeApp({
            credential: cert(serviceAccount as any),
            storageBucket: BUCKET
        })
        const bucket = getStorage().bucket();

        const file = bucket.file(fileInfo.filename) */

        // Set the configuration for your app
        // TODO: Replace with your app's config object

        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJEC_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        };
        const firebaseApp = initializeApp(firebaseConfig);

        // Get a reference to the storage service, which is used to create references in your storage bucket
        // const storage = getStorage(firebaseApp);
        const storage = getStorage(firebaseApp, 'gs://webbanhang-nestjs.appspot.com');

        const name = fileInfo.originalname.split('.')[0];
        const fileExtName = extname(fileInfo.originalname);
        console.log('fileExtName', fileExtName);
        const randomName = Math.floor(Date.now() / 1000)
        //         callback(null, `linh-${name}-${randomName}-${fileExtName}`);

        const metadata = {
            contentType: fileInfo.mimetype
        }
        const storageRef = ref(
            storage,
            fileInfo.fieldname === 'image' ? `/products/${user.email}-${user.id}/product's images/${name}-${randomName}-${fileExtName}` : `/products/${user.email}-${user.id}/product's videos/${name}-${randomName}-${fileExtName}`
        )

        console.log(typeof fileInfo.buffer);


        const uploadTask = uploadBytesResumable(storageRef, fileInfo.buffer, metadata);

        // console.log('uploadTask', uploadTask);

        // uploadTask.on('state_changed',
        //     async (snapshot) => {
        //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //         const progress = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log('Upload is ' + progress + '% done');
        //         switch (snapshot.state) {
        //             case 'paused':
        //                 console.log('Upload is paused');
        //                 break;
        //             case 'running':
        //                 console.log('Upload is running');
        //                 break;
        //         }
        //     },
        //     (error) => {
        //         console.log('upload file error: ', error);
        //     },
        //     async () => {
        //         // Upload completed successfully, now we can get the download URL
        //         console.log('đã đến');
        //         await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //             console.log('File available at', downloadURL);
        //         });

        //     }
        // );

        return new Promise(async (resolve, reject) => {
            uploadTask.on('state_changed',
                async (snapshot) => {
                },
                (error) => {
                    console.log('upload file error: ', error);
                },
                async () => {
                    // Upload completed successfully, now we can get the download URL
                    console.log('đã đến');
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        if (!downloadURL) {
                            reject('loi')
                        }
                        resolve(downloadURL)
                    });
                }
            );
        })
    }
}

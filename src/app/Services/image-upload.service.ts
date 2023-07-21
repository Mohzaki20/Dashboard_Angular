import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { deleteObject } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { finalize, from, map, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private storage: Storage,
              private toast: ToastrService

    ) {}
  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    this.toast.success('you have add image successfully')
    return uploadTask.pipe(switchMap((result) =>
       getDownloadURL(result.ref)
       ));

  }

 async deleteImage(path: string) {
    const imageref=ref(this.storage,path)
    return await deleteObject(imageref).then(()=>{
      this.toast.success('you have delete image successfully')

    }).catch((error) => {
      this.toast.error('some error occurred '+error.message)
    })
  }
}







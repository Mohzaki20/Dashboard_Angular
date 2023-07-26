import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Userinfo } from '../../Models/userinfo';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Component({
  selector: 'app-home-mos',
  templateUrl: './home-mos.component.html',
  styleUrls: ['./home-mos.component.css']
})
export class HomeMosComponent implements OnInit{
  user$ = this.userservice.currentUserProfile$;

   userid: string=''
   base64: any;
   Img:any;
   daat: any;
   data1!:Userinfo;
   userdata!:Userinfo;
   profileForm = this.fb.group({
    uid: [''],
    email: [{value: '', disabled: true}],
    firstname: [''],
    lastname: [''],

    password: [{value: '', disabled: true}],
    Userimg: [''],
    displayName: ['']
  });
  constructor(private auth:AuthService,
             private userservice:UserService,
             private fb: FormBuilder,
             private toast:ToastrService ,
             private imageUploadService:ImageUploadService
             ){

  }
  ngOnInit(): void {
    this.userservice.currentUserProfile$
    .pipe(untilDestroyed(this), tap(console.log))
    .subscribe((user) => {
      this.profileForm.patchValue({ ...user });
    });
  }

  uploadFile(event: any, { uid }: Userinfo) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        // this.toast.observe({
        //   loading: 'Uploading profile image...',
        //   success: 'Image uploaded successfully',
        //   error: 'There was an error in uploading the image',
        // }),
        // this.toast.success("success"),
        // this.toast.error("feild"),


        switchMap((photoURL) =>
          this.userservice.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  saveProfile() {
    const { uid, ...data } = this.profileForm.value;

    if (!uid) {
      return;
    }

    this.userservice
      .updateUser({ uid, ...data })
      .pipe(
        // this.toast.success('ssssssss','ddd')
        // this.toast.observe({
        //   loading: 'Saving profile data...',
        //   success: 'Profile updated successfully',
        //   error: 'There was an error in updating the profile',
        // })
      )
      .subscribe();
  }




  // getdata(){

  //  this.auth.getuserdata();

  // }
  //  getuserdata(){
  //   this.daat =this.product.getuser(this.userdata.uid).subscribe(snapshot => {
  //      snapshot.forEach(doc => {
  //       const data = doc.payload.doc.data();
  //       // Handle the data here
  //       // this.data1!= data;
  //       // console.log(data);
  //       // console.log(this.data1);
  //       localStorage.setItem('user',data||)
  //       return data;
  //     });

  //   });

  //   console.log(this.daat.doc);

  // }




  // logout(){
  //   this.auth.logout();
  // }




}

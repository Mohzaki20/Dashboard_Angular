import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { messages } from 'src/app/Models/photos';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  user$ = this.userservice.currentUserProfile$;
  uid: string='';
  msgs:messages[] = [];
  msgform:FormGroup;
  full:boolean = true;
  constructor(
       private fb: FormBuilder,
       private products:ProductService,
       private userservice:UserService,
       private firestore: AngularFirestore){

        this.msgform=this.fb.group({
          fullname:['', [Validators.required]],
          email:['', [Validators.required,Validators.email]],
          msg:['', [Validators.required,Validators.minLength(6)]]
        })
       }
   ngOnInit(): void {
    this.user$.subscribe(user => this.uid=user.uid)



}
  productObj: messages = {
    uid: this.uid,
    fullname:'',
    email:'',
    msg: ''
  };
  get fullname() {
    return this.msgform.get('fullname');
  }
  get email() {
    return this.msgform.get('email');
  }

  get msg() {
    return this.msgform.get('msg');
  }

  sendmsg(){
    console.log(this.uid);
    this.productObj.uid=this.uid;

    const {fullname ,email, msg } = this.msgform.value;
    this.productObj={...this.productObj, fullname, email, msg}
    this.products.addmsg(this.productObj);

  }

  getmessages(){
    this.full=false;

     console.log(this.uid);

    this.products.getmsg(this.uid).subscribe((res) => {
      this.msgs = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
  })
  }
  hidemsg(){
    this.full=true;

  }
  deletemsg(msg:messages){
    this.products.deleteMsg(msg)
  }


}

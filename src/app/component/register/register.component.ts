import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Userinfo } from 'src/app/models/userinfo';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registform:FormGroup;
    userinfo:Userinfo={} as Userinfo;
   imag:any;


  constructor(private auth:AuthService ,private fb:FormBuilder){
    this.registform=this.fb.group({
      firstName:['', [Validators.required,Validators.pattern('[a-zA-Z]{3,}')]],
      lastName:['', [Validators.required,Validators.pattern('[a-zA-Z]{3,}')]],
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(6)]],
      repeatpassword:['', [Validators.required,Validators.minLength(6)]],

    })
  }
  ngOnInit(): void {
  }

  register(){
    this.userinfo={
      firstname:this.registform.value.firstName,
      lastname:this.registform.value.lastName,
      email:this.registform.value.email,
      password:this.registform.value.password,
      Userimg:this.imag,
      uid:''
    }
    const all=this.auth.adduserdata(this.userinfo)
    console.log(this.userinfo);
    console.log(all);

    console.log("hello");


    this.auth.register(this.registform.value.email,this.registform.value.password)

  }
  registwithgoogle(){
    this.auth.loginwithgoogle()
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string='';
  lastName: string='';
  email : string = '';
  password: string='';
  repeatpassword: string='';
  //  userform:FormGroup;

  constructor(private auth:AuthService,private fb:FormBuilder){
    // this.userform=fb.group({
    //   firstName:['',Validators.required,Validators.pattern('[a-zA-Z]{3,}')],
    //   lastName:['',Validators.required,Validators.pattern('[a-zA-Z]{3,}')],
    //   email:['',Validators.required,Validators.email],
    //   password:['',Validators.required,Validators.pattern('[a-zA-Z0-9]{8,}')],
    //   repeatpassword:['',Validators.required,Validators.pattern('[a-zA-Z0-9]{8,}')],

    // })
  }
  ngOnInit(): void {
  }

  register(){
    if(this.email==''){
      alert('plesea enter email')
    }
    if(this.password==''){
      alert('plesea enter password')
    }
    this.auth.register(this.email, this.password)
    this.email='';
    this.password='';
  }
  registwithgoogle(){
    this.auth.loginwithgoogle()
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  loginform:FormGroup;


  constructor(private auth:AuthService ,private fb:FormBuilder){
    this.loginform=this.fb.group({
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(6)]]
    })
  }
  ngOnInit(): void {


  }


  login(){
    const userdata=Object.assign(this.loginform.value,{email:this.loginform.value.email})
    this.auth.login(userdata)

  }
  loginwithgoogle(){
    this.auth.loginwithgoogle();
  }

}

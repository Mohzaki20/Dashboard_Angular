import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
// import { HotToastModule } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  loginform:FormGroup;


  constructor(private auth:AuthService ,
    private fb: NonNullableFormBuilder,
    private toast: ToastrService,
    private router:Router,

    ){
    this.loginform=this.fb.group({
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(6)]]
    })
  }
  ngOnInit(): void {


  }

  get email() {
    return this.loginform.get('email');
  }

  get password() {
    return this.loginform.get('password');
  }
  // login2(){

  //   const userdata=Object.assign(this.loginform.value,{email:this.loginform.value.email})
  //   this.auth.login(userdata)

  // }
  login(){

    const { email, password } = this.loginform.value;
    this.auth
      .login(email, password)
      .pipe(
      )
      .subscribe(() => {
        this.toast.success('Login Success')
        this.router.navigate(['']);
      });

  }
  loginwithgoogle(){
    this.auth.loginwithgoogle();
  }

}

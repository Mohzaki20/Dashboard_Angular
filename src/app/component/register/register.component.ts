import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Userinfo } from '../../models/userinfo';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const repeatpassword = control.get('repeatpassword')?.value;

    if (password && repeatpassword && password !== repeatpassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registform: FormGroup;
  userinfo: Userinfo = {} as Userinfo;
  imag: any = '';


  constructor(private auth: AuthService,
             private fb:FormBuilder ,
             private toast: ToastrService,
             private router:Router,
             private userservice:UserService
  ) {
    this.registform = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatpassword: ['', [Validators.required]],

    },
      {
        validators: passwordsMatchValidator()
      }
    );
  }
  ngOnInit(): void { }
  get email() {
    return this.registform.get('email');
  }

  get password() {
    return this.registform.get('password');
  }

  get repeatpassword() {
    return this.registform.get('repeatpassword');
  }

  get firstname() {
    return this.registform.get('firstname');
  }
  get lastname() {
    return this.registform.get('lastname');
  }





  submit() {
    const { firstname,lastname, email, password } = this.registform.value;
    console.log(email +" "+ password)

    // if (!this.registform.valid || !firstname||lastname || !password || !email) {
    //   return;
    // }
    console.log(email +" "+ password)
    this.auth
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
        this.userservice.addUser({uid , email , firstname ,lastname,password, displayName:firstname })
        )
        // ,
        // this.toast.observe({
        //   success: 'Congrats! You are all signed up',
        //   loading: 'Signing up...',
        //   error: ({ message }) => `${message}`,
        // }
        // )
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

  registwithgoogle() {
    this.auth.loginwithgoogle()
  }

}

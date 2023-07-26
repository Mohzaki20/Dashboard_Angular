import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
 export  class  NavbarComponent implements OnInit {
  user$ = this.userservice.currentUserProfile$;

  constructor(public  auth:AuthService,
       private userservice:UserService,
       private router:Router,
       private toast: ToastrService,

    ){

  }
  ngOnInit(): void {}

  logout(){
    this.auth.logout();
    this.toast.success('you have logged out')
    this.router.navigate(['']);
  }
}

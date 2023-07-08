import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user$ = this.userservice.currentUserProfile$;

  constructor(public  auth:AuthService,
       private userservice:UserService,
       private router:Router
    ){}

  }

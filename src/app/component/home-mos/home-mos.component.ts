import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-mos',
  templateUrl: './home-mos.component.html',
  styleUrls: ['./home-mos.component.css']
})
export class HomeMosComponent implements OnInit{
   userid: string=''
  constructor(private auth:AuthService){}
  ngOnInit(): void {

      this.auth.getUid();
      this.userid = localStorage.getItem('uid')||'';



  }

  getuser(){
    this.auth.getUid();
    this.userid = localStorage.getItem('uid')||'';
    console.log(this.userid);

  }

  logout(){
    this.auth.logout();
  }


}

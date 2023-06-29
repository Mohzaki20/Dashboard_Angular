import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-mos',
  templateUrl: './home-mos.component.html',
  styleUrls: ['./home-mos.component.css']
})
export class HomeMosComponent implements OnInit{
   userid: string=''
   base64: any;
   Img:any;
   daat: any;
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

  getdata(){

   this.auth.getuserdata();

  }

  logout(){
    this.auth.logout();
  }

  getImagepath(event:any){
    const file = event.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      this.base64=reader.result;
      this.Img=this.base64;
    }
  }


}

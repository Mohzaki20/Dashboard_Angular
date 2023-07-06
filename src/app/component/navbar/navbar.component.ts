import { Component, OnInit } from '@angular/core';
import { Userinfo } from 'src/app/models/userinfo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
 export  class  NavbarComponent implements OnInit {

  userdata:Userinfo;
  daat!:any;
  userlogcheck:boolean;
  constructor(private auth:AuthService){
    this.userlogcheck=this.auth.userstate;
    this.userdata={
      firstname:'user',
      lastname:'',
      email:'',
      password:'',
      Userimg:'',
      uid:localStorage.getItem('token')||''
  }
  }
  ngOnInit(): void {
    this.getData();

    this.auth.userstatuschange().subscribe(status=>{
      this.userlogcheck=status;
      console.log(this.userlogcheck);
    }
  )


}



 async  getData() {
   try {
     const snapshot = await this.auth.getuser(this.userdata.uid);
     const data = await snapshot.map(doc => doc.data());
     console.log(data);
      this.daat=data             // or store data in a variable
   } catch (error) {
  console.error(error);
   }
   console.log(this.daat);
  this.userdata=this.daat[0]
  console.log(this.userdata);

 }

  logout(){
    this.auth.logout();
  }
}

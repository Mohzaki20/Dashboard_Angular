import { Component, OnInit } from '@angular/core';
import { Userinfo } from 'src/app/models/userinfo';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

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
   data1!:Userinfo;
   userdata!:Userinfo;
  constructor(private auth:AuthService){
    this.userdata={
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      Userimg:this.base64,
      uid:localStorage.getItem('token')||''
  }
  }
  ngOnInit(): void {

    this.getData();
  }






  // getdata(){

  //  this.auth.getuserdata();

  // }
  //  getuserdata(){
  //   this.daat =this.product.getuser(this.userdata.uid).subscribe(snapshot => {
  //      snapshot.forEach(doc => {
  //       const data = doc.payload.doc.data();
  //       // Handle the data here
  //       // this.data1!= data;
  //       // console.log(data);
  //       // console.log(this.data1);
  //       localStorage.setItem('user',data||)
  //       return data;
  //     });

  //   });

  //   console.log(this.daat.doc);

  // }
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

  savechange(){
    console.log(this.daat[0].id);

    try{
    this.auth.update(this.daat[0].id||'',this.userdata)
    }
    catch(error){
        console.log(error)
    }
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

import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ICategory } from '../../Models/ICategory';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,Validators,
} from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UserService } from 'src/app/services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { Userinfo } from 'src/app/Models/userinfo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { uid } from 'chart.js/dist/helpers/helpers.core';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  user$ = this.userservice.currentUserProfile$;
  arr: string[] = [];
  displayedColumns: string[] = [
    'id',
    'brand',
    'images',
    'price',
    'title',
    'description',
    'stock',
    'rating',
    'color',
    'thumbnail',
    'actions',
  ];
  dataSource: MatTableDataSource<ICategory>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productId: string;
  editForm: FormGroup;
  productsList: ICategory[] = [];
  filterproduct:ICategory[] = [];
  productObj: ICategory = {
    brand: '',
    images: [],
    price: 0,
    SellerId: '',
    description:'',
    title: '',
    rating:0,
    thumbnail:'',
    stock:0
  };
  updatedObj!: ICategory;
  id: string ;
  brand: string ;
  images: string[] = [];
  price: number ;
  SellerId: string = '';
  title: string ;
  description:string;
  rating:number;
  thumbnail:string;
  stock:number;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  category: string;
  category2: string;
  color:string;
  image:string;
  useruid:string;
  constructor(
    private formBuilder: FormBuilder,
    private products: ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private imageUploadService:ImageUploadService,
    private userservice:UserService,
    private firestore: AngularFirestore
  ) {}
  ngOnInit(): void {
    this.user$.subscribe(user => this.useruid=user.uid)
    if (this.category2) {
      this.getAllProducts(this.category2);
    }
    this.editForm = new FormGroup({
      id: new FormControl(''),
      brand: new FormControl(''),
      images: new FormControl([]),
      price: new FormControl(0),
      SellerId: new FormControl(''),
      title: new FormControl(''),
      description:new FormControl(''),
      rating:new FormControl(0),
      thumbnail:new FormControl(''),
      stock:new FormControl(0),
      color:new FormControl('')

    });
    console.log(this.useruid);

  }
  resetForm() {
    this.brand = '';
    this.id = '';
    this.image='';
    this.images = [];
    this.price = 0;
    this.SellerId = '';
    this.description='';
    this.rating=0;
    this.thumbnail='';
    this.stock=0;
    this.title = '';
  }
  uploadFile(event: any,i: number) {
    console.log(this.useruid);

    var id = this.firestore.createId();
    this.arr[i]=id
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/product/${id}`)
      .pipe(
        switchMap((photoURL) =>
         this.images[i]=photoURL,
        )
      )
      .subscribe();

  }

  deleteImage(i:number){
    this.imageUploadService.deleteImage(`images/product/${this.arr[i]}`)
    this.images[i]=null
  }

  getAllProducts(categories: string) {
    this.SellerId=this.useruid

    this.products.getProducts(categories,this.SellerId).subscribe(
      (res) => {
        this.productsList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        this.dataSource = new MatTableDataSource(this.productsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(categories, this.category2, this.productsList);
      },
      (err) => {
        return alert('error');
      }
    );
  }

  deleteProduct(product: ICategory) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.products.deleteProduct(product, this.category2);
    }
  }
  addProduct() {
    this.SellerId=this.useruid
    if (
      this.brand == '' ||
      this.id == '' ||
      this.images == null ||
      this.price == 0 ||
      // this.SellerId == '' ||
      this.description==''||
      this.rating==0||
      this.thumbnail==''||
      this.stock==0||
      this.title == ''
    ) {
      alert('fill all input fields');
    } else {
      this.productObj.brand = this.brand;
      this.productObj.price = this.price;
      this.productObj.id = '';
      this.productObj.images = this.images;
      this.productObj.SellerId = this.SellerId;
      this.productObj.title = this.title;
      this.productObj.description= this.description;
      this.productObj.rating=this.rating;
      this.productObj.thumbnail=this.thumbnail;
      this.productObj.stock=this.stock;
      this.productObj.color= this.color;
      this.products.addProduct(this.productObj, this.category);
      this.resetForm();
    }
  }
  onChange() {
    this.getAllProducts(this.category2);

  }
  setData(id: string) {
    console.log(this.editForm);
    console.log(this.productObj);
    console.log(id, this.category2);

    this.updateData();
    this.products
      .GetProduct(id, this.category2)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
        this.images=data.images
        this.color=data.color
      });
    this.productId = id;
  }

  updateData() {
    this.editForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required]],
      title: ['', [Validators.required]],
      images: this.images,
      SellerId: ['', [Validators.required]],
      description:['', [Validators.required]],
      rating:['', [Validators.required]],
      thumbnail:['', [Validators.required]],
      stock:['', [Validators.required]],
    });
  }

  editProduct() {
    console.log('edit', this.editForm);

    this.products.UpdateProduct(
      this.editForm.value,
      this.productId,
      this.category2
    );
    alert(this.editForm.controls['title'].value + ' updated successfully');
    this.productId = '';
  }
}

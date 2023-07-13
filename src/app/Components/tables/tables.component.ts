import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ICategory } from 'src/app/Models/ICategory';
import { ProductService } from 'src/app/Services/product.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'brand',
    'images',
    'price',
    'title',
    'description',
    'stock',
    'rating',
    'thumbnail',
    'actions',
  ];
  dataSource: MatTableDataSource<ICategory>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productId: string;
  editForm: FormGroup;
  productsList: ICategory[] = [];
  productObj: ICategory = {
    brand: '',
    images: [],
    price: 0,
    // SellerId: '',
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
  // SellerId: string = '';
  title: string ;
  description:string;
  rating:number;
  thumbnail:string;
  stock:number;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  category: string;
  category2: string;

  constructor(
    private formBuilder: FormBuilder,
    private products: ProductService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  ngOnInit(): void {
    if (this.category2) {
      this.getAllProducts(this.category2);
    }
    this.editForm = new FormGroup({
      id: new FormControl(''),
      brand: new FormControl(''),
      images: new FormControl([]),
      price: new FormControl(0),
      // SellerId: new FormControl(''),
      title: new FormControl(''),
      description:new FormControl(''),
      rating:new FormControl(0),
      thumbnail:new FormControl(''),
      stock:new FormControl(0)
    });
  }
  resetForm() {
    this.brand = '';
    this.id = '';
    this.images = [];
    this.price = 0;
    // this.SellerId = '';
    this.description='';
    this.rating=0;
    this.thumbnail='';
    this.stock=0;
    this.title = '';
  }

  getAllProducts(categories: string) {
    this.products.getProducts(categories).subscribe(
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
      // this.productObj.SellerId = this.SellerId;
      this.productObj.title = this.title;
      this.productObj.description= this.description;
      this.productObj.rating=this.rating;
      this.productObj.thumbnail=this.thumbnail;
      this.productObj.stock=this.stock;
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
      });
    this.productId = id;
  }

  updateData() {
    this.editForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required]],
      title: ['', [Validators.required]],
      images: ['', [Validators.required]],
      // SellerId: ['', [Validators.required]],
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

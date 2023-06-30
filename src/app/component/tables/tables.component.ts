import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
// import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ICategory } from 'src/app/Models/IProduct';
import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  prdDetails!: FormGroup;
  productsList: ICategory[] = [];
  productObj: ICategory = {
    brand: '',
    images: [],
    price: 0,
    SellerId: '',
    title: '',
  };
  id: string = '';
  brand: string = '';
  images: string[] = [];
  price: number = 0;
  SellerId: string = '';
  title: string = '';
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  category: string = "";
  category2: string = "";


  constructor(
    private formBuilder: FormBuilder,
    private products: ProductService
  ) {}
  ngOnInit(): void {
    this.getAllProducts(this.category2);
    this.prdDetails = this.formBuilder.group({
      id: [''],
      brand: [''],
      images: [''],
      price: [''],
      SellerId: [''],
      title: [''],
    });
  }
  resetForm() {
    this.brand = '';
    this.id = '';
    this.images = [];
    this.price = 0;
    this.SellerId = '';
    this.title = '';
  }
  // resetForm() {
  //   this.brand = '';
  //   this.id = '';
  //   this.images = [];
  //   this.price = 0;
  //   this.SellerId = '';
  //   this.title = '';
  //   this.prdDetails.reset();
  // }
  getAllProducts(categories : string) {
    this.products.getProducts(categories).subscribe(
      (res) => {
        this.productsList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        return alert('error');
      }
    );
  }
  deleteProduct(product: ICategory) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.products.deleteProduct(product,this.category2);
    }
  }
  addProduct() {
    if (
      this.brand == '' ||
      this.id == '' ||
      this.images == null ||
      this.price == 0 ||
      this.SellerId == '' ||
      this.title == ''
    ) {
      alert('fill all input fields');
    } else {
      this.productObj.brand = this.brand;
      this.productObj.price = this.price;
      this.productObj.id = '';
      this.productObj.images = this.images;
      this.productObj.price = this.price;
      this.productObj.SellerId = this.SellerId;
      this.productObj.title = this.title;
      this.products.addProduct(this.productObj,this.category);
      if (this.id) {
        this.productObj.id = this.id;
        this.products.updateProduct(this.productObj,this.category);
      } else {
        this.products.addProduct(this.productObj,this.category);
      }
      this.resetForm();
    }
  }
  onChange(){
    this.getAllProducts(this.category2);
  }
  // updateProduct(prd:ICategory){
  //   this.prdDetails.controls['id'].setValue(prd.id);
  //   this.prdDetails.controls['brand'].setValue(prd.brand);
  //   this.prdDetails.controls['images'].setValue(prd.images);
  //   this.prdDetails.controls['price'].setValue(prd.price);
  //   this.prdDetails.controls['SellerId'].setValue(prd.SellerId);
  //   this.prdDetails.controls['title'].setValue(prd.title);
  //   this.products.updateProduct(this.productObj);
  // }
  // updateProduct(product: ICategory) {
  //   this.products.updateProduct(product);
  // }
  updateproduct(product : ICategory) {
    // this.deleteProduct(this.productObj);
    // this.addProduct();
    this.products.updateProduct(product,this.category);
  }
  editProduct(product: ICategory) {
    console.log('Editing product:', product);
    this.prdDetails.setValue({
      id: product.id,
      brand: product.brand,
      images: product.images,
      price: product.price,
      SellerId: product.SellerId,
      title: product.title,
    });
  }
}

import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ICategory } from '../../models/ICategory';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,

  Validators,
} from '@angular/forms';
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
    'SellerId',
    'price',
    'title',
    'actions'
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
    title: '',
  };
  updatedObj!: ICategory;
  id: string = '';
  brand: string = '';
  images: string[] = [];
  price: number = 0;
  SellerId: string = '';
  title: string = '';
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  category: string = '';
  category2: string = '';

  constructor(
    private formBuilder: FormBuilder,

    private products: ProductService,
    // private location: Location,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  ngOnInit(): void {
    this.getAllProducts(this.category2);
    // this.prdDetails = this.formBuilder.group({
    //   id: [''],
    //   brand: [''],
    //   images: [''],
    //   price: [''],
    //   SellerId: [''],
    //   title: [''],
    // });
    // this.productId = this.actRoute.snapshot.paramMap.get('id');
    // this.editForm = this.formBuilder.group({
    //   id: [this.productObj.id],
    //   brand: [this.productObj.brand],
    //   images: [this.productObj.images],
    //   price: [this.productObj.price],
    //   SellerId: [this.productObj.SellerId],
    //   title: [this.productObj.title],
    // });
    this.editForm = new FormGroup({
      id: new FormControl(''),
      brand: new FormControl(''),
      images: new FormControl([]),
      price: new FormControl(0),
      SellerId: new FormControl(''),
      title: new FormControl(''),
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
      this.products.addProduct(this.productObj, this.category);
      // if (this.id) {
      //   this.productObj.id = this.id;
      //   this.products.updateProduct(this.productObj,this.category);
      // } else {
      //   this.products.addProduct(this.productObj,this.category);
      // }
      this.resetForm();
    }
  }
  onChange() {
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

  setData(prodId:string,catg:string) {
    console.log(prodId,catg);

   this.products
      .GetProduct(prodId, catg)
      .valueChanges()
      .subscribe((data) => {
        console.log(data)

        // this.editForm.setValue(data);
        // console.log(data)
      });
  }

  updateData() {
    this.editForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required]],
      title: ['', [Validators.required]],
      images: ['', [Validators.required]],
      SellerId: ['', [Validators.required]],
    });
  }

  updateproduct(product: ICategory) {
    // this.deleteProduct(this.productObj);
    // this.addProduct();
    console.log(product);
    this.products.UpdateProduct(this.updatedObj, this.id, this.category);
  }

  editProduct() {
    // console.log('Editing product:', product);
    // console.log(this.editForm);
    // this.updatedObj = product;

    // this.editForm.setValue({
    //   id: product.id,
    //   brand: product.brand,
    //   images: product.images,
    //   price: product.price,
    //   SellerId: product.SellerId,
    //   title: product.title,
    // });
    console.log(this.editForm);

    this.products.UpdateProduct(
      this.editForm.value,
      this.productId,
      this.category
    );
    alert(this.editForm.controls['title'].value + ' updated successfully');
  }
  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   }
  // }
}

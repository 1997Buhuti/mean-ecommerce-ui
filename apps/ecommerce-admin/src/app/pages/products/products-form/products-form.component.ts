import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CategoriesService,
  Products,
  ProductsService,
} from '@mean-ecommerce-ui/products';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { timer } from 'rxjs';

@Component({
  selector: 'mean-ecommerce-ui-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  @ViewChild('fileUpload')
  fileUpload!: FileUpload;

  editMode: boolean = false;
  productForm!: FormGroup;
  isSubmitClicked: boolean = false;
  stateOptions!: any[];
  categories!: any[];
  uploadedFiles: any = [];
  currentProductId!: string;
  currentProductImage!: string;
  isImageEditClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private messageService: MessageService,
    private categoryService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this._editMode();
  }
  private initForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: [null, Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: ['', Validators.required],
      image: [''],
      isFeatured: [''],
    });
    this.stateOptions = [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ];
  }

  onCancelBtnClicked(): void {
    this.router.navigate(['/products']);
  }

  onUpload(event: any) {
    console.log(event);
    for (let file of event.files) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();
    }
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  save() {
    this.fileUpload.upload();
    console.log(this.productForm.value.myFile);
  }

  onSubmit() {
    this.isSubmitClicked = true;
    this.productForm.value.category = this.productForm.value?.category._id;
    console.log(this.productForm.value);
    if (this.productForm.invalid) return;
    const productFormData: FormData = new FormData();
    Object.keys(this.productForm.value).forEach((key, index) => {
      //@ts-ignore
      productFormData.append(key, this.productForm.value[key]);
    });
    this.addProduct(productFormData);
  }

  get productFormControls() {
    return this.productForm.controls;
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onChange(op: any) {
    console.log(this.productForm.value.category);
  }

  private addProduct(product: FormData) {
    this.productService.createProduct(product).subscribe(
      (response: any) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: 'Product Added',
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.router.navigate(['products']);
            });
        }
      },
      (error: string) => {
        this.messageService.add({
          severity: 'error' + error,
          summary: 'Service Error',
          detail: 'Category Not Added',
        });
      }
    );
  }

  private _editMode() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.isImageEditClicked = true;
      //@ts-ignore
      const productId = params.id;
      this.currentProductId = productId;
      console.log(this.currentProductId);
      if (productId) {
        this.editMode = true;
        this.productService.getProduct(productId).subscribe((product) => {
          this.productForm.patchValue({
            name: product.name,
            brand: product.brand,
            price: product.price,
            category: product.category,
            countInStock: product.countInStock,
            description: product.description,
            richDescription: product.richDescription,
            isFeatured: product.isFeatured,
          });
          console.log(product.image);
          console.log(product.name);
          this.currentProductImage = product.image;
        });
      }
    });
  }

  onImageEditClicked() {
    if (this.editMode) {
      this.isImageEditClicked = false;
    } else {
      this.isImageEditClicked = true;
    }
  }
}

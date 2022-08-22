import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'libs/products/src/lib/models/category';
import { CategoriesService } from 'libs/products/src/lib/services/categories.service';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'mean-ecommerce-ui-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  providers: [],
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  editMode: boolean = false;
  isSubmitClicked: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
    this._editMode();
  }

  onCancelBtnClicked(): void {
    this.router.navigate(['/categories']);
  }

  onSubmit(): void {
    this.isSubmitClicked = true;
    const category: Category = {
      name: this.form.value.name,
      icon: this.form.value.icon,
    };

    this.categoryService.createCategory(category).subscribe(
      (response) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: 'Category Added',
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.router.navigate(['categories']);
            });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Service Error',
          detail: 'Category Not Added',
        });
      }
    );
  }

  private _editMode() {
    this.route.params.subscribe((params) => {
      console.log(params);
      //@ts-ignore
      const categoryId = params.id;
      if (categoryId) {
        this.editMode = true;
        this.categoryService.getCategory(categoryId).subscribe((category) => {
          // this.categoryForm.setValue(category.icon);
        });
      }
    });
  }
  get categoryForm() {
    return this.form.controls;
  }
}

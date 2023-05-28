import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@mean-ecommerce-ui/users';
import { MessageService } from 'primeng/api';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'mean-ecommerce-ui-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  editMode: boolean = false;
  currentUSerId!: string;
  isSubmitClicked: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, , Validators.email],
      password: [undefined, Validators.required],
      phone: ['', Validators.required],
      isAdmin: [undefined, Validators.required],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['', Validators.required],
    });
    this._editMode();
  }

  onCancelBtnClicked(): void {
    this.router.navigate(['/users']);
  }

  onSubmit(): void {
    this.isSubmitClicked = true;
    const user: User = {
      id: this.currentUSerId,
      name: this.form.value.name,
      password: this.form.value.password,
      email: this.form.value.email,
      phone: this.form.value.phone,
      isAdmin: this.form.value.isAdmin,
      street: this.form.value.street,
      apartment: this.form.value.apartment,
      zip: this.form.value.zip,
      city: this.form.value.city,
      country: this.form.value.country,
    };
    console.log(user);
    if (this.editMode) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
  }

  private updateUser(user: User) {
    console.log(this.currentUSerId);
    this.usersService.updateUser(user, this.currentUSerId).subscribe({
      next: (response) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: 'User Updated',
          });
          lastValueFrom(timer(2000)).then(() => {
            this.router.navigate(['users']);
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Service Error',
          detail: 'User Not Updated',
        });
      },
    });
  }

  private addUser(user: User) {
    this.usersService.addUser(user).subscribe({
      next: async (response) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: 'User Updated',
          });
          await lastValueFrom(timer(2000)).then(() => {
            this.router.navigate(['users']);
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Service Error',
          detail: 'User Not Added',
        });
      },
    });
  }
  private _editMode() {
    this.route.params.subscribe((params) => {
      console.log(params);
      //@ts-ignore
      const userId = params.id;
      this.currentUSerId = userId;
      console.log(this.currentUSerId);
      if (userId) {
        this.editMode = true;
        this.usersService.getUser(userId).subscribe((user) => {
          this.form.patchValue({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            street: user.street,
            apartment: user.apartment,
            zip: user.zip,
            city: user.city,
            country: user.country,
          });
        });
      }
    });
  }
  get categoryForm() {
    return this.form.controls;
  }
}

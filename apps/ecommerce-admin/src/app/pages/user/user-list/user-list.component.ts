import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@mean-ecommerce-ui/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'mean-ecommerce-ui-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.usersService.users$;
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(() => {
          this.users$.pipe(
            map((users) => users.filter((user) => user.id === userId))
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User with user ${userId}ID is deleted!`,
          });
        });
      },
      reject: () => {
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User is not deleted!',
          });
        };
      },
    });
  }

  updateUser(userId: string) {
    this.router.navigate([`users/form/${userId}`]);
  }
}

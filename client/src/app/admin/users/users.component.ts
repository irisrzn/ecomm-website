import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: any[];
  selectedUser: any = null;

  currentPage = 1;
  itemsPerPage = 4;

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage - 1, this.users.length - 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  updateUserRole(userId: string, role: string) {
    if (userId) {
      this.adminService.updateUserRole(userId, role).subscribe(
        response => {
          console.log('User role updated successfully:', response);
          this.fetchUsers();
        },
        error => {
          console.error('Failed to update user role: ', error);
        }
      )
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Employee {
  name: string;
  email: string;
  department: string;
  position: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
email: any;
  showDetails: boolean=true;
filteredEmployees: any;
  searchQuery: any;
  selectedSortingCriteria: any;
openEditForm(employee: Employee): void {
  this.selectedEmployee = employee;
  this.showEditForm = true;
this.showDetails = false;
}
  @ViewChild('addForm') addForm!: NgForm;

  employees: Employee[] = [
    { name: 'John Doe', email: 'john@example.com', department: 'IT', position: 'Developer' },
    { name: 'Jane Smith', email: 'jane@example.com', department: 'HR', position: 'Manager' },
    { name: 'Abc', email: 'abc@example.com', department: 'HR', position: 'Manager' }
  
  ];

  
  newEmployee: Employee = { name: '', email: '', department: '', position: '' };
  showAddForm: boolean = false;
  selectedEmployee: Employee | null = null;
  showEditForm: boolean = false;
  refreshList: boolean = false;
  sortCriteria: string = '';
  searchCriteria: string = '';


  
  constructor() {
    // Sort employees by name initially
    this.sortByName();
  }
  sortByName() {
    this.sortCriteria = 'name';
    this.employees.sort((a, b) => a.name.localeCompare(b.name));
  }
  sortByDepartment() {
    this.sortCriteria = 'department';
    this.employees.sort((a, b) => a.department.localeCompare(b.department));
  }
  sortByPosition() {
    this.sortCriteria = 'position';
    this.employees.sort((a, b) => a.position.localeCompare(b.position));
  }

  filterEmployees() {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
      employee.department.toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
      employee.position.toLowerCase().includes(this.searchCriteria.toLowerCase())
    );
  }
  sortAndFilter() {
    switch (this.sortCriteria) {
      case 'department':
        this.sortByDepartment();
        break;
      case 'position':
        this.sortByPosition();
        break;
      default:
        this.sortByName();
    }
  }

  showAddEmployeeForm() {
    this.showAddForm = true;
    this.selectedEmployee=null;
    this.showEditForm = false;
  }

  addEmployee() {
    
      this.employees.push({ ...this.newEmployee });
      this.newEmployee = { name: '', email: '', department: '', position: '' };
      this.showAddForm = false;
      this.sortAndFilterEmployees(); // Sort and filter employees after adding a new employee

  }
  sortAndFilterEmployees() {
    this.employees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).sort((a: Employee, b: Employee) => {
      const sortingCriteria = this.selectedSortingCriteria as keyof Employee; // Define the sorting criteria as keyof Employee
      if (a[sortingCriteria] < b[sortingCriteria]) {
        return -1;
      }
      if (a[sortingCriteria] > b[sortingCriteria]) {
        return 1;
      }
      return 0;
    });
  }  

  cancelAdd() {
    this.newEmployee = { name: '', email: '', department: '', position: '' };
    this.showAddForm = false;
    this.selectedEmployee = null;
  }

  showEmployeeDetails(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showEditForm = false;
  }

  confirmDeleteEmployee(employee: Employee) {
    if (confirm('Are you sure you want to delete this employee?')) {
      const index = this.employees.indexOf(employee);
      if (index !== -1) {
        this.employees.splice(index, 1);
        this.selectedEmployee = null;
        this.refreshList = !this.refreshList; // toggle refresh flag to trigger view update
      }
    }
  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = { ...employee };
    this.showEditForm = true;
  }

  updateEmployee() {
    // Find the index of the selected employee in the employees array
    const index = this.selectedEmployee ? this.employees.indexOf(this.selectedEmployee) : -1;
    
    // If the selected employee exists and its index is valid
    if (this.selectedEmployee && index !== -1) {
      // Update the employee information in the array
      this.employees[index] = { ...this.selectedEmployee };
      
      // Exit edit mode
      this.cancelEdit();
    }
  }

  cancelEdit() {
    // Clear the selectedEmployee to exit edit mode
    this.selectedEmployee = null;
  }
  
}

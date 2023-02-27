import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Nombre', 'Email', 'Sucursal', 'Rol', 'Acciones'];
  usuarios!:Usuario[];
  filteredUsers!:Usuario[];
  dataSource!:MatTableDataSource<Usuario>;
  unitName!:String;

  constructor(private userService: UsersService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsuarios().subscribe(users=> {
      this.usuarios=users;
      this.filteredUsers=users;
      this.dataSource = new MatTableDataSource<Usuario>(this.filteredUsers);
      this.dataSource.paginator = this.paginator;
    });
  }

  selectRow(row:any): void {

  }

  editIcon(row:Usuario):void {
    window.location.href="users/edit/"+row.id;
  }

  deleteIcon(row:any):void {
    
  }

  createUser(): void {
    window.location.href="users/create";
  }

}

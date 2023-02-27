import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(!this.hasRole('A')) {
        window.location.href = "/";
    }
  }
    
  hasRole(role:String):boolean {
    var storedRole = localStorage.getItem("roleName");
    if(role == storedRole)
      return true
    return false;
  }

}

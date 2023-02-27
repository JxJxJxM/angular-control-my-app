import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  userId!:number;
  user!:Usuario;
  loading:boolean=false;
  constructor(private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit(): void {
    this.loading=true;
    this.route.params.subscribe(params => {
      this.userId = +params['id']; 
      this.getUser();
   });
  }

  getUser(): void {
    this.userService.getUser(this.userId).subscribe(user=> {
      this.user=user;
      console.log("User",user);
      this.loading=false;
    });
  }

}

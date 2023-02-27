import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { UsersService } from 'src/app/services/users.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:String="";
  pass:String="";
  
  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(private _formBuilder: FormBuilder, private usersService: UsersService, private router:Router) { }

  ngOnInit(): void {
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onChangeUser(event:any):void {
    this.user=event.target.value;
  }

  onChangePass(event:any):void {
    this.pass=event.target.value;
    
  }

  entrar():void {
    this.usersService.login(this.user, this.pass).subscribe((response) => {
      localStorage.setItem("userName",this.getUserNameFormJwt(response.token));
      localStorage.setItem("roleName",this.getRoleNameFormJwt(response.token));
      this.router.navigate(['']);
    });
  }



  getUserNameFormJwt(jwt:String):string {
    let decodedJWT = JSON.parse(window.atob(jwt.split('.')[1]));
    return decodedJWT.nombre;
  }

  getRoleNameFormJwt(jwt:String):string {
    let decodedJWT = JSON.parse(window.atob(jwt.split('.')[1]));
    return decodedJWT.rol;
  }

}

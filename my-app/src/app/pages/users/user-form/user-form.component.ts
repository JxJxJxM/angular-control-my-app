import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from 'src/app/Models/Rol';
import { Usuario } from 'src/app/Models/Usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [MatSnackBar]
})
export class UserFormComponent implements OnInit, AfterContentInit{

  roles:Rol[] = [
    {id:2, name:"Administrador"},
    {id:3, name:"Gerente"}
  ];
  loading:boolean=false;
  selectedRol:Rol | undefined = {
    id:0,
    name:""
  }; 

  selectedName!:String;
  selectedEmail!:String;
  selectedPass!:String;

  @Input() creando!: boolean;
  @Input() userFromParent!:Usuario;
  displayedUser:Usuario = {
    id:0,
    idrol:0,
    name:"",
    namerol:"",
    roles:"",
    email:"",
    password:""
  };

  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(private _formBuilder: FormBuilder, private userService: UsersService, private snackBar: MatSnackBar) { }

  ngAfterContentInit(): void {
     console.log("aftwrviewinit");
    if(this.userFromParent!=undefined) {
      this.displayedUser=this.userFromParent;
      this.getSelectedRol(this.userFromParent.id);
      this.selectedEmail = this.userFromParent.email;
      this.selectedPass = this.userFromParent.password;
      this.selectedName = this.userFromParent.name;
    }
  }

  getSelectedRol(current:number): void {
    this.selectedRol=this.roles.find(rol=>{return rol.id==current;});
  }

  ngOnInit(): void {
    
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  changeRol(event:any):void {
    this.selectedRol = event.value;
    
  }


  nameUpdated(event:any):void {
    console.log(event.target.value)
    this.selectedName = event.target.value;
  }

  emailUpdated(event:any):void {
    this.selectedEmail = event.target.value;
  }

  passwordUpdated(event:any):void {
    this.selectedPass = event.target.value;
  }


  sendRequest(): void {
    if(this.creando){
      var createRequest = {
        idrol: this.selectedRol?.id,
        pass: this.selectedPass,
        name : this.selectedName,
        email : this.selectedEmail,
        password : this.selectedPass,
        id_sucursal: 2
    }

    this.userService.createUser(createRequest).subscribe(success => {

    }, error => {
      this.snackBar.open("Error creando el usuario, Error code: " +error.status + "Mensaje de error: " + error.error.Message,  "Cerrar")
    })

    } else {
      var request= {
        id:this.userFromParent.id,
        idrol: this.selectedRol?.id,
        pass: this.selectedPass,
        name : this.selectedName,
        email : this.selectedEmail,
        password : this.selectedPass,
        id_sucursal:2
      }
    console.log(request);
      this.userService.updateUser(request).subscribe(success=>{
        alert("Usuario editado correctamente")
      }, error => {
        this.snackBar.open("Error actualizando el usuario, Error code: " +error.status + "Mensaje de error: " + error.error.Message,  "Cerrar")
      });
    }
      
    
  }

}

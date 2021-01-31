import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup ;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormBuilder().group({ 
      email: ['admin@deepersignals.com',[Validators.email]],
      password: ['password',[Validators.minLength(4)]]
    })
  }

  login(){
    this.dataService.login(this.loginFormGroup.value).subscribe(
      (res)=>{console.log(res.body);
        localStorage.setItem("userDetails",res.body);
        alert("Login Successful");        
      },
      (err)=>{ alert('Login failed ');console.log(err) }
    );
  }
}
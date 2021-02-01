import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup ;

  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('userDetails')){
      this.router.navigate(['dashboard']);
    }
    else{
      this.loginFormGroup = new FormBuilder().group({ 
        email: ['admin@deepersignals.com',[Validators.email]],
        password: ['password',[Validators.minLength(4)]]
      })
    }
  }

  login(){
    this.dataService.login(this.loginFormGroup.value).subscribe(
      (res)=>{
        localStorage.setItem("userDetails",JSON.stringify(res.body));
        this.router.navigate(['dashboard']);
        alert("Login Successful");
      },
      (err)=>{ alert('Login failed ');console.log(err) }
    );
  }
}
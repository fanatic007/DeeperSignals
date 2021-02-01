import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userDetails;
  constructor(private router: Router) { 
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      }
    });
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("userDetails");
  }
}

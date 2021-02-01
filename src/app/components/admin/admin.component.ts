import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.dataService.getUsers().subscribe(
      (res) => {
        this.users = res.body.map((row) =>{
          row['selected']=false;
          return row;
        });
      },
      (err) => {
        console.log(err);
        alert("Failed to get data");
      }
    );
  }

  getCSV(){
    let users = this.users;
    let headers = [{first_name:'First Name',last_name:'Last Name',email:'Email',groups:'Groups'}];
    users = users.filter(user => user.selected ).map((row) => {
        delete row['selected'];
        row['groups']= '"'+row['groups']+'"';
        return row
      }
    );
    if(users.length){
      users = headers.concat(users);
      let csvContent =users.map(row => Object.values(row).join(",")).join("\n");console.log(csvContent);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'users.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

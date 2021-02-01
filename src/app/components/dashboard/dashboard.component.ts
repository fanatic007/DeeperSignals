import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  assessments=[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getUserAssessments();
  }

  getUserAssessments(){
    this.dataService.getAssessments().subscribe(
      (res) => {
        this.assessments = res.body;
      },
      (err) => {
        console.log(err);
        alert("Failed to get data");
      }
    );
  }

}

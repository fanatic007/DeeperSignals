import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  id;
  graph;
  private svg;
  private margin = 100;
  private width = 900 - (this.margin * 2);
  private height = 625 - (this.margin * 2);
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {      
      this.id = params['id'];
      params['id'] && this.getGraph();
    });
    this.createSvg();
  }

  getGraph(){
    this.dataService.getGraph(this.id).subscribe(
      (res) => {      
        this.graph = res.body;console.log(this.graph);
        let graphData = Object.keys(this.graph.data).map((key) => { 
          let obj={quality: '', score: ''};
          obj.quality = key;
          obj.score = this.graph.data[key];
          return obj;
        });
        this.drawBars(graphData);
      },
      (err) => {
        console.log(err);
        alert("Failed to get data");
      }
    );
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.quality))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 50])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.quality))
    .attr("y", d => y(d.score))
    .attr("width", x.bandwidth())
    .attr("height", (d) => this.height - y(d.score))
    .attr("fill", "#d04a35");
  }
}

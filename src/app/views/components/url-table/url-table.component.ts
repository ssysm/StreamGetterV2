import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-url-table',
  templateUrl: './url-table.component.html',
  styleUrls: ['./url-table.component.scss']
})
export class UrlTableComponent implements OnInit {

  @Input()
  urlTable: [];
  constructor() { }

  ngOnInit() {
  }

}

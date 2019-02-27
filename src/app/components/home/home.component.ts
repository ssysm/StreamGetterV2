import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $('.has-animation').each(function(index) {
        $(this).delay($(this).data('delay')).queue(function() {
          $(this).addClass('animate-in');
        });
      });
    });
  }

}

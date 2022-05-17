import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/entity/stock';
import { Input } from '@angular/core';

@Component({
  selector: 'app-stockcard',
  templateUrl: './stockcard.component.html',
  styleUrls: ['./stockcard.component.scss']
})
export class StockcardComponent implements OnInit {

  @Input() stock?: Stock; 
  constructor() { }

  ngOnInit(): void {
  }

}

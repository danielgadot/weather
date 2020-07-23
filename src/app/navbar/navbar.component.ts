import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  links = [
    { title: 'Home', fragment: '/' },
    { title: 'Favorites', fragment: 'favorites' }
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {}
}

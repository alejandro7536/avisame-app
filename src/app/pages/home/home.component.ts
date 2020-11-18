import { Component, OnInit } from '@angular/core';
import { Point } from '../../models/point.model';
import { AvisameService } from '../../services/avisame.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  icon = {
    url: 'https://cdn.worldvectorlogo.com/logos/google-maps-2020-icon.svg',
    scaledSize: {
      height: 40,
      width: 40
    }
  };

  now = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;

  constructor(
    public reports: AvisameService
  ) {}

  ngOnInit(): void {

  }

}

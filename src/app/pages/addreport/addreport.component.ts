import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AvisameService } from '../../services/avisame.service';
import { Report } from '../../interfaces/report.interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addreport',
  templateUrl: './addreport.component.html',
  styleUrls: ['./addreport.component.css']
})
export class AddreportComponent implements OnInit, OnChanges {

  point: { lat: number, lng: number };
  types: any;
  hora: string;
  hours = '1';
  minutes = 0;
  error = false;
  ampm: 'am' | 'pm' = 'am';
  report: Report = {
    title: '',
    type: 'homicide',
    date: new Date(),
    description: '',
    lat: 0,
    log: 0,
    nperson: '',
    country: 'El Salvador',
    enable: true,
    time: '',
    userdi: localStorage.getItem('uid'),
    id: ''
  };

  constructor(
    public reports: AvisameService,
    private router: Router
  ) {
    this.types = [
      { "name": "Homicidio", "type": "homicide" },
      { "name": "Robo", "type": "rob" },
      { "name": "Accidente Vehicular", "type": "carcrash" },
      { "name": "Asalto en Bus", "type": "busassault" },
      { "name": "Secuestro", "type": "abduction" },
      { "name": "Sospechoso", "type": "suspicius" },
      { "name": "Atropellado", "type": "hitbycar" },
      { "name": "Violación", "type": "raped" }
    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('cambio');

  }

  ngOnInit(): void {
  }

  addPoint(evento) {
    this.point = evento.coords;
  }

  saveReport(form: NgForm) {

    if (this.ampm === 'pm') {
      this.hora = `${parseInt(this.hours) + 12}:${this.minutes}`;
    } else {
      this.hora = `${this.hours}:${this.minutes}`;
    }

    if (form.valid && this.point && this.hora) {

      this.report.lat = this.point.lat;
      this.report.log = this.point.lng;
      this.report.time = this.hora;
      console.log(this.report);
      this.reports.saveReport(this.report).then(() => {
        console.log('guardado');
        this.router.navigateByUrl('home');
      });



    } else {
      console.log('invalido');
      this.error = true;
    }


  }

  closeError(){
    this.error = false;
  }


}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Report } from '../interfaces/report.interface';
import { map, take } from 'rxjs/operators';
import { Point } from '../models/point.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AvisameService {

  public notice: Report;
  public reports: Report[] = [];
  private now = new Date();
  private minday = new Date( new Date().setDate(this.now.getDate() - 3));
  public myPosition: Point;
  public loading = true;


  constructor(
    private af: AngularFirestore,
    private afa: AngularFireAuth,
    private router: Router
  ) {
    this.getMyPosition();
    this.afa.signInAnonymously().then(ref => {

      localStorage.setItem('uid', ref.user.uid);

      if (!localStorage.getItem('terms')) {
        this.router.navigateByUrl('/terms');
      }
      this.getReports();
      this.getNotice();

      console.log('Se ha ingresado');
    });
  }

  getReports() {
    this.loading = true;
    // Filtro de fechas de los reportes de los ultimos 3 dias
    this.af.collection('reports', ref => ref.orderBy('date', 'desc').endAt(this.minday)).valueChanges().pipe(
      map( (reports: Report[]) => {
        for (let r of reports) {
          r.date = `${new Date(r.date.seconds * 1000).getDate()}/${new Date(r.date.seconds * 1000).getMonth()}/${new Date(r.date.seconds * 1000).getFullYear()}`;
          r.icon = {
              url: `assets/Icons/marker_${r.type}.svg`,
              scaledSize: {
                height: 35,
                width: 35
              }
            };
        }
        return reports;
      })
    ).subscribe(
      (reports: Report[]) => {
        this.reports = reports;
        this.loading = false;
      }
    );
  }

  getNotice() {
    this.af.collection('temp-type-reports').valueChanges().pipe(
      map( (reports: Report[]) => {
        for (let r of reports) {
          r.date = `${new Date(r.date.seconds * 1000).getDate()}/${new Date(r.date.seconds * 1000).getMonth()}/${new Date(r.date.seconds * 1000).getFullYear()}`;
          r.icon = {
              url: `assets/Icons/marker_${r.type}.svg`,
              scaledSize: {
                height: 35,
                width: 35
              }
            };
        }
        return reports;
      })
    ).subscribe(
      (notice: Report[]) => {
        this.notice = notice[0];
      }
    );
  }


  getMyPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.myPosition = new Point(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log('No soportado');
    }
  }

  saveReport(report: Report) {
    return this.af.collection('reports').add(report);
  }

}


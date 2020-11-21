import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  public terms = false;
  public pais = 'El Salvador';

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  aceptarTerminos() {
    if (this.terms) {
      localStorage.setItem('terms', 'true');
      localStorage.setItem('pais', this.pais);
      localStorage.setItem('about', 'true');
      this.router.navigateByUrl('/home');
      this.toastr.success('Haz aceptado los términos y condiciones', 'Genial', {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });
    } else {
      this.toastr.info(`Debes acepatar los terminos y condiciones`, 'Ups', {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],  // Corrected to styleUrls
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('900ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('700ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  description: any;
  title: any;

  constructor(private _dataS: DataService, private _auth: AuthService) {}

  logout() {
    this._auth.logOut();
  }

  getName(data: string): string | null {
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(data);
      return decodedToken.description ? decodedToken.description : null;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  getId(data: string): string | null {
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(data);
      return decodedToken.title ? decodedToken.title : null;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  ngOnInit(): void {
    this._auth.getToken().subscribe(data => {
      if (data) {
        this.description = this.getName(data);
        this.title = this.getId(data);
      }
    });

    this._auth.getUsers().subscribe(data => {
      console.log(data);
    });
  }

  saveProduct() {
    console.log(this.myForm.value);
    this._dataS.saveNewProduct(this.myForm.value).subscribe(res => console.log(res));
  }

  changeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({ image: file });
    }
  }
}

interface CustomJwtPayload extends JwtPayload {
  description?: string;
  title?: string;
}

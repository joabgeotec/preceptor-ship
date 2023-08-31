import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Observable } from 'rxjs';
import { Terapeuta } from '../model/terapeuta';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  terapeutas!: Promise<any[]>
  terapeuta!: Promise<Terapeuta>

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.terapeutas = this.firebaseService.getTerapeutas();
    this.terapeuta = this.firebaseService.getTerapeutaById('TehKmVkgBFyPxrGiLQiA');
    console.log(this.terapeutas);
    console.log(this.terapeuta);
  }



}

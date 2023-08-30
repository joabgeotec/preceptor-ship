import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firebaseApp: FirebaseApp) { }

  async getTerapeutas(): Promise<any[]> {
    const firestore = getFirestore(this.firebaseApp);
    const querySnapshot = await getDocs(collection(firestore, 'terapeutas'));
    return querySnapshot.docs.map(doc => doc.data());
  }

  async getAssistidos(): Promise<any[]> {
    const firestore = getFirestore(this.firebaseApp);
    const querySnapshot = await getDocs(collection(firestore, 'assistidos'));
    return querySnapshot.docs.map(doc => doc.data());
  }
}

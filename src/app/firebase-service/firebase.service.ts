import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc } from 'firebase/firestore';
import { Terapeuta } from '../model/terapeuta';
import { Assistido } from '../model/assistido';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firebaseApp: FirebaseApp) { }

  //create
  createTerapeuta(item: any): void {
    const firestore = getFirestore(this.firebaseApp);
    addDoc(collection(firestore, 'terapeutas'), item);
  }

  createAssistido(item: any): void {
    const firestore = getFirestore(this.firebaseApp);
    addDoc(collection(firestore, 'assistidos'), item);
  }

  // read
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

  async getTerapeutaById(itemId: string): Promise<Terapeuta> {
    const firestore = await getFirestore(this.firebaseApp);
    const itemDocRef = doc(firestore, 'terapeutas', itemId);
    const querySnapshot = await getDoc(itemDocRef);
    if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        return {
            id: querySnapshot.id,
            ...data
          } as Terapeuta;
    } else {
      throw new Error("Document not found");
    }
  }

  async getAssistidoById(itemId: string): Promise<any> {
    const firestore = await getFirestore(this.firebaseApp);
    const itemDocRef = doc(firestore, 'assistidos', itemId);
    const querySnapshot = await getDoc(itemDocRef);
    if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        return {
            id: querySnapshot.id,
            ...data
          } as Assistido;
    } else {
      throw new Error("Document not found");
    }
  }

  //update
  async update(collection: string, itemId: string, item: any): Promise<void> {
    const firestore = getFirestore(this.firebaseApp);
    const itemDocRef = doc(firestore, collection, itemId);

    await updateDoc(itemDocRef, item);
  }

  //delete
  async delete(collection: string, itemId: string): Promise<void> {
    const firestore = getFirestore(this.firebaseApp);
    const itemDocRef = doc(firestore, collection, itemId);

    await deleteDoc(itemDocRef);
  }
}

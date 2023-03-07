import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoadingController } from '@ionic/angular';
 
export interface Data {
  mainAgenda?: any,
  schedule: any,
  speakers: any
}
 
@Injectable({
  providedIn: 'root'
})
export class FirebaseDataCollectionService {
  private data: Observable<Data[]>;
  private dataCollection: AngularFirestoreCollection<Data>;

  mainAgendasRefRef: AngularFireList<any>;
  tasks: Observable<any[]>;
 
  constructor(private afs: AngularFirestore, public db: AngularFireDatabase, public loadingController : LoadingController) {
    
    // this.dataCollection = this.afs.collection<Data>('vasco-conference-app-default-rtdb');
    // this.data = this.dataCollection.snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    // );
  };

  getAllMenu(path){
    return this.db.object(`/${path}/`).valueChanges();
  }
 
  getAgenda() {
    this.mainAgendasRefRef = this.db.list(`/agenda`);
    return this.mainAgendasRefRef.valueChanges();

    // return this.mainAgendasRefRef.snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
  };

  getAboutUsContent() {
    return this.db.object(`/aboutus-contents/`).valueChanges(); 
  };

  getMembership() {
    return this.db.object(`/membership-contents/`).valueChanges();
  };

  getMembershipByID(id) {
    return this.db.object(`/membership-contents/${id}`).valueChanges();
  };

  getRateChart() {
    return this.db.object(`/rate-chart/`).valueChanges();
  };

  getPrivilegeById(id){
    return this.db.object(`/privileges-contents/${id}`).valueChanges();
  }

  getExclusiveAccess() {
    return this.db.object(`/exclusive-access-contents/`).valueChanges();
  };

  getExclusiveAccessById(id){
    console.log(id)
    return this.db.object(`/exclusive-access-contents/${id}`).valueChanges();
  }

  saveConciergeReservation(section, formdata){
    let data = JSON.parse(formdata);
    let userId = data.user_id;

    return this.db.list(`/concierge-and-reservation-booking/${section}`).push(data);
  };

  saveContactForm(section, formdata){
    let data = JSON.parse(formdata);
    let userId = data.user_id;

    return this.db.list(`/contact/${section}`).push(data);
  };


  getEvents() {
    return this.db.object(`/events-contents/`).valueChanges();
  };

  getEventsByID(id) {
    return this.db.object(`/events-contents/${id}`).valueChanges();
  };

  getSponsorImageLink(){
    return this.db.object(`/sponsorLink/`).valueChanges();
  }

  getCovidProtocol(segment){
    return this.db.object(`/protocolCovid/${segment}`).valueChanges();
  }

  getButtons() {
    return this.db.object(`/buttons/`).valueChanges();

    // return this.mainAgendasRefRef.snapshotChanges().pipe(
    //   map(changes => 
    //     // changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
  };

  getRelatedCompanyLogo(name){
    return this.db.object(`/related-company/${name}`).valueChanges();
  }

  getSpeakers() {
    this.mainAgendasRefRef = this.db.list(`/speakers`);
    return this.mainAgendasRefRef.valueChanges();

    // return this.mainAgendasRefRef.snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
  };

  getAgendaByDay(day): Observable<Data[]> {
    this.mainAgendasRefRef = this.db.list(`/agenda/${day}`); 
    // return this.mainAgendasRefRef.valueChanges(); 
    return this.mainAgendasRefRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  };


  saveQuestion(formdata){
    let data = JSON.parse(formdata);
    let day = data.day;
    let questionId = data.session_key;

    return this.db.list(`/questions/${day}/${questionId}`).push(data);
  };

  getQuestionsByDayAndSession(day, sessionId): Observable<Data[]> {

    this.mainAgendasRefRef = this.db.list(`/questions/${day}/${sessionId}`); 
    // return this.mainAgendasRefRef.valueChanges(); 
    return this.mainAgendasRefRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  };

  markQuestionAsRead(day, questionId, id){
    this.db.object(`/questions/${day}/${questionId}/${id}/already_read`).set(true);
  }

  markQuestionAsUnRead(day, questionId, id){
    this.db.object(`/questions/${day}/${questionId}/${id}/already_read`).set(false);
  }
 
  // getIdea(id: string): Observable<Idea> {
  //   return this.ideaCollection.doc<Idea>(id).valueChanges().pipe(
  //     take(1),
  //     map(idea => {
  //       idea.id = id;
  //       return idea
  //     })
  //   );
  // }
 
  addIdea(idea: Data): Promise<DocumentReference> {
    return this.dataCollection.add(idea);
  }
 
  // updateIdea(idea: Idea): Promise<void> {
  //   return this.ideaCollection.doc(idea.id).update({ name: idea.name, notes: idea.notes });
  // }
 
  deleteIdea(id: string): Promise<void> {
    return this.dataCollection.doc(id).delete();
  };


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
}
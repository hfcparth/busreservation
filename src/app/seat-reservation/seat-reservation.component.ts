import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Seat } from '../class/seat';
import { BookseatService } from '../services/bookseat.service';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})

export class SeatReservationComponent {

  // @Input('bus') bus:Bus;
  // @Output('closeModal') closeModal = new EventEmitter()
  showSeatList: Seat[] = [];
  total = 0;
  fillupSeat = [];
  alert = false;
  noSeatSelected = false;

  subscription: Subscription;


  constructor(
    private route: Router,
    private BookSeatService: BookseatService
  ) { }

  ngOnInit() {
    // this.getbookSeat();
  }

  Seat(e) {

    let seats = [];
    seats = this.showSeatList.map(item => {
      return item.seatno;
    })

    let id = document.getElementById(e);

    if ((this.fillupSeat.indexOf(String(e)) < 0) && (seats.indexOf(e) < 0)) {
      if ((this.showSeatList.length != 1)) {
        id.innerHTML = `<img src="../assets/img/fseat.png" alt="">`


        let seat: Seat = {
          seatno: e,
          email: sessionStorage.getItem('unemail'),
          phoneno: sessionStorage.getItem('phoneno'),
          bustimetable: 0,
          name: sessionStorage.getItem('username')
        }
        // this.totalFare(seat.fare);
        this.showList(seat);
      }
      else {
        this.alert = true;
      }
    }

  }

  showList(seat) {
    this.showSeatList.push(seat)
  }

  totalFare(fare) {
    this.total += fare;
  }

  confirmJourney() {

    // let seat: Seat = {} as Seat;
    if ((this.showSeatList.length == 0)) {
      this.noSeatSelected = true;
    }
    else {
      this.showSeatList.map(seat => {
        console.log(seat.email);
        console.log(seat.seatno);
        this.BookSeatService.bookSeat(seat).subscribe();
      });
    }

    ;
    //  let route:Journey_Route= JSON.parse(localStorage.getItem("route"))



    //   let journey :Journey={
    //     bus:this.bus,
    //     seats:seats,
    //     fare:Number(this.total),
    //     journey_route:route
    //   }

    // localStorage.setItem("journey",JSON.stringify(journey))
    // this.route.navigate(['user-form']);
    // this.closeModal.emit();


  }


  // getbookSeat(){

  //   let route:Journey_Route= JSON.parse(localStorage.getItem("route"))
  //   let busid=this.bus.$key;
  //   let key = String(new Date(route.date).getTime());
  //   console.log(busid,key)
  // this.subscription=this.BusService.getFillupseat(key,busid)
  // .subscribe(res=>{
  //   for(key in res){
  //     for(let i in res[key].seats){
  //       this.fillupSeat.push(res[key].seats[i])
  //       this.changeSeatColor(res[key].seats[i])
  //     }
  //   }
  // })
  // }

  changeSeatColor(seatNo) {
    let id = document.getElementById(seatNo)
    id.innerHTML = `  <img src="../assets/img/bookseat.png">`
    id.removeEventListener("click", this.Seat);


  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }


}
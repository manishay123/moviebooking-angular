import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css']
})
export class TicketTableComponent {


  constructor(private toastr: ToastrService, private appService: AppServiceService) { }

  tableslists!: TicketTable[];

  ngOnInit(): void {


    this.loadData();


  }

  loadData(): void {

    this.appService.getBookedTable().subscribe(data => {

      this.tableslists = data

    })


  }

}


interface TicketTable {
  transactionId: number
  movieName: string,
  totalseats: number,
  availableSeats: number,
  bookedSeats: number
}

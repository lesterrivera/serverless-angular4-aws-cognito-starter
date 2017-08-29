import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messages = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.loadAllMessages();
  }


  private loadAllMessages() {
    this.messageService.getMessage()
      .subscribe(result => { this.messages.push(result.message); });
  }

}

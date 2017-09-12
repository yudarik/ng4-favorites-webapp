import { Component, OnInit } from '@angular/core';
import { ActionsLogService } from "./actions-log.service"
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-actions-log',
  templateUrl: './actions-log.component.html',
  styleUrls: ['./actions-log.component.scss']
})
export class ActionsLogComponent implements OnInit {

    public actionsList: FirebaseListObservable<any>;

    constructor(private service: ActionsLogService) {}

    ngOnInit() {
      this.actionsList = this.service.list();
    }

}

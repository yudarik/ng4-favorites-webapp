import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Form } from "@angular/forms"
import { FavInterface } from "../favorites/favorites.component";

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {

  @Input() favInstance: FavInterface;

  public favorite: FormGroup;

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {

      this.favorite = new FormGroup({
          fName: new FormControl(this.favInstance.fName),
          fUrl : new FormControl(this.favInstance.fUrl)
      });
  }

}

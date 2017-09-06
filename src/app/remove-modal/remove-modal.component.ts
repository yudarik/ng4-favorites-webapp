import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-modal',
  template: `<div class="modal-header">
                  <h4 class="modal-title">Remove favorite website?</h4>
                  <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  <p>This action will remove the favorite website permanently.</p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('approve')">Remove website</button>
                  <button type="button" class="btn btn-outline-dark" (click)="activeModal.dismiss('dismiss')">Cancel</button>
              </div>
              `,
  styleUrls: ['./remove-modal.component.scss']
})
export class RemoveModalComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }
}

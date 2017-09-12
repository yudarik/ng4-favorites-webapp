import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms"
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { RemoveModalComponent } from "../remove-modal/remove-modal.component";
import { UpdateModalComponent } from "../update-modal/update-modal.component";
import { ActionsLogService } from "../actions-log/actions-log.service";

export interface FavInterface {
    $key: string;
    fName: string;
    fUrl: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

    public favorite: FormGroup;

    public favoritesList: FirebaseListObservable<any>;

    public addFormVisible: boolean;
    public gridView: boolean;

    private closeResult: string;

    constructor(
        private db: AngularFireDatabase,
        private modalService: NgbModal,
        private actionSrv: ActionsLogService) {

        this.favoritesList = db.list('/items');
    }

    ngOnInit() {

        this.addFormVisible = false;
        this.gridView = false;

        this.favorite = new FormGroup({
            fName: new FormControl(),
            fUrl : new FormControl()
        });
    }

    toggleGridView() {
        this.gridView = !this.gridView;
    }

    addFavorite() {
        this.favoritesList.push(this.favorite.value);

        this.actionSrv.add(this.favorite.value);

        this.togleAddForm();
    }

    updateFavorite(fav) {

        console.log(fav);

        const modalRef = this.modalService.open(UpdateModalComponent);

        modalRef.componentInstance.favInstance = fav;

        modalRef.result.then(res => {
            this.favoritesList.update(fav.$key, res.value);
            this.actionSrv.update(fav);
        },(reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    removeFavorite(fav) {

        this.modalService.open(RemoveModalComponent)
            .result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
                this.favoritesList.remove(fav.$key);
                this.actionSrv.remove(fav);
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    togleAddForm() {
        this.addFormVisible = !this.addFormVisible;
    }

}




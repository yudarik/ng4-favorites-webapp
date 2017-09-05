import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms"
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

    public favorite: FormGroup;
    //public favSearch : FormGroup;
    public favoritesList: FirebaseListObservable<any>;
    public addFormVisible: boolean;
    public gridView: boolean;

    private closeResult: string;

    constructor(private db: AngularFireDatabase, private modalService: NgbModal) {
        this.favoritesList = db.list('/items');
        /*this.favSearch = new FormGroup({
            text: new FormControl('')
        });*/
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
        this.togleAddForm();
    }

    updateFavorite(content, fav) {

        const modalRef = this.modalService.open(content);

        modalRef.componentInstance.fName = fav.fName.value;
        modalRef.componentInstance.fUrl = fav.fUrl.value;

        modalRef.result.then(res => {
            this.favoritesList.update(fav.$key, res);
        })

    }

    removeFavorite(content, fav) {

        this.modalService.open(content)
            .result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
                this.favoritesList.remove(fav.$key);
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });

        //this.favoritesList.remove(fav.$key);
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms"
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

    public favorite: FormGroup;
    public favoritesList: FirebaseListObservable<any>;
    public addFormVisible: boolean;

    constructor(db: AngularFireDatabase) {
        this.favoritesList = db.list('/items');
    }

    ngOnInit() {

        this.addFormVisible = false;

        this.favorite = new FormGroup({
            fName: new FormControl(),
            fUrl : new FormControl()
        });
    }

    addFavorite() {
        this.favoritesList.push(this.favorite.value);
    }

    updateFavorite(fav) {
        this.favoritesList.update(fav.$key, fav);
    }

    removeFavorite(fav) {
        this.favoritesList.remove(fav.$key);
    }

    togleAddForm() {
        this.addFormVisible = !this.addFormVisible;
    }
}

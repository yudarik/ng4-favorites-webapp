import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';


export interface Action {
    datetime: number;
    action: string;
    fName: string;
    fUrl: string;
}
export class Action {

    public datetime: number;
    public action: string;
    public fName: string;
    public fUrl: string;

    constructor(favorite, action) {
        this.datetime = Date.now();
        this.action = action;
        this.fName = favorite.fName;
        this.fUrl = favorite.fUrl;
    }
}

@Injectable()
export class ActionsLogService {

    private actionsList: FirebaseListObservable<any>;

    constructor(private db: AngularFireDatabase) {
        this.actionsList = db.list('/actions-list');
    }

    add(favorite: any) {
        return this.actionsList.push(new Action(favorite, 'add'));
    }

    update(favorite: any) {
        return this.actionsList.push(new Action(favorite, 'update'));
    }

    remove(favorite: any) {
        return this.actionsList.push(new Action(favorite, 'remove'));
    }

    list() {
        return this.actionsList;
    }
}

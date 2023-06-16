import { Observable } from "../../observer/Observable";
import { Observer } from "../../observer/Observer";

export interface MovableObserver extends Observer {}

export class MovableObservable extends Observable<MovableObserver> {}

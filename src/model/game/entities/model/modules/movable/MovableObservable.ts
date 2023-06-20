import { Observable } from "../../../../model/observer/Observable";
import { Observer } from "../../../../model/observer/Observer";

export interface MovableObserver extends Observer {}

export class MovableObservable extends Observable<MovableObserver> {}

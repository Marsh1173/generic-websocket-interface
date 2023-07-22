import { Observer, Observable } from "../../../../utils/observer/Observer";

export interface MovableObserver extends Observer {}

export class MovableObservable extends Observable<MovableObserver> {}

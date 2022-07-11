export interface GameInterface {
    update: (elapsed_time: number) => void;

}

export abstract class Game implements GameInterface {
    update(elapsed_time: number) {

    }
}
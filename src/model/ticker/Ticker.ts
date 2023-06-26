import { HasId, Id } from "../utils/Id";

export interface ITicker {
  going: boolean;
  start(): void;
  stop(): void;
}

// export abstract class Ticker implements ITicker {
//   public going: boolean = false;

//   /**
//    * Loop duration measured in miliseconds.
//    */
//   protected abstract readonly tick_duration_ms: number;

//   public start() {
//     if (!this.going) {
//       this.going = true;
//       this.last_timestamp = Date.now() - this.tick_duration_ms;
//       this.start_tick_function();
//     }
//   }

//   private last_timestamp: number = 0;
//   protected tick(timestamp: number) {
//     if (!this.going) {
//       this.stop_tick_function();
//       return;
//     }

//     let elapsed_time = timestamp - this.last_timestamp;
//     this.last_timestamp = timestamp;

//     if (elapsed_time > this.tick_duration_ms * 5) {
//       elapsed_time = this.tick_duration_ms * 5;
//     }

//     // this.updatings.forEach((updateable) => {
//     //   updateable.update(elapsed_time / 1000);
//     // });

//     this.continue_tick_function();
//   }

//   /**
//    * Function that starts the loop, if necessary.
//    */
//   protected abstract start_tick_function(): void;
//   /**
//    * Function that continues the loop, if necessary.
//    */
//   protected abstract continue_tick_function(): void;
//   /**
//    * Function that ceases the loop, if necessary.
//    */
//   protected abstract stop_tick_function(): void;
// }

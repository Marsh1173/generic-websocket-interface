export interface IMessageBuffer<Receiver> {
  attach_observer(new_observer: Receiver): void;
  remove_observer(): void;
}

export abstract class MessageBuffer<MessageType, Receiver>
  implements IMessageBuffer<Receiver>
{
  protected observer: Receiver | undefined = undefined;

  private message_buffer: MessageType[] = [];
  private is_processing: boolean = false;

  protected on_receive_message(msg: MessageType) {
    if (this.observer === undefined || this.is_processing) {
      this.message_buffer.push(msg);
    } else {
      this.process_buffered_message(msg, this.observer);
    }
  }

  private process_buffered_message(msg: MessageType, this_observer: Receiver) {
    this.is_processing = true;
    this.process_message(msg, this_observer);
    this.is_processing = false;

    this.process_message_buffer();
  }

  protected abstract process_message(
    msg: MessageType,
    observer: Receiver
  ): void;

  private process_message_buffer() {
    if (
      this.message_buffer.length > 0 &&
      !this.is_processing &&
      this.observer !== undefined
    ) {
      let msg: MessageType = this.message_buffer.shift()!;
      this.process_buffered_message(msg, this.observer);
    }
  }

  public attach_observer(new_observer: Receiver) {
    this.observer = new_observer;
    this.process_message_buffer();
  }

  public remove_observer() {
    this.observer = undefined;
  }
}

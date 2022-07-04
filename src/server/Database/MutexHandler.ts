export class MutexHandler {

    protected op_stack: (() => void)[] = [];
    protected is_busy: boolean = false;

    public add_db_op(op: () => void){
        this.op_stack.push(op);

        if(!this.is_busy) {
            this.is_busy = true;
            
            while(this.execute_top_op()) {}

            this.is_busy = false;
        }
    }

    private execute_top_op(): boolean {
        if(this.op_stack.length === 0) {
            return false;
        }

        let op: () => void = this.op_stack[0];
        this.op_stack.shift();

        op();

        return true;
    }
}
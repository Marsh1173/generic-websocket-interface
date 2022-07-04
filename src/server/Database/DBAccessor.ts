import { readFileSync, writeFileSync } from "fs";
import { MutexHandler } from "./MutexHandler";

export abstract class DBAccessor<Model> {

    protected abstract table_filename: string;
    protected mutex_handler: MutexHandler = new MutexHandler();

    protected open_table_file(callback: (objs: Model[]) => void, error_callback?: () => void) {

        console.log("here");
        this.mutex_handler.add_db_op(() => {
            try {
                const json_data: Buffer = readFileSync(this.table_filename);
                const data: Model[] = JSON.parse(json_data.toString());

                callback(data);
            } catch (err: any) {
                if(err.code && err.code === 'ENOENT' && error_callback) {
                    error_callback();
                }
            }
        });
    }

    protected write_table_file(obj: Model, callback?: () => void, error_callback?: () => void) {

        this.mutex_handler.add_db_op(() => {
            try {
                const json_data: Buffer = readFileSync(this.table_filename);
                const data: Model[] = JSON.parse(json_data.toString());
    
                data.push(obj);
                writeFileSync(this.table_filename, JSON.stringify(data));
    
                if(callback) {
                    callback();
                }
            } catch (err: any) {
                if(err.code && err.code === 'ENOENT' && error_callback) {
                    error_callback();
                }
            }
        });
    }

    protected overwrite_table_file(objs: Model[], callback?: () => void, error_callback?: () => void) {

        this.mutex_handler.add_db_op(() => {
            try {
                writeFileSync(this.table_filename, JSON.stringify(objs));
    
                if(callback) {
                    callback();
                }
            } catch (err: any) {
                if(err.code && err.code === 'ENOENT' && error_callback) {
                    error_callback();
                }
            }
        });
    }

}
import { readFileSync, writeFileSync } from "fs";

export abstract class DBAccessor<Model> {

    protected abstract table_filename: string;
    protected abstract table_label: string;

    protected open_table_file(): Model[] {

        const json_data: Buffer = readFileSync(this.table_filename);
        const data: Model[] = JSON.parse(json_data.toString()) as Model[];
        
        return data;
    }

    protected write_table_file(objs: Model[]) {

        const json_data: Buffer = readFileSync(this.table_filename);
        let data: Model[] = JSON.parse(json_data.toString()) as Model[];

        data = data.concat(objs);
        const json: string = JSON.stringify(data)
        writeFileSync(this.table_filename, json);
    }

    protected overwrite_table_file(objs: Model[]) {

        let json: string = JSON.stringify(objs);
        writeFileSync(this.table_filename, json);
    }

}
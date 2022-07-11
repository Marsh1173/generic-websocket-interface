export interface ConfigInterface {
    is_development: boolean;
    database_path: string;
}

export const SERVER_CONFIG: ConfigInterface = {
    is_development: false,
    database_path: "src/server/Database/"// src/test/
}
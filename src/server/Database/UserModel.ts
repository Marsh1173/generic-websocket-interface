export interface UserModel {
    user_id: number,
    name: string,
    encoded_password: string,
}


export function get_random_user_id(): number {
    return Math.floor(Math.random() * Date.now())
}
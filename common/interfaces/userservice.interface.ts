export interface UserService {
    list: (limit: number, page: number) => Promise<any>;
    create: (user: any) => Promise<any>;
    getByUsername: (username: string) => Promise<any>;
    deleteByUsername: (username: string) => Promise<string>;
}
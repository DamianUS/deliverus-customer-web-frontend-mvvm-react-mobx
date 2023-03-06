import Restaurant from "../models/restaurant/Restaurant";

interface Repository<T>{
    getAll(...args:any[]): Promise<T[]>
    getById(id: number, ...args:any[]): Promise<T|undefined>
    save(entity: T, ...args:any[]): Promise<T>
    store(entity: T, ...args:any[]): Promise<T>
    store(update: T, ...args:any[]): Promise<T>
    removeById(id: number, ...args:any[]): Promise<number>
}

export default Repository

import Restaurant from "../restaurant/Restaurant";

interface Repository<T>{
    getAll(): Promise<T[]>
    getById(id: number): Promise<T|undefined>
    save(entity: T): Promise<T>
    removeById(id: number): Promise<number>
}

export default Repository

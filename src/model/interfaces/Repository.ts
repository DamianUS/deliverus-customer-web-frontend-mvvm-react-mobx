import Restaurant from "../restaurant/Restaurant";

interface Repository<T>{
    getAll(): T[]
    getById(id: number): T
    save(entity: T): void
    removeById(id: number): void
    remove(entity: T): void
}

export default Repository

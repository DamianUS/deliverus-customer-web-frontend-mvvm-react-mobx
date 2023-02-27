import Restaurant from "../restaurant/Restaurant";

interface Repository<T>{
    getAll(): T[]
    getById(id: number): T|null
    save(entity: T): void
    removeById(id: number): void
}

export default Repository

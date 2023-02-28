import Repository from "../interfaces/Repository";
import Model from "../interfaces/Model";
import disableable from "./decorators/Disableable";
import {injectable} from "inversify";
// @ts-ignore
@injectable()
abstract class BaseMockRepository<T extends Model> implements Repository<T>{
    entities:T[]

    protected constructor() {
        this.entities = [];
    }
    @disableable()
    async getAll(): Promise<T[]>{
        return this.entities
    }

    @disableable()
    async getById(id: number): Promise<T | undefined> {
        const entities = await this.getAll()
        // @ts-ignore
        return entities.find(entity => entity.id === id);
    }
    @disableable()
    async removeById(id: number): Promise<number> {
        const entities = await this.getAll()
        const oldCount = entities.length
        if(!id || !entities.find(entity => entity.id === id))
            return 0
        this.entities = this.entities.filter(entity => entity.id !== id)
        return this.entities.length - oldCount
    }
    @disableable()
    async save(entity: T): Promise<T> {
        if (entity.id)
            return this.update(entity)
        else
            return this.store(entity)
    }
    @disableable()
    private async store(entity: T): Promise<T> {
        const entities = await this.getAll()
        const ids:number[] = entities.map(entity => entity.id as number);
        const lastId = Math.max(...ids);
        entity.id = lastId+1;
        entity.createdAt = new Date()
        entity.updatedAt = new Date()
        this.entities.push(entity);
        return entity
    }
    @disableable()
    private async update(entity: T): Promise<T> {
        const entities = await this.getAll();
        const oldEntityIndex = entities.findIndex(storedEntity => storedEntity.id === entity.id)
        if (oldEntityIndex === -1) {
            throw new Error("the entity does not exist")
        }
        entity.updatedAt = new Date()
        this.entities[oldEntityIndex] = entity
        return entity
    }
}

export default BaseMockRepository;

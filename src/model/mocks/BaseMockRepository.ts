import Repository from "../interfaces/Repository";
import Model from "../interfaces/Model";
import disableable from "./decorators/Disableable";
import {injectable} from "inversify";
import { cloneDeep } from "lodash";

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
        let foundEntity = entities.find(entity => entity.id === id);
        const clonedEntity = cloneDeep(foundEntity);
        return clonedEntity
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
        const clonedEntity = cloneDeep(entity)
        clonedEntity.id = lastId+1;
        clonedEntity.createdAt = new Date();
        clonedEntity.updatedAt = new Date();
        this.entities.push(clonedEntity);
        return clonedEntity;
    }
    @disableable()
    private async update(entity: T): Promise<T> {
        const entities = await this.getAll();
        const oldEntityIndex = entities.findIndex(storedEntity => storedEntity.id === entity.id)
        if (oldEntityIndex === -1) {
            throw new Error("the entity does not exist");
        }
        const clonedEntity = cloneDeep(entity);
        clonedEntity.updatedAt = new Date();
        this.entities[oldEntityIndex] = clonedEntity;
        return clonedEntity;
    }
}

export default BaseMockRepository;

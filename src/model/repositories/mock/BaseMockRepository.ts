import Repository from "../../interfaces/Repository";
import Model from "../../interfaces/Model";
import disableable from "./decorators/Disableable";
import {injectable} from "inversify";
import { cloneDeep } from "lodash";
import ModelConversor from "../../conversion/interfaces/ModelConversor";
import * as yup from "yup";
import ValidationError from "../../errors/ValidationError";
import fromYupErrors from "./errorConversors/ValidationErrorFromYupConversor";

// @ts-ignore
@injectable()
abstract class BaseMockRepository<T extends Model> implements Repository<T>{
    entities:T[]|undefined
    abstract get creationValidationSchema():object|undefined;
    abstract get updateValidationSchema():object|undefined;
    abstract get mockedEntites():object[];
    abstract get conversor():ModelConversor<T>;

    async initializeEntities(): Promise<void> {
        const entitiesPromises = this.mockedEntites.map(entitySourceObject => this.conversor.convertToInternalEntity(entitySourceObject));
        this.entities = await Promise.all(entitiesPromises)
    }

    @disableable()
    async getAll(...args:any[]): Promise<T[]>{
        if (!this.entities){
            await this.initializeEntities();
        }
        return this.entities ?? []
    }

    @disableable()
    async getById(id: number, ...args:any[]): Promise<T | undefined> {
        const entities = await this.getAll()
        // @ts-ignore
        let foundEntity = entities.find(entity => entity.id === id);
        const clonedEntity = cloneDeep(foundEntity);
        return clonedEntity
    }
    @disableable()
    private async removeById(id: number, ...args:any[]): Promise<number> {
        const entities = await this.getAll()
        const oldCount = entities.length
        if(!this.entities || !id || !entities.find(entity => entity.id === id))
            return 0
        this.entities = this.entities.filter(entity => entity.id !== id)
        return this.entities.length - oldCount
    }
    @disableable()
    async remove(entity: T, ...args: any[]): Promise<number> {
        if(entity.id)
            return this.removeById(entity.id);
        return 0;
    }
    @disableable()
    async save(entity: T, ...args:any[]): Promise<T> {
        if (entity.id)
            return this.update(entity, ...args);
        else
            return this.store(entity, ...args)
    }
    @disableable()
    async store(entity: T, ...args:any[]): Promise<T> {
        try{
            if(this.creationValidationSchema !== undefined){
                // @ts-ignore
                await this.creationValidationSchema.validate(entity, {abortEarly: false});
            }
            const entities = await this.getAll()
            const ids:number[] = entities.map(entity => entity.id as number);
            const lastId = Math.max(...ids);
            const clonedEntity = cloneDeep(entity)
            clonedEntity.id = lastId+1;
            clonedEntity.createdAt = new Date();
            clonedEntity.updatedAt = new Date();
            this.entities?.push(clonedEntity);
            return clonedEntity;
        }
        catch(error) {
            if (error instanceof yup.ValidationError) {
                throw fromYupErrors(error);
            }
            else{
                throw error;
            }
        }
    }
    @disableable()
    async update(entity: T, ...args:any[]): Promise<T> {
        const entities = await this.getAll();
        const oldEntityIndex = entities.findIndex(storedEntity => storedEntity.id === entity.id)
        if (oldEntityIndex === -1) {
            throw new Error("the entity does not exist");
        }
        const clonedEntity = cloneDeep(entity);
        clonedEntity.updatedAt = new Date();
        if(this.entities){
            this.entities[oldEntityIndex] = clonedEntity;
        }
        return clonedEntity;
    }
}

export default BaseMockRepository;

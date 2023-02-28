interface Model{
    updatedAt: Date|undefined
    createdAt: Date|undefined
    id: number|undefined
    getProperties():string[]
}

export default Model

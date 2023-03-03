const cloneClassInstance = (classInstanceToClone:object|undefined) => {
    if(classInstanceToClone === undefined)
        return undefined;
    if(classInstanceToClone === null)
        return null;
    const clonedEntity = Object.create(
        Object.getPrototypeOf(classInstanceToClone),
        Object.getOwnPropertyDescriptors(classInstanceToClone)
    );
    return clonedEntity;
}

export default cloneClassInstance;

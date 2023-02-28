import Restaurant from "../model/restaurant/Restaurant";

const arrayToDynamicNumberOfBuckets = (elementArray: any[], elementsPerBucket:number) => {
    const numberOfBuckets = Math.ceil(elementArray.length / elementsPerBucket);
    // @ts-ignore
    const buckets = [...Array(numberOfBuckets).keys()].map(bucketIndex => {
        const startIndex = bucketIndex*elementsPerBucket
        return elementArray.slice(startIndex, startIndex + elementsPerBucket);
    })
    return buckets
}

export {arrayToDynamicNumberOfBuckets}

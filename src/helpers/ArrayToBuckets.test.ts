import {arrayToDynamicNumberOfBuckets} from "./ArrayToBuckets";

test('Array to buckets dinámicos devuelve el mismo array si está vacío', () => {
    // @ts-ignore
    const array: any[] = []
    const buckets: any[][] = arrayToDynamicNumberOfBuckets(array, 2)
    expect(buckets).toEqual([]);
});

test('Array to buckets devuelve 2 buckets con si se pasa un array de 4 elementos y se le dice que lo divida en 2', () => {
    // @ts-ignore
    const array: any[] = [1,2,3,4]
    const buckets: any[][] = arrayToDynamicNumberOfBuckets(array, 2)
    expect(buckets).toEqual([[1,2],[3,4]]);
});

test('Array to buckets devuelve 3 buckets con si se pasa un array de 5 elementos y se le dice que lo divida en 2', () => {
    // @ts-ignore
    const array: any[] = [1,2,3,4,5]
    const buckets: any[][] = arrayToDynamicNumberOfBuckets(array, 2)
    expect(buckets).toEqual([[1,2],[3,4],[5]]);
});

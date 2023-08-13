import test from '@/test'
const a = '1'
const myPromise = new Promise(resolve => resolve(true))
console.log(myPromise, a, [...test])

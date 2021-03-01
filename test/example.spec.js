/*
 * @Author: your name
 * @Date: 2021-03-01 23:02:11
 * @LastEditTime: 2021-03-02 03:25:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mod-onion\test\example.spec.js
 */
const Monion = require("../src/index.js")
const monion1 = new Monion()
const monion2 = new Monion()
var m =12
monion1.use(async (ctx,next)=>{
    console.log(ctx,'11')
    await next()
    console.log(ctx,'11')
})
monion1.use(async (ctx,next)=>{
    return new Promise((res,rej)=>{
        setTimeout(async function(){
            console.log(ctx,'12')
            ctx.name+=m
            await next()
            console.log(ctx,'12')
            res(ctx)
        },2000)
    })
})
monion1.use(async (ctx)=>{
    console.log(ctx,'13')
    ctx.name+=1
    console.log(ctx,'13')
})

monion2.use(async (ctx,next)=>{
    console.log(ctx,'21')
    next()
    console.log(ctx,'21')
})
monion2.use(async (ctx,next)=>{
    console.log(ctx,'22')
    ctx.name-=m
    next()
    console.log(ctx,'22')
})
monion2.use(async (ctx)=>{
    console.log(ctx,'23')
    ctx.name-=1
    console.log(ctx,'23')
})
var data = {name:0}
async function aaa(){
    const m = await monion1.pipeData(data)
    
    console.log(m,3333)
}
// console.log(monion1.package(data),3333)
aaa()
console.log("----------------------------------------")
monion2.pipeData(222)
// console.log
// import ModOnion from "../src/index.js";
import ModOnion from "../src/index.com"
const middlewares=[
    async (ctx,next)=>{
        console.log("1");
        ctx.age+=1;
        await next();
        console.log("1")
    },
    async (ctx,next)=>{
        console.log("2");
        ctx.age+=1;
        await next();
        console.log("2")
    },
    async (ctx,next)=>{
        console.log("3");
        ctx.age+=1;
        await next();        
        console.log("3")
    },
    async (ctx,next)=>{
        return new Promise((resolve,reject)=>{
            setTimeout(async function(){
                try{
                    console.log("4");
                    ctx.age+=1;
                    await next()
                    console.log("4")
                    resolve()
                }catch(err){
                    reject(err)
                }       
            },2000)                 
        })        
    }
]
const mw2=[
    async (ctx,next)=>{
        return new Promise((resolve,reject)=>{
            setTimeout(async function(){
                try{
                    console.log("5");
                    ctx.age+=1;
                    ctx.nickname="enmotion";
                    await next()
                    console.log("5")
                    resolve()
                }catch(err){
                    reject(err)
                }       
            },2000)                 
        })        
    },
    async (ctx,next)=>{
        console.log("6");
        ctx.age+=1;
        await next();        
        console.log("6")
    },
    async (ctx,next)=>{
        return new Promise((resolve,reject)=>{
            setTimeout(function(){
                try{
                    console.log("7");
                    ctx.age+=1;
                    ctx.name="mod2"
                    console.log("7")
                    resolve()
                }catch(err){
                    reject(err)
                }       
            },2000)                 
        })        
    }
]
const M01 = new ModOnion(middlewares)
M01.pipingData({name:"mod",age:0},M01.middlewares.concat(mw2)).then(value=>console.log("V:",value)).catch(err=>{console.log(err)})
console.log(M01.middlewares)
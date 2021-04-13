import ModOnion from "../src/index.js";
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
        console.log("4");
        ctx.age+=1;
        console.log("4")
    }
]
const M01 = new ModOnion(middlewares)
M01.pipingData({name:"mod",age:0}).then(value=>console.log("V:",value)).catch(err=>{console.log(err)})
// function compose(middleware){
//     return function (context, next) {
//         // last called middleware #
//         let index = -1
//         return dispatch(0)
//         function dispatch (i) {
//             if (i <= index){
//                 return Promise.reject(new Error('next() called multiple times'))
//             } 
//             index = i
//             let func = middleware[i]
//             if (!func) return Promise.resolve()
//             try{
//                 return Promise.resolve(func(context, dispatch.bind(null, i + 1)));
//             }catch(err){
//                 return Promise.reject(err);
//             }
//         }
//     }
// }

// var pipe = compose(middlewares);
// pipe({name:1}).then().catch(err=>console.log(err.message))
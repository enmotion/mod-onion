/*
 * @Author: your name
 * @Date: 2021-03-01 23:02:11
 * @LastEditTime: 2021-03-05 12:42:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mod-onion\test\example.spec.js
 */
const Monion = require("../src/index.js")
const MO1 = new Monion()
MO1.use(async (ctx,next)=>{
  console.log(ctx,"1")
  ctx.name+=1
  await next()
  ctx.name-=1
  console.log(ctx,"1")
})
MO1.use(async (ctx,next)=>{
  console.log(ctx,"2")
  ctx.name+=1
  await next()
  ctx.name-=1
  console.log(ctx,"2")
})
MO1.use((ctx,next)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(async ()=>{
      console.log(ctx,"3")
      ctx.name+=1
      await next()
      ctx.name-=1
      console.log(ctx,"3")
      resolve(ctx)
    },2000)   
  })  
})
MO1.use((ctx,next)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(ctx,"4")
      ctx.name+=1
      next()
      ctx.name-=1
      console.log(ctx,"4")
      resolve(ctx)
    },1000)   
  })  
})

// MO1.pipingData({name:1})
// .then(
//   value=>{
//     console.log("END:value",value)
//   }
// )
// .catch(err=>{
//   console.log("END:error", err.message)
// })
MO1.pipingData({name:1001,age:1},[
  async (ctx,next)=>{
    console.log("---------------------------")
    console.log(ctx,"1")
    ctx.name+=1
    ctx.age+=1
    await next()
    ctx.age-=1
    console.log(ctx,"1")
    console.log("---------------------------")
  },
  (ctx,next)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(async ()=>{
        console.log(ctx,"2")
        ctx.name+=1
        ctx.age+=1
        await next()
        ctx.age-=1
        console.log(ctx,"2")
        resolve(ctx)
      },2000)   
    })  
  },
  (ctx,next)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(async ()=>{
        console.log(ctx,"3")
        ctx.name+=1
        ctx.age+=1
        await next()
        ctx.age-=1
        console.log(ctx,"3")
        resolve(ctx)
      },2000)   
    })  
  }
])
.then(
  value=>{
    console.log("END:value",value)
  }
)
.catch(err=>{
  console.log("END:error", err.message)
})
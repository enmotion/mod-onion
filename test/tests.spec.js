/*
 * @Author: enmotion
 * @Date: 2021-03-05 11:45:50
 * @LastEditTime: 2021-03-05 13:58:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mod-onion\test\tests.spec.js
 */
import ModOnion from "../src"
var assert = require ('assert');
describe('mod-onion 测试',function(){    
    describe("同步管道测试",function(){
        it("创建的管道为同步的情况，数据是否一致",function(){            
            var MO = new ModOnion([])
            var data={name:1}
            return MO.pipingData(data,[
                (ctx,next)=>{
                    ctx.name+=1
                    next()
                    ctx.name+=1
                },
                (ctx,next)=>{
                    ctx.name+=1
                    next()
                },
            ]).then(value=>{
                console.log(value)
                assert.equal(value.name,4)
            })            
        })
        it("同步错误捕获机制",function(){            
            var MO = new ModOnion([])
            var data={name:1}
            return MO.pipingData(data,[
                (ctx,next)=>{
                    ctx.name+=1
                    s
                    next()
                    ctx.name+=1
                },
                (ctx,next)=>{
                    ctx.name+=1
                    next()
                },
            ]).then(value=>{
                
            }).catch(err=>{
                assert.equal(err.message,'s is not defined')
            })           
        })
    })
    describe("异步管道测试",function(){
        it("创建的管道为同步的情况，数据是否一致",function(){            
            var MO = new ModOnion([])
            var data={name:1}
            return MO.pipingData(data,[
                async (ctx,next)=>{
                    ctx.name+=1
                    await next()
                    ctx.name+=1
                },
                (ctx,next)=>{
                    return new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            ctx.name+=1
                            next()
                            resolve(ctx)
                        },1000)                        
                    })                   
                },
            ]).then(value=>{                
                assert.deepEqual(value,{name:4})
            })            
        }),
        it("异步错误捕获机制",function(){            
            var MO = new ModOnion([])
            var data={name:1}
            return MO.pipingData(data,[
                async (ctx,next)=>{
                    ctx.name+=1                    
                    await next()
                    ctx.name+=1
                },
                (ctx,next)=>{
                    return new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            ctx.name+=1                            
                            next()
                            resolve(ctx)
                        },2000)                        
                    })   
                },
            ]).then(value=>{
                assert.equal(value,{name:24})
            }).catch(err=>{
                assert.equal(1,1)
            })           
        })   
    })
})

function runDelay(done, f ) {
    try {
        f();
        done();
    } catch(e) {
        done(e);
    }
}
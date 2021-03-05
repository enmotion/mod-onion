/*
 * @Author: enmotion
 * @Date: 2021-03-05 11:45:50
 * @LastEditTime: 2021-03-05 13:44:37
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
            MO.pipingData(data,[
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
    })
    describe("异步管道测试",function(){
        it("创建的管道为同步的情况，数据是否一致",function(){            
            var MO = new ModOnion([])
            var data={name:1}
            MO.pipingData(data,[
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
                        },5000)                        
                    })                   
                },
            ]).then(value=>{                
                runDelay(done,function(){
                    console.log(value)
                    assert.deepEqual(value,"mod")
                })
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
/*
 * @Author: enmotion
 * @Date: 2021-03-01 23:02:11
 * @LastEditTime: 2021-04-14 01:37:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mod-onion\src\index.js
 */
"use strict";
class ModOnion{
    constructor($middleware){
        this.#checkStack($middleware);
        this.middlewares = $middleware||[]
    }
    #checkStack($middleware=[]){
        if (!Array.isArray($middleware)){
            throw new TypeError('Middlewares stack must be an array!')
        } 
        for (const fn of $middleware) {
            if (typeof fn !== 'function'){
                throw new TypeError('Middleware must be composed of functions!')
            } 
        }
    }
    compose($middleware) {
        this.#checkStack($middleware)
        return function(context, next) {
            // last called middleware 
            let index = -1;
            // 取出第一个中间件函数执行
            return dispatch(0);        
            // 递归函数
            function dispatch(i) {
                if (i <= index) return Promise.reject(new Error('next() called multiple times'));
                index = i;
                let fn = $middleware[i];        
                // next的值为undefined,当没有中间件的时候直接结束
                // 其实这里可以去掉next参数，直接在下面fn = void 0,和之前的代码效果一样
                // if (i === middleware.length) fn = void 0;
                if (i === $middleware.length) fn = next;        
                if (!fn) return Promise.resolve();
                try {
                    // fn就是中间件函数, dipatch(i)调用的就是第i个中间件函数
                    // eg ：                app.use((ctx,next) => { next()})            
                    // 第 1 次 reduce 的返回值，下一次将作为 a
                    // arg => fn1(() => fn2(arg));
            
                    // 第 2 次 reduce 的返回值，下一次将作为 a
                    //         arg => (arg => fn1(() => fn2(arg)))(() => fn3(arg));
                    // 等价于...
                    //         arg => fn1(() => fn2(() => fn3(arg)));
            
                    // 执行最后返回的函数连接中间件，返回值等价于...
                    // fn1(() => fn2(() => fn3(() => {})));
                    return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
                } catch (err) {
                    return Promise.reject(err);
                }
            }
        };
        // return function (context, next) {
        //     let index = -1
        //     return dispatch(0)
        //     function dispatch (i) {
        //         if (i <= index) return Promise.reject(new Error('next() called multiple times'))
        //         index = i
        //         let fn = $middleware[i]
        //         if (i === $middleware.length) fn = next
        //         if (!fn) return Promise.resolve()
        //         try {
        //             // return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
        //             return new Promise(async (resolve,reject)=>{
        //                 try{
        //                     await fn(context, dispatch.bind(null, i + 1));
        //                     resolve(context)
        //                 }catch(err){
        //                     reject(err)
        //                 }                        
        //             })
        //         } catch (err) {
        //             return Promise.reject(err)
        //         }
        //     }
        // }
    }    
    use(func){
        if (typeof func !== 'function'){
            throw new TypeError('Middleware must be composed of functions!');
        } 
        this.middlewares.push(func);
    }
    async pipingData(data,$middleware){
        try{
            await this.compose($middleware||this.middlewares)(data);
            return Promise.resolve(data)
        }catch(err){
            return Promise.reject(err)
        }
    }   
}

export default ModOnion;
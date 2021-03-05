/*
 * @Author: enmotion
 * @Date: 2021-03-01 23:02:11
 * @LastEditTime: 2021-03-05 11:47:57
 * @LastEditors: Please set LastEditors
 * @Description: easy way to build pipe to deal with data
 * @FilePath: \mod-onion\src\index.js
 */ 
module.exports = function(pipes=[]){
    // 核查pipes是否正确
    checkStack(pipes);
    var middleware=pipes;
    // 检查方法
    function checkStack(middleware){
        if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
        for (const fn of middleware) {
            if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
        }
    }
    // 组合管道
    function compose (middleware) {
        checkStack(middleware)
        return function (context, next) {
            // last called middleware #
            let index = -1
            return dispatch(0)
            function dispatch (i) {
                if (i <= index) return Promise.reject(new Error('next() called multiple times'))
                index = i
                let fn = middleware[i]
                if (i === middleware.length) fn = next
                if (!fn) return Promise.resolve()
                try {
                    return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
                } catch (err) {
                    return Promise.reject(err)
                }
            }
        }
    }   
    //拼接管道
    function use(fn){
        if (typeof fn !== 'function') throw new TypeError('onion use param must be a function!');
        middleware.push(fn);
    }
    async function pipingData(data,pipes){
        if (data.constructor !== Object) throw new TypeError('onion pipeData param must be a Object!');
        return compose(pipes)(data)       
    }
    Object.defineProperties(this,{
        $middleware:{writable:false,configurable:false,enumerable:false,value:middleware},//中间件数组
        use:{writable:false,configurable:false,enumerable:false,value:use},//添加中间件
        pipingData:{writable:true,configurable:false,enumerable:false,value:pipingData},//管道输送打包数据
    })
}
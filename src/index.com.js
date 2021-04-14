/*
 * @Author: enmotion
 * @Date: 2021-03-01 23:02:11
 * @LastEditTime: 2021-04-14 20:26:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mod-onion\src\index.js
 */
"use strict";
const ModOnion=function($middleware){
    checkStack($middleware);
    this.middlewares = $middleware||[]
    function checkStack($middleware=[]){
        if (!Array.isArray($middleware)){
            throw new TypeError('Middlewares stack must be an array!')
        } 
        for (const fn of $middleware) {
            if (typeof fn !== 'function'){
                throw new TypeError('Middleware must be composed of functions!')
            } 
        }
    }
    function compose ($middleware) {
        checkStack($middleware)
        return function(context, next) {
            let index = -1;
            return dispatch(0);
            function dispatch(i) {
                if (i <= index) return Promise.reject(new Error('next() called multiple times'));
                index = i;
                let fn = $middleware[i];                
                if (i === $middleware.length) fn = next;        
                if (!fn) return Promise.resolve();
                try {                   
                    return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
                } catch (err) {
                    return Promise.reject(err);
                }
            }
        };        
    }   
    function use(func){
        if (typeof func !== 'function'){
            throw new TypeError('Middleware must be composed of functions!');
        } 
        this.middlewares.push(func);
    }
    async function pipingData(data,$middleware){
        try{
            await compose($middleware||this.middlewares)(data);
            return Promise.resolve(data)
        }catch(err){
            return Promise.reject(err)
        }
    }   
    Object.defineProperties(this,{
        $middleware:{writable:false,configurable:false,enumerable:false,value:this.middlewares},//中间件数组
        use:{writable:false,configurable:false,enumerable:false,value:use},//添加中间件
        pipingData:{writable:true,configurable:false,enumerable:false,value:pipingData},//管道输送打包数据
    })
}

export default ModOnion;
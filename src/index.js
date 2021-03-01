/*
 * @Author: enmotion
 * @Date: 2021-03-01 23:02:11
 * @LastEditTime: 2021-03-02 03:26:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mod-onion\src\index.js
 */
const compose = require("./libs/compose")
 
module.exports = function(){
    var middleware=[];
    var pdata ={};
    function use(fn){
        if (typeof fn !== 'function') throw new TypeError('onion use param must be a function!');
        middleware.push(fn);
    }    
    function piping(){
        const fn = compose(middleware);
        const handleRequest = (data) => {
            return handleRequestFunc(data, fn);
        };
        return handleRequest;
    }
    async function pipeData(data){
        if (data.constructor !== Object) throw new TypeError('onion pipeData param must be a Object!');
        pdata = data;
        await piping()(pdata);
        return pdata;
    }
    function handleRequestFunc(ctx, fnMiddleware) {
        return fnMiddleware(ctx).then(ctx).catch(onerror);
    }
    Object.defineProperties(this,{
        $middleware:{writable:false,configurable:false,enumerable:false,value:middleware},//中间件数组
        use:{writable:false,configurable:false,enumerable:false,value:use},//添加中间件
        pipeData:{writable:true,configurable:false,enumerable:false,value:pipeData},//管道输送打包数据
    })
}
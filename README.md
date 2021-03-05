# mod-onion #

基于洋葱皮模型，创建数据管道处理结构模型。<br>

#### 功能概述：####
1.创建洋葱皮模型。<br>
2.支持Promise异步等待，错误捕获。<br>
#### install ####
npm安装命令
```
npm install --save mod-onion
```

#### Usage ####

引入包
```
import onion from "mod-onion"
```

USEAGE 使用方法 范例代码

```
import ModOnion from "mod-onion"

let onion=new ModOnion([
  async (data,next)=>{
    console.log("---------------------------")
    console.log(data,"1")
    data.name+=1
    data.age+=1
    await next()
    data.age-=1
    console.log(data,"1")
    console.log("---------------------------")
  },
  (data,next)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(async ()=>{
        console.log(data,"2")
        data.name+=1
        data.age+=1
        await next()
        data.age-=1
        console.log(data,"2")
        resolve(data)
      },2000)   
    })  
  },
  (data,next)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(async ()=>{
        console.log(data,"3")
        data.name+=1
        data.age+=1
        await next()
        ctx.age-=1
        console.log(ctx,"3")
        resolve(ctx)
      },2000)   
    })  
  }
]).then(
  value=>{
    console.log("END:value",value)
  }
)
.catch(err=>{
  console.log("END:error", err.message)
});

/* console.log
---------------------------
{name: 1001, age: 1} "1"
{name: 1002, age: 2} "2"
{name: 1003, age: 3} "3"
{name: 1004, age: 3} "3"
{name: 1004, age: 2} "2"
{name: 1004, age: 1} "1"
---------------------------
END:value {name: 1004, age: 1}
*/
```

### API 类方法 ###
#### new ModOnion(pipes)<br> ####
pipes:Array <Function> 处理管道函数数组 <br>

```
import ModOnion from "mod-onion"

let onion=new ModOnion([
  async (data,next)=>{
    console.log("---------------------------")
    console.log(data,"1")
    data.name+=1
    data.age+=1
    await next()
    data.age-=1
    console.log(data,"1")
    console.log("---------------------------")
  },
  (data,next)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(async ()=>{
        console.log(data,"2")
        data.name+=1
        data.age+=1
        await next()
        data.age-=1
        console.log(data,"2")
        resolve(data)
      },2000)   
    })  
  },
  (data,next)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(async ()=>{
        console.log(data,"3")
        data.name+=1
        data.age+=1
        await next()
        data.age-=1
        console.log(data,"3")
        resolve(data)
      },2000)   
    })  
  }
]).then(
  value=>{
    console.log("END:value",value)
  }
)
.catch(err=>{
  console.log("END:error", err.message)
});

/* console.log
---------------------------
{name: 1001, age: 1} "1"
{name: 1002, age: 2} "2"
{name: 1003, age: 3} "3"
{name: 1004, age: 3} "3"
{name: 1004, age: 2} "2"
{name: 1004, age: 1} "1"
---------------------------
END:value {name: 1004, age: 1}
*/
```
####  .use(func) #### 
func:Function 添加处理管道函数,由外至内添加。 <br>

```
onion.use((data,next)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(data,"4")
      data.name+=1
      next()
      data.name-=1
      console.log(data,"4")
      resolve(data)
    },1000)   
  })  
})
```
注意：函数必须提供两个参数
data,正在管道中处理的数据.
next,下一个内层的处理方式

管道函数可返回Promise对象.</br>
PS:请记返回Promise对象时，需通过resolve(data)方法向外层返回数据结果。

####  .pipingData(data,tempPipes) #### 
data:Object 需管道加工的数据 <br>
tempPipes:Array <Function> 处理管道函数数组,可启用临时的加工管道 <br>
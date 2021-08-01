/*
0 14 * * * jd_chinajoy.js
*/

const $ = new Env('柠檬大富翁ChinaJoy');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
let allMessage = '';


if (process.env.tswb) {
  tswb = process.env.tswb;
}

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }

  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n${tswb}`);
        }
        continue
      }

      await info()
      await task()
      await task()
      await task()
      await info()
      if(num>0){
      for (let i = 0; i < num; i++) {
      if(venueId=1){
          
      venue = venueList[0].richTask 
      for (let [index, value] of venue.entries()) {
      a = JSON.parse(JSON.stringify(venue))
      
      if(a.type = 1){
        await getStepCount(index)
      }

}

      
      }else
      if(venueId = 2){
          
      venue = venueList[1].richTask
      for (let i = 0; i < venue.length; i++) {
        if(venue[i].type=1){
            await getStepCount(i)
        }  
      }
      
      }else
      

      if(venueId = 3){
          
      venue = venueList[2].richTask
      for (let i = 0; i < venue.length; i++) {
        if(venue[i].type=1){
            await getStepCount(i)
        }  
      }
      
      }else

      if(venueId=4){
          
      venue = venueList[3].richTask
      for (let i = 0; i < venue.length; i++) {
        if(venue[i].type=1){
            await getStepCount(i)
        }  
      }
      
      }else 

      if(venueId=5){
          
      venue = venueList[4].richTask
      for (let i = 0; i < venue.length; i++) {
        if(venue[i].type=1){
            await getStepCount(i)
        }  
      }
      
      }
      }
      }else {$.log("可跳次数不足 跳过")}
await cj(0)
await cj(1)
await cj(2)
await cj(3)
await cj(4)
    }
  }
if ($.isNode() && allMessage) {
        await notify.sendNotify(`${$.name}`, `${allMessage}` )
    }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

function info() {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com/`,
      body: `appid=china-joy&functionId=cj_rich_prod&body={"apiMapping":"/rich/index/indexInfo"}&t=${Date.now()}&loginType=2`,
      headers: {
          "Origin": "https://china-joy.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "okhttp/3.12.1;jdmall;android;version/10.0.4;build/88641;screen/1080x2208;os/10;network/4g;",
        "Cookie": cookie,
      }
    }

    $.post(options, async (err, resp, data) => {
      try {
        const reust = JSON.parse(data)
        if(reust.code == 200){
          jf = reust.data.integral
          num = reust.data.lastNum
          taskProgress = reust.data.taskProgress
          venueId = reust.data.venueId
          venueList = reust.data.venueList
          $.log(`剩余积分${jf} 已走步数${taskProgress} 可跳${num}次 关数${venueId}`)
        }else if(reust.errMsg !== 200){

          $.log(reust.msg)
        }

      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}




function task() {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com/`,
      body: `appid=china-joy&functionId=cj_rich_prod&body={"apiMapping":"/rich/task/getTaskList"}&t=${Date.now()}&loginType=2`,
      headers: {
          "Origin": "https://china-joy.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "okhttp/3.12.1;jdmall;android;version/10.0.4;build/88641;screen/1080x2208;os/10;network/4g;",
        "Cookie": cookie,
      }
    }

    $.post(options, async (err, resp, data) => {
      try {
        const reust = JSON.parse(data)
        if(reust.code == 200){
     taskList = reust.data.taskList
     for (let i = 0; i < taskList.length; i++) {
     parentId = taskList[i].parentId
     taskId =  taskList[i].taskId  
     await dotask(parentId,taskId)
     await dotask2(parentId,taskId)
     await $.wait(5000)
     if(code==200){
     await dotask1(parentId,taskId,timeStamp)  
 }else {
     $.log("浏览任务已完成")
 }  
     }
        }else if(reust.errMsg !== 200){

          $.log(reust.msg)
        }

      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}




function dotask(parentId,taskId) {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com/`,
//appid=china-joy&functionId=cj_rich_prod&body={"parentId":"FOLLOW_SHOP_TASK_003","taskId":"1000004123","apiMapping":"/rich/task/doTask"}&t=1627526694743&loginType=2
      body: `appid=china-joy&functionId=cj_rich_prod&body={"parentId":"${parentId}","taskId":"${taskId}","apiMapping":"/rich/task/doTask"}&t=${Date.now()}&loginType=2`,
      headers: {
          "Origin": "https://china-joy.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "okhttp/3.12.1;jdmall;android;version/10.0.4;build/88641;screen/1080x2208;os/10;network/4g;",
        "Cookie": cookie,
      }
    }

    $.post(options, async (err, resp, data) => {
      try {
        const reust = JSON.parse(data)
        if(reust.code == 200){
        if(reust.data.score){
      score = reust.data.score
     $.log("任务获得积分"+score)}
     else if(reust.data.activityId){
         $.log("任务接取成功")
     }
        }else if(reust.errMsg !== 200){

          $.log(reust.msg)
        }

      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
function dotask2(parentId,taskId) {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com/`,
//appid=china-joy&functionId=cj_rich_prod&body={"parentId":"FOLLOW_SHOP_TASK_003","taskId":"1000004123","apiMapping":"/rich/task/doTask"}&t=1627527222757&loginType=2
      body: `appid=china-joy&functionId=cj_rich_prod&body={"parentId":"${parentId}","taskId":"${taskId}","timeStamp":${Date.now()},"apiMapping":"/rich/task/doTask"}&t=${Date.now()}&loginType=2`,
      headers: {
          "Origin": "https://china-joy.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "okhttp/3.12.1;jdmall;android;version/10.0.4;build/88641;screen/1080x2208;os/10;network/4g;",
        "Cookie": cookie,
      }
    }

    $.post(options, async (err, resp, data) => {
        //$.log(data)
      try {
        const reust = JSON.parse(data)
        if(reust.code == 200){
       code = reust.code
     timeStamp = reust.data.timeStamp
     //$.log(data)
        }else if(reust.errMsg != 200){
      code = reust.code
          $.log(reust.msg)
        }

      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
function dotask1(parentId,taskId,timeStamp) {
  return new Promise(async (resolve) => {
      
    let options = {
      url: `https://api.m.jd.com/`,
//
      body: `appid=china-joy&functionId=cj_rich_prod&body={"parentId":"${parentId}","taskId":"${taskId}","timeStamp":${timeStamp},"apiMapping":"/rich/task/getReward"}&t=${Date.now()}&loginType=2`,
      headers: {
          "Origin": "https://china-joy.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "okhttp/3.12.1;jdmall;android;version/10.0.4;build/88641;screen/1080x2208;os/10;network/4g;",
        "Cookie": cookie,
      }
    }

    $.post(options, async (err, resp, data) => {
       //console.log(`${JSON.stringify(options)}`)
      try {
        const reust = JSON.parse(data)
        if(reust.code == 200){
     score = reust.data.score
     $.log("任务获得积分"+score)
     
        }else if(reust.errMsg !== 200){

          $.log(reust.msg)
        }

      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function getStepCount(taskProgress) {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com/`,
//
      body: `appid=china-joy&functionId=cj_rich_prod&body={"taskProgress":${taskProgress},"apiMapping":"/rich/task/getStepCount"}&t=${Date.now()}&loginType=2`,
      headers: {
          "Origin": "https://china-joy.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "okhttp/3.12.1;jdmall;android;version/10.0.4;build/88641;screen/1080x2208;os/10;network/4g;",
        "Cookie": cookie,
      }
    }

    $.post(options, async (err, resp, data) => {
         //console.log(`${JSON.stringify(options)}`)
        //$.log(data)
      try {
        const reust = JSON.parse(data)
        if(reust.code == 200){
        if(reust.data.prize){
     prize = reust.data.prize
     $.log("要色子获得"+prize)
            
        }else {
        $.log(reust.msg)}
        }else if(reust.code == 5002){

          $.log(reust.msg)
        }

      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}




function cj(venueId) {
  return new Promise(async (resolve) => {
    let options = {
      url: `https://api.m.jd.com/`,
//
      body: `appid=china-joy&functionId=cj_rich_prod&body={"venueId":"${venueId}","apiMapping":"/rich/task/lottery"}&t=1627530021142&loginType=2`,
      headers: {
          "Origin": "https://china-joy.jd.com",
        "Host": "api.m.jd.com",
        "User-Agent": "okhttp/3.12.1;jdmall;android;version/10.0.4;build/88641;screen/1080x2208;os/10;network/4g;",
        "Cookie": cookie,
      }
    }

    $.post(options, async (err, resp, data) => {
         //console.log(`${JSON.stringify(options)}`)
        //$.log(data)
      try {
        const reust = JSON.parse(data)
        if(reust.code == 200){
        if(reust.data.name){
     if(reust.data.name==null){
     $.log("抽奖:毛都没有")
         
     }else {$.log("抽奖: "+reust.data.name)}
            
        }else {
        $.log(reust.msg)}
        }else if(reust.code == 5002){

          $.log(reust.msg)
        }

      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}















async function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data["retcode"] === 13) {
              $.isLogin = false; //cookie过期
              
              return;
            }
            if (data["retcode"] === 0) {
              $.nickName = (data["base"] && data["base"].nickname) || $.UserName;
              
            } else {
              $.nickName = $.UserName;
              
            }
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
async function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}
// prettier-ignore

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}


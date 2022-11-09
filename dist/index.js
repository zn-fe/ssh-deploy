#!/usr/bin/env node
(()=>{var e={569:(e,r,t)=>{e.exports=t(325)},325:(e,r,t)=>{"use strict";var n=t(81).exec;var s=t(81).execSync;var o=t(147);var c=t(17);var i=o.access;var a=o.accessSync;var u=o.constants||o;var l=process.platform=="win32";var fileNotExists=function(e,r){i(e,u.F_OK,(function(e){r(!e)}))};var fileNotExistsSync=function(e){try{a(e,u.F_OK);return false}catch(e){return true}};var localExecutable=function(e,r){i(e,u.F_OK|u.X_OK,(function(e){r(null,!e)}))};var localExecutableSync=function(e){try{a(e,u.F_OK|u.X_OK);return true}catch(e){return false}};var commandExistsUnix=function(e,r,t){fileNotExists(e,(function(s){if(!s){var o=n("command -v "+r+" 2>/dev/null"+" && { echo >&1 "+r+"; exit 0; }",(function(e,r,n){t(null,!!r)}));return}localExecutable(e,t)}))};var commandExistsWindows=function(e,r,t){if(!/^(?!(?:.*\s|.*\.|\W+)$)(?:[a-zA-Z]:)?(?:(?:[^<>:"\|\?\*\n])+(?:\/\/|\/|\\\\|\\)?)+$/m.test(e)){t(null,false);return}var s=n("where "+r,(function(e){if(e!==null){t(null,false)}else{t(null,true)}}))};var commandExistsUnixSync=function(e,r){if(fileNotExistsSync(e)){try{var t=s("command -v "+r+" 2>/dev/null"+" && { echo >&1 "+r+"; exit 0; }");return!!t}catch(e){return false}}return localExecutableSync(e)};var commandExistsWindowsSync=function(e,r,t){if(!/^(?!(?:.*\s|.*\.|\W+)$)(?:[a-zA-Z]:)?(?:(?:[^<>:"\|\?\*\n])+(?:\/\/|\/|\\\\|\\)?)+$/m.test(e)){return false}try{var n=s("where "+r,{stdio:[]});return!!n}catch(e){return false}};var cleanInput=function(e){if(/[^A-Za-z0-9_\/:=-]/.test(e)){e="'"+e.replace(/'/g,"'\\''")+"'";e=e.replace(/^(?:'')+/g,"").replace(/\\'''/g,"\\'")}return e};if(l){cleanInput=function(e){var r=/[\\]/.test(e);if(r){var t='"'+c.dirname(e)+'"';var n='"'+c.basename(e)+'"';return t+":"+n}return'"'+e+'"'}}e.exports=function commandExists(e,r){var t=cleanInput(e);if(!r&&typeof Promise!=="undefined"){return new Promise((function(r,t){commandExists(e,(function(n,s){if(s){r(e)}else{t(n)}}))}))}if(l){commandExistsWindows(e,t,r)}else{commandExistsUnix(e,t,r)}};e.exports.sync=function(e){var r=cleanInput(e);if(l){return commandExistsWindowsSync(e,r)}else{return commandExistsUnixSync(e,r)}}},748:(e,r,t)=>{const{exec:n,execSync:s}=t(81);const o={run:runCommand,runSync:runSync};function runCommand(e,r){return n(e,function(){return function(e,t,n){if(!r)return;r(e,t,n)}}(r))}function runSync(e){try{return{data:s(e).toString(),err:null,stderr:null}}catch(e){return{data:null,err:e.stderr.toString(),stderr:e.stderr.toString()}}}e.exports=o},898:(e,r,t)=>{"use strict";var n=t(81).spawn;var s=t(837);var escapeSpaces=function(e){if(typeof e==="string"){return e.replace(/\b\s/g,"\\ ")}else{return e}};var escapeSpacesInOptions=function(e){["src","dest","include","exclude","excludeFirst"].forEach((function(r){var t=e[r];if(typeof t==="string"){e[r]=escapeSpaces(t)}else if(Array.isArray(t)===true){e[r]=t.map(escapeSpaces)}}));return e};e.exports=function(e,r){e=e||{};e=s._extend({},e);e=escapeSpacesInOptions(e);var t=e.platform||process.platform;var o=t==="win32";if(typeof e.src==="undefined"){throw new Error("'src' directory is missing from options")}if(typeof e.dest==="undefined"){throw new Error("'dest' directory is missing from options")}var c=e.dest;if(typeof e.host!=="undefined"){c=e.host+":"+e.dest}if(!Array.isArray(e.src)){e.src=[e.src]}var i=[].concat(e.src);i.push(c);var a=(e.args||[]).find((function(e){return e.match(/--chmod=/)}));if(o&&!a){i.push("--chmod=ugo=rwX")}if(typeof e.host!=="undefined"||e.ssh){i.push("--rsh");var u="ssh";if(typeof e.port!=="undefined"){u+=" -p "+e.port}if(typeof e.privateKey!=="undefined"){u+=" -i "+e.privateKey}if(typeof e.sshCmdArgs!=="undefined"){u+=" "+e.sshCmdArgs.join(" ")}i.push(u)}if(e.recursive===true){i.push("--recursive")}if(e.times===true){i.push("--times")}if(e.syncDest===true||e.deleteAll===true){i.push("--delete");i.push("--delete-excluded")}if(e.syncDestIgnoreExcl===true||e.delete===true){i.push("--delete")}if(e.dryRun===true){i.push("--dry-run");i.push("--verbose")}if(typeof e.excludeFirst!=="undefined"&&s.isArray(e.excludeFirst)){e.excludeFirst.forEach((function(e,r){i.push("--exclude="+e)}))}if(typeof e.include!=="undefined"&&s.isArray(e.include)){e.include.forEach((function(e,r){i.push("--include="+e)}))}if(typeof e.exclude!=="undefined"&&s.isArray(e.exclude)){e.exclude.forEach((function(e,r){i.push("--exclude="+e)}))}switch(e.compareMode){case"sizeOnly":i.push("--size-only");break;case"checksum":i.push("--checksum");break}if(typeof e.args!=="undefined"&&s.isArray(e.args)){i=[...new Set([...i,...e.args])]}i=[...new Set(i)];var noop=function(){};var l=e.onStdout||noop;var d=e.onStderr||noop;var f="rsync ";i.forEach((function(e){if(e.substr(0,4)==="ssh "){e='"'+e+'"'}f+=e+" "}));f=f.trim();if(e.noExec){r(null,null,null,f);return}try{var p="";var y="";var v;if(o){v=n("cmd.exe",["/s","/c",'"'+f+'"'],{windowsVerbatimArguments:true,stdio:[process.stdin,"pipe","pipe"]})}else{v=n("/bin/sh",["-c",f])}v.stdout.on("data",(function(e){l(e);p+=e}));v.stderr.on("data",(function(e){d(e);y+=e}));v.on("exit",(function(e){var t=null;if(e!==0){t=new Error("rsync exited with code "+e);t.code=e}r(t,p,y,f)}))}catch(e){r(e,null,null,f)}}},505:(e,r,t)=>{const{existsSync:n,mkdirSync:s,writeFileSync:o}=t(147);const{GITHUB_WORKSPACE:c}=process.env;const validateDir=e=>{if(!n(e)){console.log(`[SSH] Creating ${e} dir in `,c);s(e);console.log("✅ [SSH] dir created.")}else{console.log(`[SSH] ${e} dir exist`)}};const validateFile=e=>{if(!n(e)){console.log(`[SSH] Creating ${e} file in `,c);try{o(e,"",{encoding:"utf8",mode:384});console.log("✅ [SSH] file created.")}catch(r){console.error("⚠️ [SSH] writeFileSync error",e,r.message);process.abort()}}else{console.log(`[SSH] ${e} file exist`)}};e.exports={validateDir:validateDir,validateFile:validateFile}},229:e=>{const r=["REMOTE_HOST","REMOTE_USER","REMOTE_PORT","SSH_PRIVATE_KEY","DEPLOY_KEY_NAME","SOURCE","TARGET","ARGS","EXCLUDE"];const t={GITHUB_WORKSPACE:process.env.GITHUB_WORKSPACE};r.forEach((e=>{t[e]=process.env[e]||process.env[`INPUT_${e}`]}));e.exports=t},447:(e,r,t)=>{const{sync:n}=t(569);const{get:s}=t(748);const validateRsync=(e=(()=>{}))=>{const r=n("rsync");if(!r){s("sudo apt-get --no-install-recommends install rsync",((r,t,n)=>{if(r){console.log("⚠️ [CLI] Rsync installation failed. Aborting ... ",r.message);process.abort()}else{console.log("✅ [CLI] Rsync installed. \n",t,n);e()}}))}else{e()}};const validateInputs=e=>{const r=Object.keys(e);const t=r.filter((r=>{const t=e[r];if(!t){console.error(`⚠️ [INPUTS] ${r} is mandatory`)}return t}));if(t.length!==r.length){console.error("⚠️ [INPUTS] Inputs not valid, aborting ...");process.abort()}};e.exports={validateRsync:validateRsync,validateInputs:validateInputs}},822:(e,r,t)=>{const{writeFileSync:n}=t(147);const{join:s}=t(17);const{validateDir:o,validateFile:c}=t(505);const{HOME:i}=process.env;const addSshKey=(e,r)=>{const t=s(i||__dirname,".ssh");const a=s(t,r);o(t);c(`${t}/known_hosts`);try{n(a,e,{encoding:"utf8",mode:384})}catch(e){console.error("⚠️ writeFileSync error",a,e.message);process.abort()}console.log("✅ Ssh key added to `.ssh` dir ",a);return a};e.exports={addSshKey:addSshKey}},81:e=>{"use strict";e.exports=require("child_process")},147:e=>{"use strict";e.exports=require("fs")},17:e=>{"use strict";e.exports=require("path")},837:e=>{"use strict";e.exports=require("util")}};var r={};function __nccwpck_require__(t){var n=r[t];if(n!==undefined){return n.exports}var s=r[t]={exports:{}};var o=true;try{e[t](s,s.exports,__nccwpck_require__);o=false}finally{if(o)delete r[t]}return s.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var t={};(()=>{const e=__nccwpck_require__(898);const{validateRsync:r,validateInputs:t}=__nccwpck_require__(447);const{addSshKey:n}=__nccwpck_require__(822);const{REMOTE_HOST:s,REMOTE_USER:o,REMOTE_PORT:c,SSH_PRIVATE_KEY:i,DEPLOY_KEY_NAME:a,SOURCE:u,TARGET:l,ARGS:d,EXCLUDE:f,GITHUB_WORKSPACE:p}=__nccwpck_require__(229);const y={ssh:true,sshCmdArgs:["-o StrictHostKeyChecking=no","-o HostKeyAlgorithms=+ssh-rsa","-o PubkeyAcceptedKeyTypes=+ssh-rsa"],recursive:true};console.log("[general] GITHUB_WORKSPACE: ",p);console.log(y);const v=(()=>{const rsync=({privateKey:r,port:t,src:n,dest:s,args:o,exclude:c})=>{console.log(`[Rsync] Starting Rsync Action: ${n} to ${s}`);if(c)console.log(`[Rsync] exluding folders ${c}`);try{e({src:n,dest:s,args:o,privateKey:r,port:t,excludeFirst:c,...y},((e,r,t,n)=>{if(e){console.error("⚠️ [Rsync] error: ",e.message);console.log("⚠️ [Rsync] stderr: ",t);console.log("⚠️ [Rsync] stdout: ",r);console.log("⚠️ [Rsync] cmd: ",n);process.abort()}else{console.log("✅ [Rsync] finished.",r)}}))}catch(e){console.error("⚠️ [Rsync] command error: ",e.message,e.stack);process.abort()}};const init=({src:e,dest:t,args:s,host:o="localhost",port:c,username:i,privateKeyContent:u,exclude:l=[]})=>{r((()=>{const r=n(u,a||"deploy_key");const d=`${i}@${o}:${t}`;rsync({privateKey:r,port:c,src:e,dest:d,args:s,exclude:l})}))};return{init:init}})();const run=()=>{t({SSH_PRIVATE_KEY:i,REMOTE_HOST:s,REMOTE_USER:o});v.init({src:`${p}/${u||""}`,dest:l||`/home/${o}/`,args:d?[d]:["-rltgoDzvO"],host:s,port:c||"22",username:o,privateKeyContent:i,exclude:(f||"").split(",").map((e=>e.trim()))})};run()})();module.exports=t})();
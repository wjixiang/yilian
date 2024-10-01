const { exec } = require('child_process');  
const chokidar = require('chokidar');  

// 监控 src 目录  
const watcher = chokidar.watch('src/**/*.ts', {  
    persistent: true,  
});  

// 监听文件变化  
watcher.on('change', (path) => {  
    console.log(`File ${path} has been changed. Compiling...`);  
    exec('tsc', (err, stdout, stderr) => {  
        if (err) {  
            console.error(`Error: ${stderr}`);  
        } else {  
            console.log(`Compiled successfully:\n${stdout}`);  
        }  
    });  
});  

console.log('Watching for changes in src directory...');
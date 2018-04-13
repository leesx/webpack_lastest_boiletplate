const Koa = require('koa');
const koaBody = require('koa-body');
const fs = require('fs');
var serve = require('koa-static');
const app = module.exports = new Koa();
const PORT = 3637

app.use(serve('./build'));
app.use(function(ctx) {
    const indexFile = fs.readFileSync('./build/index.html','utf-8');
    ctx.body = indexFile;
});

if (!module.parent) app.listen(PORT,()=>{
    console.log( 'Koa 启动成功 http://localhost:' + PORT + '; press Ctrl-C to terminate.' );
});
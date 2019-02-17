var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var app = new express();

app.use(express.static("./page/"));

// 接口在这里配置
app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));
app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.get("/queryBlogCount", loader.get("/queryBlogCount"));

app.listen(globalConfig.port, function () {
    console.log("服务已启动");
});
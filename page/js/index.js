var everyDay = new Vue({
    el: "#every_day",
    data (){
        return {
            content: ""
        }
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function () {
        // 请求数据，给content初始
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function (res) {
            everyDay.content = res.data.data[0].content;
        }).catch(function (res) {
            console.log("请求失败")
        })
    }
});

var articleList = new Vue({
    el: "#article_list",
    data:{
        articleList: [
            {
                title: "这是个标题",
                date: "2018-10-18",
                content: "此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...",
                views: "101",
                tags: "test1 test2",
                id: 1,
                link: ""
            },
            {
                title: "这是个标题",
                date: "2018-10-18",
                content: "此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...",
                views: "101",
                tags: "test1 test2",
                id: 2,
                link: ""
            },
            {
                title: "这是个标题",
                date: "2018-10-18",
                content: "此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...",
                views: "101",
                tags: "test1 test2",
                id: 3,
                link: ""
            },
            {
                title: "这是个标题",
                date: "2018-10-18",
                content: "此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...",
                views: "101",
                tags: "test1 test2",
                id: 4,
                link: ""
            }
        ]
    },
    computed: {

    },
    created: function () {
    }
});

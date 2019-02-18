function findId () {
    var searchUrlParams = location.search.indexOf("?") != -1 ? location.search.split("?")[1]: "";
    if (!searchUrlParams) {
        return
    }
    var tag = "";
    if (searchUrlParams.split("=")[0] == "tag") {
        try {
            tag = searchUrlParams.split("=")[1]
        } catch (e) {
            console.log(e)
        }
    }
    return tag
}


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

var articleListList = new Vue({
    el: "#article_list",
    data:{
        page: 1,
        pageSize: 5,
        count: 0,
        pageList: [],
        articleList: []
    },
    methods: {
        // 直接获取分页的列表
        getPage (page, pageSize) {
            // 获取数据
            axios({
                method:"get",
                url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
            }).then(function (res) {
                var list = [];
                res = res.data.data;
                for (var i = 0; i < res.length; i++) {
                    var temp = {}
                    temp.title = res[i].title;
                    temp.content = res[i].content;
                    temp.views = res[i].views;
                    temp.tags = res[i].tags;
                    temp.link = "/blog_detail.html?bid=" + res[i].id;
                    temp.date = new Date(res[i].ctime).getFullYear() + "-" +(new Date(res[i].ctime).getMonth()+1)  + "-" + new Date(res[i].ctime).getDay();
                    temp.id = res[i].id;
                    list.push(temp)
                }
                articleListList.articleList = list;
            }).catch(function () {
                console.log("请求错误")
            });
            // 获取总数
            axios({
                method: "get",
                url: "/queryBlogCount"
            }).then(function (res) {
                articleListList.count = res.data.data[0]['count']
                articleListList.generatePageTool()
            }).catch(() => {
                console.log("请求错误")
            });
        },
        // 根据标签获取分页的列表
        getTagList (page, pageSize, tag) {
            // 获取数据
            axios({
                method:"get",
                url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
            }).then(function (res) {
                var list = [];
                res = res.data.data;
                for (var i = 0; i < res.length; i++) {
                    var temp = {}
                    temp.title = res[i].title;
                    temp.content = res[i].content;
                    temp.views = res[i].views;
                    temp.tags = res[i].tags;
                    temp.link = "/blog_detail.html?bid=" + res[i].id;
                    temp.date = new Date(res[i].ctime).getFullYear() + "-" +(new Date(res[i].ctime).getMonth()+1)  + "-" + new Date(res[i].ctime).getDay();
                    temp.id = res[i].id;
                    list.push(temp)
                }
                articleListList.articleList = list;
            }).catch(function () {
                console.log("请求错误")
            });
            // 获取总数
            axios({
                method: "get",
                url: "/queryByTagCount?tag=" + tag
            }).then(function (res) {
                articleListList.count = res.data.data['count'];
                articleListList.generatePageTool()
            }).catch(() => {
                console.log("请求错误")
            });
        },
        jumpTo (val) {
            this.page = val;
            this.getPage(this.page, this.pageSize);
        },
        generatePageTool () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<",page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1});
            }
            result.push({text: nowPage, page: nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= Math.ceil((totalCount + pageSize - 1) / pageSize)) {
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            result.push({text: ">>", page: Math.ceil((totalCount + pageSize - 1) / pageSize)});
            this.pageList =  result;
        },
        getBlogList () {
            // 获取标签
            var tag = findId();
            if (!tag) {
                // 不是根据标签查的时候
                this.getPage(this.page, this.pageSize);
            } else {
                this.getTagList(this.page, this.pageSize, tag);
            }
        }
    },
    created: function () {
        this.getBlogList()
    }
});

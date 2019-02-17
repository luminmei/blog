var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
   methods: {

   },
    created () {
        var searchUrlParams = location.search.indexOf("?") != -1 ? location.search.split("?")[1]: "";
        if (!searchUrlParams) {
            return
        }
        var bid = -1
        if (searchUrlParams.split("=")[0] == "bid") {
            try {
                bid = parseInt(searchUrlParams.split("=")[1])
            } catch (e) {
                console.log(e)
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then((res) => {
            var result = res.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
        }).catch(() => {
            console.log("请求失败")
        })
    }
});
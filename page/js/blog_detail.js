function findId () {
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
    return bid
}

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
        var bid = findId();
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

var sendComment = new Vue({
    el: "#sendComment",
    data: {
        vcode: null,
        rightCode: null
    },
    methods: {
        sendComment () {
            var code = document.getElementById("comment_code").value;
            if (this.rightCode != code) {
                alert("验证码有误");
                return
            }
            var bid = findId();
            var replay = document.getElementById("comment_reply").value;
            var name = document.getElementById("comment_name").value;
            var email = document.getElementById("comment_email").value;
            var comment = document.getElementById("comment_content").value;
            // comment_reply如果是回复别人的就是-1
            axios({
                method: "get",
                url: "/addComment?bid=" + bid + "&parent=" + replay + "&name=" + name + "&email=" + email + "&comment=" + comment
            }).then((res) => {
                alert(res.data.msg)
            })
        },
        queryCode () {
            axios({
                url: "/queryRandomCode",
                method: "get"
            }).then((res) => {
                sendComment.vcode = res.data.data.data;
                sendComment.rightCode = res.data.data.text;
            }).catch(() => {
                console.log("请求失败")
            })
        },
        changeCode () {
            this.queryCode()
        }
    },
    created () {
        this.queryCode()
    }
});
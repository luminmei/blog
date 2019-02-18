var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue =  Math.random() * 255;
                return "rgb("+red+","+green+","+ blue +")"
            }
        },
        randomSize: function () {
            return function () {
                var size = (Math.random() * 20 + 12) + "px";
                return size
            }
        }
    },
    created () {
        axios({
            method:"get",
            url: "/queryRandomTags"
        }).then((res) => {
            randomTags.tags = res.data.data
        })
    }
});
var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: [
            {
                title: "这是一个链接哈哈哈",
                link: "http://www.baidu.com"
            },
            {
                title: "这是一个链接哈哈哈",
                link: "http://www.baidu.com"
            },
            {
                title: "这是一个链接哈哈哈",
                link: "http://www.baidu.com"
            },
            {
                title: "这是一个链接哈哈哈",
                link: "http://www.baidu.com"
            }
        ]
    },
    created () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then((res) => {
            var result = [];
            for (var i = 0; i < res.data.data.length;i++) {
                var temp = {}
                temp.title = res.data.data[i].title;
                temp.link = "/blog_detail.html?bid=" + res.data.data[i].id;
                result.push(temp)
            }
            newHot.titleList = result
        })
    }
});
var newComment = new Vue({
    el: "#new_comment",
    data: {
        commentList: [
            {name:"这里是用户名", date: "2018-10-10", comment:"这里是一大串评论，巴拉巴拉"},
            {name:"这里是用户名", date: "2018-10-10", comment:"这里是一大串评论，巴拉巴拉"},
            {name:"这里是用户名", date: "2018-10-10", comment:"这里是一大串评论，巴拉巴拉"},
            {name:"这里是用户名", date: "2018-10-10", comment:"这里是一大串评论，巴拉巴拉"},
            {name:"这里是用户名", date: "2018-10-10", comment:"这里是一大串评论，巴拉巴拉"},
            {name:"这里是用户名", date: "2018-10-10", comment:"这里是一大串评论，巴拉巴拉"}
        ]
    },
    computed: {

    }
})
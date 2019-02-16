var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: ["asd", "fgsdg", "aasgh","uhf", "ohdh","asd", "fgsdg", "aasgh","uhf", "ohdh","asd", "fgsdg", "aasgh","uhf", "ohdh"]
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
                var size = (Math.random() * 20 + 12) + "px"
                return size
            }
        }
    },
    create: {

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
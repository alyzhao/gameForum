<template>
    <div class="create-detail">
        <div class="left">
            <div class="game">
                <div class="img"><img :src="staticHost + gameInfo.gameimg"></div>
                <div class="intro">
                    <div class="game-detail">
                        <span class="tit">游戏类型：</span>
                        <span class="gc">{{gameInfo.gamecategory}}</span>
                    </div>
                    <div class="game-detail">
                        <span class="tit">制作公司：</span>
                        <span class="gc">{{gameInfo.productcompany}}</span>
                    </div>
                    <div class="game-detail">
                        <span class="tit">游戏语言：</span>
                        <span class="gc">{{gameInfo.language}}</span>
                    </div>
                </div>
            </div>
            <div class="comment-wrap">
                <textarea v-model="commentContent"></textarea>
                <input type="text" placeholder="请填写游戏评分, 1~10!" v-model="gameMark" style="display: block;width: 100%;padding: 3px 5px;font-size: 14px;outline: none;">
                <input type="submit" @click="comment" class="submit-comment">
            </div>
        </div>
        <div class="right">
            <div>
                <h1>{{gameInfo.gamename}}</h1>
                <div>
                    <h3>游戏介绍</h3>
                    <p>{{gameInfo.introduction}}</p>
                </div>
                <div>
                    <h3>游戏评分</h3>
                    <p><span style="font-family: Georgia,serif;color: #FF6633;font-size: 36px;">{{gameAverageMark}}</span></p>
                </div>
                <div>
                    <h3>最低配置</h3>
                    <div class="configuration">
                        <div class="fig">
                            <span class="fig-name">系统</span>
                            <span class="fig-con">{{gameInfo.system}}</span>
                        </div>
                        <div class="fig">
                            <span class="fig-name">CPU</span>
                            <span class="fig-con">{{gameInfo.cpu}}</span>
                        </div>
                        <div class="fig">
                            <span class="fig-name">内存</span>
                            <span class="fig-con">{{gameInfo.ram}}</span>
                        </div>
                        <div class="fig">
                            <span class="fig-name">硬盘</span>
                            <span class="fig-con">{{gameInfo.rom}}</span>
                        </div>
                        <div class="fig">
                            <span class="fig-name">显卡</span>
                            <span class="fig-con">{{gameInfo.gpu}}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>网友评价</h3>
                    <div class="forum-con">
                        <div class="comment">
                            <div class="com" v-for="comment in commentList">
                                <div class="user">
                                    <img :src="'http://127.0.0.1:3003/public/images/' + 'header.png'">
                                    <span>{{comment.name}}</span>
                                </div>
                                <div class="com-con">
                                    {{comment.comment}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const prodUrl = require('constants/config.js').prodUrl; 
    import qs from 'qs';
    
    export default{
        name:'detail',
        props:{
            gameId: String
        },
        data() {
            return {
                staticHost: prodUrl.staticHost,
                topicInfo: null,
                gameInfo: {
                    id: 5,
                    gameName: "怪物猎人世界",
                    gameIntro: "《怪物猎人：世界》是由CAPCOM制作发行的一款共斗动作冒险游戏。游戏中，玩家可以武装自己完成各项任务与各类可怕的怪物们战斗，在游戏的过程中逐步提升自己的狩猎技巧。与前作不同，《怪物猎人：世界》有着开放的地图和更多的怪物种类，更加细腻的画质摆脱了以前“马赛克猎人”的称号。在这样的世界中，玩家化身猎人，体验真实的狩猎生活，活用新建构的世界中各种各样的地形与生态环境享受狩猎的惊喜与兴奋，并利用狩猎怪物取得的材料，制作更强的武器和防具，挑战更强大的怪物。",
                    gameImg: "game1.png",
                    gameLanguage: "英文",
                    gameCategory: "动作游戏ACT",
                    gameCompany: "Capcom",
                },
                commentList: [],
                commentContent: null,
                gameAverageMark: '暂无评分',
                gameMark: null
            }
        },
        mounted: function() {
            console.log(this.gameId);
            this.loadData();
            let gameMark = localStorage.getItem("gameMark" + this.gameId)
            if (gameMark == null) {
                this.gameAverageMark == 暂无评分
            } else {
                this.gameAverageMark = gameMark
            }
            console.log(gameMark);
        },
        methods: {
            loadData() {
                this.axios.get(prodUrl.HOST + '/game/queryGameById/' + this.gameId).then(response => {
                    let resData = response.data;
                    this.gameInfo = resData;
                })
                this.axios.get(prodUrl.HOST + '/game/queryCommentById/' + this.gameId).then(response => {
                    let resData = response.data;
                    this.commentList = resData;
                })
                let gameMark = localStorage.getItem("gameMark" + this.gameId)
                if (gameMark == null) {
                    this.gameAverageMark == 暂无评分
                } else {
                    this.gameAverageMark = gameMark
                }
            },
            comment() {

                if (this.getCookie('username') == 'null') {
                    alert('请登录后再评论');
                    return;
                }
                if (this.commentContent == null || this.commentContent == '') {
                    alert('请输入评论内容')
                    return
                }
                if (this.gameMark == null || this.gameMark == '') {
                    alert('请输入游戏评分')
                    return
                }
                if (parseInt(this.gameMark) > 10 || parseInt(this.gameMark) < 0) {
                    alert('请输入0~10以内的评分')
                    return 
                }
                let gameMark = localStorage.getItem("gameMark" + this.gameId)
                if (gameMark == null) {
                    localStorage.setItem("gameMark" + this.gameId, this.gameMark)
                } else {
                    localStorage.setItem("gameMark" + this.gameId, Math.round((parseInt(gameMark) + parseInt(this.gameMark)) / 2))
                }
                this.axios.post(prodUrl.HOST + '/game/insertComment', qs.stringify({
                    userId: this.getCookie('userid'),
                    comment: this.commentContent,
                    gameId: this.gameId
                })).then(res => {
                    console.log(res.data)
                    alert('评论成功!')
                    this.loadData()
                })
            }
        }      
    }
</script>
<style lang="scss">
    .create-detail{
        width: 100%;
        padding:50px 120px 50px;
        display: flex;
        margin: 0 auto;
        .left{
            width: 30%;
            text-align: center;
            .game {
                background: #fbfbfb;
                box-shadow: 0 0 10px #ccc;
                border-radius: 9px;
                padding: 20px 20px 50px;
                .img{
                    width: 185px;
                    padding: 20px;
                    overflow: hidden;
                    border:1px solid #ccc;
                    margin:0 auto;
                    box-sizing: content-box;
                    background-color: #fff;
                    img{
                        width: 185px;
                    }
                }
                h4{
                    margin: 10px 0;
                    color: #5c40b1;
                }
                p{
                    text-align: left;
                    line-height: 28px;
                    font-size: 16px;
                }
                h1,span,p{
                    padding-top: 20px;
                    color: #333;
                }
                span{
                    display: inline-block;
                    font-size: 16px;
                    color: #666;
                }
                .intro {
                    line-height: 30px;
                    margin-top: 30px;
                    .game-detail {
                        text-align: left;
                        padding-left: 85px;
                    }
                }
            }
            .comment-wrap {
                padding: 20px;
                textarea {
                    width: 100%;
                    height: 150px;
                }
                .submit-comment {
                    margin-top: 20px;
                    font-size: 18px;
                    color: #fff;
                    background-color: #f3c400;
                    border: none;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
        }
        .right{
            width: 70%;
            padding-left:70px;
            padding-top: 16px;
            color: #333;
            div{
                .forum-con {
                    line-height: 30px;
                    .comment {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        div {
                            margin: 0;
                        }
                        .com {
                            width: 370px;
                            display: flex;
                            margin-bottom: 15px;
                            padding: 15px;
                            border-radius: 5px;
                            border: 1px solid #ddd;
                            box-shadow: 0 0 10px #ccc;
                            .user {
                                min-width: 100px;
                                img {
                                    border-radius: 50%;
                                    display: block;
                                    width: 50px;
                                    height: 50px;
                                    margin-left: 20px;
                                }
                                span {
                                    color: #333;
                                    font-size: 14px;
                                    display: block;
                                    text-align: center;
                                    line-height: 22px;
                                    padding-right: 10px;
                                    margin-top: 8px;
                                }
                            }
                            .com-con {
                                line-height: 25px;
                                font-size: 14px;
                                color: #555;
                                height: 150px;
                                overflow: hidden;
                            }
                        }
                    }
                }
                h1:after{
                    display: block;
                    content: '';
                    width: 30px;
                    height: 5px;
                    background: #5337ae;
                    margin: 20px 0 40px;
                }
                div{
                    margin-bottom: 20px;
                    h3,p{
                        padding-bottom: 15px;
                    }
                    p{
                        font-size: 16px;
                        line-height: 28px;
                    }
                }
            }
            .configuration {
                margin-top: 20px;
                .fig {
                    span {
                        display: inline-block;
                    }
                    .fig-name {
                        color: #333;
                        width: 50px;
                        margin-right: 15px;
                        text-align: center;
                    }
                    .fig-con {
                        color: #555;
                        font-size: 14px;
                    }
                }
            }
        }
    }

    .forum-detail {
        .cell {
            .c-in {
                .items:nth-child(3n) {
                    margin-right: 37px;
                }
                .ctt, .ccon{
                    padding-bottom: 0;
                }
                .peop {
                    margin-bottom: 0;
                    div {
                        margin-bottom: 0;
                    }
                    p {
                        padding-bottom: 0;
                    }
                }
            }

        }
    }

    @media screen and (max-width: 1200px){
        .create-detail{
            padding: 42px 53px 20px;
            .left{
                width: 40%;
            }
            .right{
                padding-left: 37px;
            }
        }
    }
    @media screen and (max-width: 768px){
        .create-detail{
            padding: 24px 15px 20px;
            display: block;
            .left{
                width: 100%;
                div{
                    h4{
                        font-size:18px;
                    }
                }
            }
            .right{
                width: 100%;
                padding-left: 0;
                div{
                    h1:after{
                        width: 27px;
                        height: 4px;
                        background: #5337ae;
                        margin: 10px 0 18px;
                    }
                }
            }
        }
    }    
</style>
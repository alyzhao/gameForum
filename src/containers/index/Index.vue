<template>
	<div>
        <ActiveX />
		<div class="main-content">
			<div class="content">
				<!-- 游戏 -->
				<div class="cell ts clearfix">
					<p class="tit">游戏推荐</p>
					<p class="sub-tit">
						最新, 最热游戏推荐
					</p>
					<div class="c-in clearfix">
                        <div class="items" v-for="item in gameList" :key="item.id" @click="goGameDetail(item.id)">
                            <p class="ctt"><a @click="goGameDetail(item.id)" :title="item.gamename">{{item.gamename}}</a></p>
                            <p class="ccon"><a :title="item.introduction">{{item.introduction}}</a></p>
                            <div class="peop">
                                <a class="portrait" target="_blank"><img height="60" width="60" :src="staticHost + item.gameimg"></a>
                                <div class="productor">
                                    <p class="cp overh">游戏类型:  {{item.gamecategory}}</p>
                                    <p class="cp overh">游戏语言:  {{item.language}}</p>             
                                    <p class="cp overh">制作公司:  {{item.productcompany}}</p>
                                </div>
                            </div>
                        </div>
					</div>
					<div class="more"><router-link to="/game">查看更多</router-link></div>
				</div>

				<!-- 硬件 -->
				<div class="cell ts clearfix hardware">
					<p class="tit">硬件推荐</p>
					<p class="sub-tit">
						最新, 性价比最高硬件推荐
					</p>
					<div class="c-in clearfix">

                        <div class="items" v-for="item in hardWareList" :key="item.id" @click="goHardWareDetail(item.id)">
                            <p class="ctt"><a @click="goHardWareDetail(item.id)">{{item.name}}</a></p>
                            <p class="ccon"><a>{{item.introduction}}</a></p>
                            <div class="peop">
                                <a class="portrait" target="_blank"><img height="60" width="60" :src="staticHost + item.img"/></a>
                                <div class="productor">
                                	<div class="info">
                                		<p class="cp overh" v-for="(p, index) in item.paramter" :key="index">{{p}}</p>
	                                </div>
	                                <p class="price overh"><span>参考价格: </span>{{item.price}}</p>
                                </div>
                            </div>
                        </div>

					</div>
					<div class="more"><router-link to="/hardware">查看更多</router-link></div>
				</div>
			</div>

        </div>
    </div>
</template>

<script>

    import qs from 'qs';

    const prodUrl = require('constants/config.js').prodUrl;

    export default {
        data() {
            return {
                staticHost: prodUrl.staticHost,
                gameList: [],

                hardWareList: []
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.loadData();
            })
        },
        methods: {
            goGameDetail(id) {
                this.$router.push({path: `/game/${id}`})
            },
            goReuniteDetail(id) {
                this.$router.push({path: `/reunite/${id}`})
            },
            loadData() {
            	this.axios.get(prodUrl.HOST + '/game/queryGameAll/1/6').then(response => {
            		let resData = response.data;

            		this.gameList = resData;
            		console.log(this.gameList);
            	})

            	this.axios.get(prodUrl.HOST + '/game/queryHardWareAll/1/6').then(response => {
            		let resData = response.data;
            		resData.map(item => {
            			item.paramter = item.paramter.split('#');
            		})
            		console.log(resData);
            		this.hardWareList = resData;
            	})
            },
            goHardWareDetail(id) {
            	this.$router.push({path: `/hardware/${id}`})
            }
        }
    }
</script>
<style lang="scss">
	.content {
		width: 1200px;
		margin: 0 auto;
	}
	.cell.tss {
		overflow: hidden;
        background-size: auto 100%;
		.sub-tit {
			color: #fff;
		}
		.tss-con {
			padding: 38px;
		    background-color: rgba(151, 116, 231, 0.2);
		    width: 1075px;
		    margin: 0 auto;
		    box-shadow: inset 0px 0px 55px rgba(246, 202, 253, 0.3);
			p {
			    color: #fff;
			    font-size: 18px;
			    line-height: 38px;
			    text-align: justify;
			    &.invite {
				    font-size: 20px;
				    font-weight: bold;
				    margin-top: 15px;			    	
			    }
			}
		}
        .c-in {
            padding-bottom: 85px;
        }
	}
	.cell {
		&.hardware {
			.c-in .items .peop .portrait img {
				width: 138px;
			}
			.c-in .items .peop .portrait {
				min-width:138px;
			}
			.c-in .items .cp, .cell .c-in .items .ct {
				font-size: 14px;
			}
			.c-in .items .peop .info {
				height: 100px;
				overflow: hidden;
			}
			.c-in .items .peop .price {
				span {
					font-size: 14px;
					color: #333;
					font-weight: normal;
				}
				margin-left: 10px;
				color: #f33;
				font-weight: bold;
				white-space: nowrap
			}
		}
		&.ts {
			.more {
				margin-top: 30px;
			}
		}
		.tit {
			margin-top: 80px;			
			height: 95px;
			text-align: center;
            line-height: 95px;
            font-weight: bold;
            font-size: 24px;
			img {
				height: 75px;
			}
		}
		.sub-tit {
			color: #333;
			font-size: 20px;
			text-align: center;
			.tt {
				color: #4122a0;
				font-size: 26px;
				font-weight: 400;
			}
			.bt {
				display: block;
				background-color: #42a1ff;
				color: #fff;
				font-size: 22px;
				font-weight: 400;
				padding: 5px 20px;
				border-radius: 5px;
			}
		}
		.c-in {
			margin-top: 60px;
			width: 100%;
			.items {
				float: left;
				width: 375px;
				margin: 0 37px 37px 0;
				background-color: #fff;
				padding: 15px 20px;
				color: #333;
				box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, .2);
				cursor: pointer;
				&:nth-child(3n) {
					margin-right: 0;
				}
				.peop {
					display: flex;
					margin-top: 15px;
					overflow: hidden;
					.portrait {
						display: block;
                        min-width: 100px;
						overflow: hidden;
						img {
							display: block;
                            width: 100px;
                            height: 132px;
						}
					}
				}
				.cp {
					font-size: 16px;
                    margin-bottom: 5px;
				}
				.cp, .ct {
					margin-left: 10px;
				}
				.ct {
					color: #666;
					font-size: 16px;
					width: 265px;
					a {
						color: #666;
					}
				}
				.ctt {
					font-size: 24px;
					line-height: 40px;
					color: #333;
					width: 335px;
					margin-bottom: 5px;
					height: 40px;
					overflow: hidden;
					cursor: pointer;
					a {
						color: #333;
						font-weight: 600;
					}
				}
				.ccon {
					height: 85px;
					line-height: 28px;
					font-size: 14px;
					overflow: hidden;
					a {
						color: #666;						
					}
				}
			}
		}
		.more {
			margin-top: 10px;
			margin-bottom: 90px;			
			a {
				display: block;
				margin: 0 auto;
				width: 400px;
				line-height: 70px;
				background: #5c40b1;
				color: #fff;
				font-size: 22px;
				text-align: center;
				border-radius: 5px;
			}
		}
		.c-in .swiper-slide {
			width: 285px;
		}
		.tjslide {
			width: 100%;
			position: relative;
			.tj-con {
				width: 1200px;
				margin: 0 auto;
				cursor: pointer;
			}
			.details {
				width: 1200px;
				margin: 0 auto;
				.kn {
					background-color: #ffcc00;
					color: #333;
					font-size: 24px;
					line-height: 80px;
					display: inline-block;
					padding: 0 33px;			
				}
			}
			.info {
				width: 400px;
				height: 425px;
				overflow: hidden;
				float: left;
				background-color: #fff;
				p {
					color: #333;
					padding-left: 25px;
					padding-right: 25px;
				}
				.peo {
					font-size: 18px;
				}
				.ra {
					font-size: 30px;
					margin-top: 25px;
					margin-bottom: 15px;
					height: 85px;
					overflow: hidden;
					word-break: keep-all;
				}
				.rab {
					margin: 5px 0 15px;
				}
				.team {
					font-size: 24px;
					margin-top: 5px;
                    &.position {
                        font-size: 20px;
                    }
				}
				.split span {
					display: inline-block;
					width: 20px;
					height: 6px;
					background-color: #333;
				}
				.intro {
					font-size: 16px;
					color: #666;
					text-align: justify;
					line-height: 30px;
					padding-top: 15px;
					padding-bottom: 40px;
					p {
						height: 148px;
						overflow: hidden;
					}
				}
			}
			.tj-img {
				float: left;
				height: 425px;
				img {
					width: 800px;
					height: 425px;
				}
			}
		}
		.swiper-pagination-tj {
			text-align: center;
			margin-top: 75px;
			margin-bottom: 30px;
			.swiper-pagination-bullet {
				width: 12px;
				height: 12px;
				background: #000;
				border-radius: 0;
				opacity: 1;
				margin: 0 8px !important;
				&.swiper-pagination-bullet-active {
					background-color: #ffcc00;
				}
			}
		}
		.swiper-button-prev, .swiper-button-next {
			width: 120px;
			height: 240px;
			background-color: #fff;
			text-align: center;
			line-height: 240px;
			position: absolute;
			color: #666;
			top: 110px;
		}
		.swiper-button-prev {
			left: 0;
		}
		.swiper-button-next {
			right: 0;
		}
		&.tj .more{
			margin-top: 60px;
		    margin-bottom: 63px;
		}
		&.xs {
			.c-in {
				height: 588px;
				background-color: #ffcc00;
			}
		}
		&.bf {
			margin-bottom: 80px;
			.c-in.pt {
				display: flex;
				width: 100%;
				flex-wrap: wrap;
				.item {
					width: 400px;
					height: 400px;
					overflow: hidden;
					// flex-grow: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					.bg {
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						overflow: hidden;
						background-color: #333;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.con {
						width: 190px;
						height: 190px;
						border: 5px solid #fff;
						text-align: center;
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 20px;
						word-break: keep-all;
						a {
							font-size: 26px;
							color: #fff;
							font-weight: bold;
						}
					}
					.bmore {
					    width: 190px;
					    height: 190px;
						text-align: center;
						position: relative;
						a {
							color: #ffcc00;
							font-size: 30px;
							font-weight: 600;
							line-height: 190px;
							i {
								margin-left: 5px;
								display: inline-block;
								width: 30px;
								height: 30px;
								border-radius: 100%;
								border: 1px solid #ffcc00;
								line-height: 26px;
							}
						}
					}
				}
			}
		}
		&.zy {
			.sub-tit {
				color: #fff;
			}
			.zy-tit {
				color: #fff;
				font-size: 26px;
				text-align: center;
				margin: 60px 0 58px;
			}
			.zyp-wrap {
				width: 230px;
				height: 301px;				
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				.vna {
					width: 100%;
					color: #fff;
					text-align: center;
					font-size: 20px;
				}
			}
			.swiper-slide-next + .swiper-slide .zyp-slide {
				transform: scale(1.25);				
			}
			.zyp-slide {
				width: 180px;
				height: 180px;
				border-radius: 100%;
				overflow: hidden;
				transition: transform .3s;
				position: relative;
				&:hover {
					transform: scale(1.25);
					.intro {
						visibility: visible;
						opacity: 1;
					}
				}
				.zyp-img, img {
					width: 100%;
					height: 100%;
				}
				.intro {
					background-color: #fece00;
					background-color: rgba(255, 204, 0, .8);
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					opacity: 0;
					visibility: hidden;
					transition: all .3s;
					p {
						text-align: center;
						padding: 0 15px;
						color: #333;
						font-size: 12px;
						display: flex;
						align-items: center;
					}
					.vna {
						font-size: 22px;
						margin-top: 30px;
					}
					.vcon {
						height: 110px;
						overflow: hidden;
						margin-top: 35px;
					}
				}
			}
			.more {
				margin-top: 88px;
				a {
					background-color: #fece00;
					color: #333;
				}
			}
		}
		&.jg {
            .c-in {
                margin-top: 35px;
            }
			.zyjg-swiper {
				display: block;
			}
			.zy-slide {
				display: flex;
				flex-wrap: wrap;
				.mark {
					width: 225px;
					height: 135px;
					background-color: rgba(255, 255, 255, .1);
					margin-bottom: 20px;
					margin-right: 15px;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						max-height: 135px;
						max-width: 225px;
					}
				}
				&.mb {
					display: none;
				}
			}
			.swiper-container {
				padding-bottom: 40px;
			}
			.swiper-pagination {
				bottom: 0;
			}
			.swiper-pagination-bullet {
				width: 12px;
				height: 12px;
				background: #000;
				border-radius: 0;
				opacity: 1;
				margin: 0 8px !important;
				&.swiper-pagination-bullet-active {
					background-color: #ffcc00;
				}
			}
			.zyjg {
				text-align: center;
				font-size: 26px;
				color: #333;
				margin-top: 65px;
			}
			.more {
				margin-top: 20px;
			}
			.swpagination {
				margin-bottom: 20px;
			}
		}
	}
	.mb-zy {
		display: none;
		flex-wrap: wrap;
			.mb-zy-cell {
				width: 50%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				margin-bottom: 60px;
				.img-wrap {
					width: 200px;
					height: 200px;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
                        border-radius: 50%;
					}
				}
				.name {
					width: 100%;
					text-align: center;
					color: #ffc300;
					font-size: 30px;
					padding: 10px 0;
				}
				.tro {
					color: #fff;
					font-size: 24px;
					padding: 0 100px;
					height: 145px;
					overflow: hidden;
				}
			}		
	}
	@media (max-width: 1200px) {
		.content {
			width: 100%;		
		}
		.cell .c-in {
			padding: 0 10px;
			.items {
				width: 49%;
				margin: 0 2% 13px 0;
				&:nth-child(2n) {
					margin-right: 0;
				}
				&:nth-child(2n - 1) {
					margin-right: 2%;
				}
			}
		}
		.cell .c-in .items .ctt {
			width: 100%;
		}
		.swiper-button-prev, .swiper-button-next {
			display: none;
		}
		.cell .tjslide .tj-con {
			width: 100%;
		}
		.cell .tjslide .info {
			width: 100%;
		}
		.cell .tjslide .info .team {
			white-space: normal;
			overflow: hidden;
		}
		.cell .tjslide .info .intro p {
			height: 90px;
			overflow: hidden;
		}
		.cell .tjslide .tj-img {
			height: auto;
			width: 100%;
			float: none;
			img {
				height: auto;
				width: 100%;
			}
		}
		.cell.zy .swiper-container {
			display: none;
		}
		.mb-zy {
			display: flex;
		}
		.cell.bf .c-in.pt .item {
			height: 50vw;
		}
	}
	@media (max-width: 768px) {
		.cell.bf .c-in.pt .item .con {
			width: 12rem;
			height: 12rem;
		}
		.mb-zy .mb-zy-cell .tro {
			padding: 0 1rem;
		    font-size: 1.2rem;
		    height: 5rem;
		}
		.cell.jg .zy-slide .mark {
			width: 50%;
			margin: 0;
			a {
				padding: 10px;
			}
		}
		.cell .c-in .items .peop .portrait {
			margin-right: 15px;
		}
		.cell .c-in .items .cp, .cell .c-in .items .ct {
			margin-left: 0;
		}
		.cell .sub-tit {
			padding: 0 .8rem;
		}
		.cell.bf .c-in.pt .item .bmore a {
			font-size: 1.5rem;
		}
		.cell .more a {
			width: 95%;
		}
		.mb-zy .mb-zy-cell .img-wrap {
			height: 50vw;
			width: 100%;
			padding: .8rem;
		}
		.cell.jg .zyjg-swiper {
			display: none;
		}
		.cell.jg .zy-slide.mb {
			display: flex;
		}
		.cell.tss {
			background: #295176;
			padding-bottom: 20px;
		}
		.cell.tss .tss-con p {
			font-size: 16px;
		}
		.cell.tss .tss-con p.invite {
			font-size: 18px;
			text-indent: 0;
		}
		.cell.tss .tss-con {
			width: 100%;
		}
		.cell.tss {
			height: auto;
		}
		.cell .tit img {
			margin-left: 35px;
		}
		.cell .tit{
			margin-top: 20px;
		}
		.cell .sub-tit {
			margin-top: 0;
		}
		.cell .c-in {
			margin-top: 10px;
		}
		.cell .c-in .items {
			width: 100%;
		    margin: 0 0 10px;
		}
		.cell .c-in .items:nth-child(2n - 1) {
			margin-right: 0;
		}
		.cell .c-in .items .ctt {
			max-height: 80px;
			height: auto;
			font-size: 22px;
		}
		.cell .c-in .items .ct {
			width: 100%;
		}
		.cell .more {
			margin-bottom: 40px;
		}
		.cell.tss .tss-con {
			padding: 25px;
		}
		.cell.tss .tss-con p {
			line-height: 30px;
		}
		.cell .sub-tit {
			font-size: 18px;
		}
		.cell .tjslide .info .ra {
			height: 75px;
			font-size: 26px;
		}
		.cell .tjslide .info .team {
			font-size: 22px;
		}
		.cell .swiper-pagination-tj {
		    margin-top: 35px;
		    margin-bottom: 0px;
		}
		.cell.tj .more {
			margin-top: 30px;
		}
		.cell.zy .zy-tit {
		    font-size: 22px;
		    margin: 30px 0 35px;
    	}
		.mb-zy .mb-zy-cell .name {
			font-size: 20px;
			padding-bottom: 5px;
		}
		.mb-zy .mb-zy-cell .tro {
			font-size: 14px;
		}
		.mb-zy .mb-zy-cell {
			margin-bottom: 0;
		}
		.cell.zy {
			padding-bottom: 35px;
		}
		.cell.jg .zyjg {
			font-size: 28px;
			margin-top: 35px;
		}
		.cell.jg .zy-slide .mark {
			height: 95px;
		}
		.footer .main {
			padding-top: 20px;
		}
		.footer .main .min-main .min-l ul {
			margin: 10px 0;
		}
        .cell.jg .zy-slide .mark img {
            max-height: 95px;
            max-width: 100%;
        }
	}
</style>
<template>
    <div class="activex">
        <div class="content">
            <div class="activex-con" v-if="supportActiveX">
                <div class="fl">
                    <div class="activex-wrap" ref="activex"></div>
                    <div class="rank">综合评分：<span class="letter">{{rank}}</span></div>
                </div>
                <div class="fr">
                    <div class="hardware clearfix">
                        <div class="cell clearfix">
                            <i class="fl cpu fa fa-object-group"></i>
                            <div class="fl info">
                                <div>CPU</div>
                                <div>{{hardware.CPU}}</div>
                            </div>
                        </div>
                        <div class="cell clearfix">
                            <i class="fl dashboard fa fa-dashboard"></i>
                            <div class="fl info">
                                <div>主板</div>
                                <div>{{hardware.BaseBoard}}</div>
                            </div>
                        </div>
                        <div class="cell clearfix">
                            <i class="fl raw fa fa-sticky-note"></i>
                            <div class="fl info">
                                <div>内存</div>
                                <div>{{hardware.Ram}} GB</div>
                            </div>
                        </div>
                        <div class="cell clearfix">
                            <i class="fl raw fa fa-newspaper-o"></i>
                            <div class="fl info">
                                <div>显卡</div>
                                <div>{{hardware.VideoController.join(' + ')}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-support" v-else>
                <div>您的浏览器暂不支持跑分, 请使用IE浏览器!</div>
            </div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    import { activexChartsOption } from 'constants/activexChartsOption';
    import { cloneDeep } from 'lodash';
    import { waterfall } from 'async';
    import { prodUrl } from 'constants/config';

    export default {
        data() {
            return {
                supportActiveX: true,
                hardware: {
                    CPU: '赛扬G550',
                    Ram: 8,
                    VideoController: ['TitanV']
                },
                rank: null
            }
        },
        mounted() {

            try {
                let locator = new ActiveXObject("WbemScripting.SWbemLocator");
            } catch (error) {
                if (error) {
                    console.log(error);
                    this.supportActiveX = false;
                }
            }
            if (this.supportActiveX) {
                console.log(this.getHardwareInfo());
                this.hardware = this.getHardwareInfo();

                waterfall([
                    (cb) => {
                        let cup = this.hardware.CPU
                        if (cpu.split('@').length > 0) {
                            cup = cpu.split('@')[0]
                        }
                        this.axios.get(prodUrl.HOST + '/game/queryHardWareRank/' + cup).then(response => {
                            if (response.data == '') {
                                cb('nodata');
                            } else {
                                console.log(response.data);
                                cb(null, {rankCpu: response.data})
                            }
                        })
                    },
                    (result, cb) => {
                        console.log(result)
                        let rank = result;
                        this.axios.get(prodUrl.HOST + '/game/queryHardWareRank/' + this.hardware.VideoController[0]).then(response => {
                            if (response.data == '') {
                                cb('nodata');
                            } else {
                                console.log(response.data);
                                rank.rankVideoController = response.data;
                                console.log(rank);
                                cb(null, rank)
                            }
                        })
                    }
                ], (error, result) => {
                    if (error) {
                        console.log(error);
                        alert('信息不足, 无法评分!');
                        return;
                    } else {
                        console.log(result)
                        let fCPU = this.getFraction(result.rankCpu);
                        let fVideo = this.getFraction(result.rankVideoController);
                        let fRam = null;
                        let ram = this.hardware.Ram;
                        if (ram <= 8) {
                            fRam = 90;
                        } else if (ram <= 16) {
                            fRam = 180;
                        } else if (ram <= 32) {
                            fRam = 225;
                        } else {
                            fRam = 270;
                        }
                        let fAll = fCPU + fVideo + fRam;
                        if (fAll >= 810) {
                            this.rank = 'A';
                        } else if (fAll >= 675) {
                            this.rank = 'B';
                        } else if (fAll >= 540) {
                            this.rank = 'C';
                        } else {
                            this.rank = 'D';
                        }
                        this.chartsInit(fAll);
                    }
                })
            }

        },
        methods: {
            chartsInit(value) {                
                let activexDom = this.$refs.activex;
                console.log(activexDom);

                let activexCharts = echarts.init(activexDom);
                let option = cloneDeep(activexChartsOption);
                option.series[0].data[0].value = value;   

                activexCharts.setOption(option);

            },
            getHardwareInfo() {
                let locator = new ActiveXObject("WbemScripting.SWbemLocator");
                console.log(locator);
                let service = locator.ConnectServer(".");

                let hardware = {};

                // CPU
                let properties = service.ExecQuery("SELECT * FROM Win32_Processor");     
                let e = new Enumerator(properties); 
                for (; !e.atEnd(); e.moveNext ()) {
                    let p = e.item();
                    hardware.CPU = p.Name;
                }

                // 主板
                let properties_BaseBoard = service.ExecQuery("SELECT * FROM Win32_BaseBoard");
                let e_BaseBoard = new Enumerator(properties_BaseBoard);
                for (; !e_BaseBoard.atEnd(); e_BaseBoard.moveNext ()) {
                    let p = e_BaseBoard.item();
                    console.log(p);
                    console.log(p.Name);
                    hardware.BaseBoard = p.Product;
                }

                // 显卡

                let properties_VideoController = service.ExecQuery("SELECT * FROM Win32_VideoController");
                let e_VideoController = new Enumerator(properties_VideoController);
                let video = []
                for(let i = 0; !e_VideoController.atEnd(); e_VideoController.moveNext()) {
                    video[i] = e_VideoController.item().Caption;
                    i++;
                }
                hardware.VideoController = video;

                // 内存
                let system = new Enumerator (service.ExecQuery("SELECT * FROM Win32_ComputerSystem")).item();
                var physicMenCap = Math.ceil(system.TotalPhysicalMemory/1024/1024);
                var memory = new Enumerator (service.ExecQuery("SELECT * FROM Win32_PhysicalMemory"));
                let mem = []
                for (let i = 0; !memory.atEnd(); memory.moveNext()){   
                    mem[i++] = {
                        cap:memory.item().Capacity/1024/1024,
                        speed:memory.item().Speed
                    };  
                }
                let memDX = 0;
                for (var mi = 0; mi < mem.length; mi++){  
                    memDX += mem[mi].cap;
                }
                hardware.Ram = memDX / 1024;

                // 硬盘

                return hardware;
            },
            baseBoardInfo(service) {
                let properties = service.ExecQuery("SELECT * FROM Win32_BaseBoard");  
                let e = new Enumerator(properties);
                for (; !e.atEnd(); e.moveNext()) {
                    let p = e.item;
                    return p.Product;
                }
            },
            getFraction(rank) {
                let f = null;
                switch(rank) {
                    case 'A':
                        f = 270;
                        break;
                    case 'B':
                        f = 225;
                        break;
                    case 'C':
                        f = 180;
                        break;
                    case 'D':
                        f = 90;
                        break;
                }
                return f;
            }
        }
    }
</script>
<style lang="scss">
    .activex {
        height: 730px;
        background-image: linear-gradient(180deg, #6246b9,#9667ff);
        .content {
            height: 100%;
        }
        .activex-wrap {
            width: 500px;
            height: 600px;
            text-align: center;
            line-height: 730px;
        }
        .rank {
            font-size: 24px;
            color: #fff;
            text-align: center;
            margin-top: -80px;
        }
        .no-support {
            color: #fff;
            font-size: 24px;
            text-align: center;
            padding-top: 300px;
        }
        .hardware {
            width: 668px;
            margin-top: 90px;
            box-shadow: inset 0px 0px 55px rgba(246, 202, 253, 0.3);
            padding: 25px;
            min-height: 500px;
            .cell {
                width: 50%;
                float: left;
                color: #fff;
                font-size: 14px;
                padding: 0 15px 15px 0;
                i {
                    display: block;
                    padding-right: 18px;
                    line-height: 24px;
                    color: #CCCC33;
                    font-size: 16px;
                }
                .info {
                    width: 235px;
                    div {
                        &:first-child {
                            color: #f1f1f1;
                        }
                        &:last-child {
                            color: #b7b7b7;
                            font-size: 12px;
                            height: 36px;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }
</style>
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// import Schedule from './containers/Schedule.vue';
// import creativity from './containers/creativity.vue';

// import ScrollContainer from 'components/ScrollContainer';

import Index from './containers/index/Index.vue';

import Game from './containers/game/Game.vue';
import GameDetail from './containers/game/GameDetail.vue';

import Hardware from './containers/hardware/Hardware.vue';
import HardwareDetail from './containers/hardware/HardwareDetail.vue'

const routes = [
    {path: '/', redirect: '/index'},
    {path: '/index', component: Index},
    {
        path: '/game', component: Game,
        children: [
            {
                path: ':gameId',
                component: GameDetail,
                props: true
            }
        ]
    },
    {
        path: '/hardware', component: Hardware,
        children: [
            {
                path: ':hardwareId',
                component: HardwareDetail,
                props: true
            }
        ]
    }
]

export default new Router({
    // mode: 'history',   // 以正常的路由显示
    routes,
    linkActiveClass: 'is-active'    // 这是链接激活时的class, tells the vue-router what class to add to the navigation to make the menu item active
})
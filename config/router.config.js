export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: '首页',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/users',
        name: '用户管理',
        icon: 'team',
        component: './users',
      },
      {
        path: '/type',
        name: '主题管理',
        icon: 'file-done',
        component: './contentype',
      },
      {
        path: '/content',
        name: '内容管理',
        icon: 'profile',
        component: './content',
      },
      {
        path: '/comment',
        name: '评论管理',
        icon: 'message',
        component: './comment',
      }, 
      {
        path: '/save',
        name: '收藏管理',
        icon: 'heart',
        component: './save',
      },
      {
        path: '/mark',
        name: '点赞管理',
        icon: 'star',
        component: './mark',
      },
    ],
  },
  {
    component: './404',
  },
];

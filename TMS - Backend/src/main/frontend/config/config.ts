// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  hash: true,
  routes,
  theme: {
    'root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  proxy: {
    '/api/':{
      target:'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {'^':''},
    },
  },
  fastRefresh: true,
  model: {},
  initialState: {},
  title: 'Ant Design Pro',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  antd: {},
  request: {},
  access: {},
  headScripts: [
    { src: '/scripts/loading.js', async: true },
  ],
  //================ pro 插件配置 =================
  presets: ['umi-presets-pro'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
});

// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import 'egg-onerror';
import 'egg-session';
import 'egg-i18n';
import 'egg-watcher';
import 'egg-multipart';
import 'egg-security';
import 'egg-development';
import 'egg-logrotator';
import 'egg-schedule';
import 'egg-static';
import 'egg-jsonp';
import 'egg-view';
import '@eggjs/tegg-plugin';
import '@eggjs/tegg-controller-plugin';
import '@eggjs/tegg-config';
import 'egg-mongoose';
import 'egg-redis';
import 'egg-jwt';
import 'egg-typebox-validate';
import { EggPluginItem } from 'egg';
declare module 'egg' {
  interface EggPlugin {
    onerror?: EggPluginItem;
    session?: EggPluginItem;
    i18n?: EggPluginItem;
    watcher?: EggPluginItem;
    multipart?: EggPluginItem;
    security?: EggPluginItem;
    development?: EggPluginItem;
    logrotator?: EggPluginItem;
    schedule?: EggPluginItem;
    static?: EggPluginItem;
    jsonp?: EggPluginItem;
    view?: EggPluginItem;
    tegg?: EggPluginItem;
    teggController?: EggPluginItem;
    teggConfig?: EggPluginItem;
    mongoose?: EggPluginItem;
    redis?: EggPluginItem;
    jwt?: EggPluginItem;
    typeboxValidate?: EggPluginItem;
  }
}
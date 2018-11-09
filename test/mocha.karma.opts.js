import React from 'react';
import ReactDOM from 'react-dom';

import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { expect } from 'chai';
import sinon from 'sinon';

global.React = React;
global.ReactDOM = ReactDOM;
global.expect = expect;
global.sinon = sinon;
global.shallow = shallow;
global.mount = mount;


import i18n from '../src/i18n';
import createStore from '../src/Redux/index.js'

global.i18n = i18n;

const {persistor, store} = createStore()
global.store = store;   // 测试对象共用一个store对象， 要求: 每个测试用例finally reset store ，避免对其他测试用例产生影响

import API from '../src/Services/Api';
global.api = API.create();
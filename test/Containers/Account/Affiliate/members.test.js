import ConnectedMembers, {MembersList, Members} from '../../../../src/Containers/Account/Affiliate/MembersTry';
import {changeErr, Url, checkStoreMapDom } from '../../../helper';
import MembersActions, {INITIAL_STATE} from '../../../../src/Redux/MembersRedux';
import {tMock} from '../../../mock';

const props = {
    t: i18n.t,
    timezone: '+08:00'
}

describe('Containers/MembersTry', () => {
    describe('MembersList', () => {
        it('li length should equal data deep length', () => {
            membersTest.map((item, index) => {
                const itemProps = {...props, members: item}
                const wrapper = shallow(<MembersList {...itemProps}/>);
                changeErr(()=>expect(wrapper.find('li')).to.have.length(calculateLength(item)), `membersTest[${index}]`);
            })
        })
        it('li should not have children li', () => {
            membersTest.map((item, index) => {
                const itemProps = {...props, members: item}
                const wrapper = shallow(<MembersList {...itemProps}/>);
                changeErr(()=>expect(wrapper.find('li').children('li').exists()).to.equal(false), `membersTest[${index}]`);
            })
        })
        it('children should open when click item', () => {
            const itemProps = {...props, members: membersTest[2]}
            const wrapper = shallow(<MembersList {...itemProps}/>);
            checkChildrenOpen(wrapper, 0);
            checkChildrenOpen(wrapper, 1);
            checkChildrenTuckUp(wrapper, 1);
            checkChildrenTuckUp(wrapper, 0);
        })
    })
    describe('Members', () => {
        it('i18n should correct', async () => {
            // let accountFatherUrl = new Url('/account/members', '');
            // const wrapper = accountFatherUrl.initMountWrapper(<ConnectedMembers i18n={i18n} store={store}/>);
            // // console.log(wrapper.debug());
            // await checkLanguage(wrapper.find('.module-header .header__title'), 'members.title')
            // wrapper.unmount();
        })
        it('store state and dom display should corresponding', () => {
            let accountFatherUrl = new Url('/account/members', '');
            const getMembers = sinon.stub();

            // 无需测试connect层， connect层只是负责将store数据分发到Container
            // 不涉及国际化， i18n.t用存根代替
            // getMembers不应该去触发store.dispatch,用存根代替
            const wrapper = accountFatherUrl.initShallowWrapper(<Members t={tMock} members={store.getState().members} getMembers={getMembers} profile={{data:{timezone: '+08:00'}}}/>);

            const stateMapDom = {
                //全部显示的情况
                dataDisplay: {
                    name: '.members-list.wallet-transactions',
                },
                error: {
                    name: '.container.list__message'
                },
                dataFetching: {
                    name: 'ABSpinner',
                    prop: 'hidden',
                    has: false
                },
                fetchingHint: {
                    name: 'FilterSectionFactory',
                    prop: 'isLoading'
                }
            }

            const actions = {
                request: {
                    method: MembersActions.membersRequest,
                    params: {/*请求参数*/}
                },
                success: {
                    method: MembersActions.membersSuccess,
                    params: {data: membersTest[1]}
                },
                failure: {
                    method: MembersActions.membersFailure,
                    params: 'test error'
                },
                reset: {
                    method: MembersActions.membersReset,
                    extra: () => expect(store.getState().members).to.deep.equal(INITIAL_STATE)
                }
            }

            const updateNode = () => wrapper.setProps({members: store.getState().members})

            checkStoreMapDom(wrapper, stateMapDom, actions, updateNode)

        })
    })
})

const checkChildrenOpen = (wrapper, number) => {
    wrapper.find('.members-father').at(number).simulate('click')  //点击展开第number个用户
    expect(wrapper.find('.members-father').at(number).hasClass('children-open')).to.equal(true);  //一级子用户是否打开
    expect(wrapper.find('.details__wrapper').at(number).hasClass('zp-show')).to.equal(true);

    expect(wrapper.find('.members-father').at(number+1).hasClass('children-open')).to.equal(false);  //二级子用户是否打开
    expect(wrapper.find('.details__wrapper').at(number+1).hasClass('zp-show')).to.equal(false);
}

const checkChildrenTuckUp = (wrapper, number) => {
    wrapper.find('.members-father').at(number).simulate('click') //点击收起第二个用户
    expect(wrapper.find('.members-father').at(number).hasClass('children-open')).to.equal(false); //一级子用户是否打开
    expect(wrapper.find('.details__wrapper').at(number).hasClass('zp-show')).to.equal(false); 
}

const calculateLength = (members) => {
    let sum = members.length;
    for(let item of members){
        sum += calculateLength(item.children)
    }
    return sum;
}

const membersTest = [
    [],
    [
        {
            username: 'zp',
            timestamps: {createdAt: '2018-03-04'},
            locked: 1,
            children: []
        },
        {
            username: 'sf',
            timestamps: {createdAt: '2018-03-04'},
            locked: 1,
            children: []
        }
    ],
    [
        {
            username: 'zp',
            timestamps: {createdAt: '2018-03-04'},
            locked: 1,
            children: [
                {
                    username: 'sff',
                    timestamps: {createdAt: '2018-03-04'},
                    locked: 1,
                    children: [
                        {
                            username: 'dd',
                            timestamps: {createdAt: '2018-03-04'},
                            locked: 1,
                            children: [
                                {
                                    username: 'cc',
                                    timestamps: {createdAt: '2018-03-04'},
                                    locked: 1,
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            username: 'sf',
            timestamps: {createdAt: '2018-03-04'},
            locked: 1,
            children: []
        }
    ]
]

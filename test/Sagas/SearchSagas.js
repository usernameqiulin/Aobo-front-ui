import {getSearch, filter, CACHE_TTL} from '../../src/Sagas/SearchSagas';
import SearchActions from '../../src/Redux/SearchRedux';
import {responseMock, tokenMock} from '../mock';
import {expectAction, responseShould, expectFilter, expectFilterFactoryCalled, filterFactoryCalledShould, filterFactorySuccess} from '../helper';

const filterVersionMock = {
    success: [
        {
            getState: () => ({
                search: {
                    data: Symbol('test-data'),
                    version: new Date().getTime() - CACHE_TTL - 10,
                }
            })
        },
        {
            getState: () => ({
                search: {
                    data: Symbol('test-data'),
                    version: new Date().getTime() - CACHE_TTL - 1000,
                }
            })
        },
    ],
    failure: [
        {
            getState: () => ({
                search: {
                    data: Symbol('test-data'),
                    version: new Date().getTime() - CACHE_TTL + 10,
                }
            })
        },
        {
            getState: () => ({
                search: {
                    data: Symbol('test-data'),
                    version: new Date().getTime() - CACHE_TTL + 1000,
                }
            })
        },
    ]
}

const searchRequestParamsMock = Symbol('test-params');

describe('SearchSagas', () => {
    describe('filter', () => {
        describe('version', () => {
            it('should not call api when version within {CACHE_TTL} time', () => {
                //success
                filterVersionMock.success.map(success => {
                    expectFilter.success(filter.version, [], success.getState, []);
                })
                //failure
                filterVersionMock.failure.map(failure => {
                    expectFilter.failure(filter.version, [], failure.getState, [SearchActions.searchCachedResult()])
                })
            })
        })
    })
    describe('getSearch', () => {
        it(filterFactoryCalledShould, () => {
            const searchApi = sinon.stub(api, 'search');
            expectFilterFactoryCalled(getSearch, [api, tokenMock, SearchActions.searchRequest(searchRequestParamsMock)], searchApi, filter);
        })
        it(responseShould, () => {
            const searchApi = sinon.stub(api, 'search');
            
            responseMock.setCallsReturn(searchApi);
            const dispatched = filterFactorySuccess(responseMock.runSaga, getSearch, api, tokenMock, SearchActions.searchRequest(searchRequestParamsMock));
            const expectDispatched = responseMock.createExpectActions(expectGetSearchAction);

            expect(searchApi.callCount).to.equal(responseMock.numbers());
            expect(searchApi.alwaysCalledWith(searchRequestParamsMock, tokenMock)).to.equal(true);
            expect(dispatched).to.deep.equal(expectDispatched);

            searchApi.restore();
        })
    })
})

const expectGetSearchAction = response => expectAction(
    response,
    () => SearchActions.searchSuccess(response.data.data),
    SearchActions.searchFailure,
    {
        catchNoResults: false
    }
)

afterEach(() => {
    sinon.restore();
})
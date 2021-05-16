import { setYearFilter } from 'actions/filterActions';
import { SET_YEAR_FILTER } from 'constants/constants';
import configureStore from 'redux-mock-store';

const expAction = {
    type: SET_YEAR_FILTER,
    payload: {
        year: '2020',
        target: 'tv'
    }
};

describe("Action creators", () => {
    it("Should create year filter action", () => {
        expect(setYearFilter('2020', 'tv')).toEqual(expAction);
    });
});

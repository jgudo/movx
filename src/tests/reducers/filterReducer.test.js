import { setYearFilter } from 'actions/filterActions';
import filtersReducer from 'reducers/filtersReducer';


describe("Filters reducer", () => {
    const state = {
        tv: {
            genre: '',
            sort: '',
            year: '',
            query: ''
        },
        discover: {
            genre: '',
            sort: '',
            year: '',
            query: ''
        }
    };

    it("Should set year filter state for TV", () => {
        expect(filtersReducer(state, setYearFilter('2020', 'tv'))).toEqual({ ...state, tv: { ...state.tv, year: '2020' } });
        expect(filtersReducer(state, setYearFilter('2020', 'tv')).tv.year).toBe('2020');
    });

});
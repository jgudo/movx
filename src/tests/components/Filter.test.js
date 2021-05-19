import React from 'react';
import Filter from '../../components/common/Filter/Filter';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const filterData = {
  year: '',
  sort: 'desc',
  genre: 'action',
  query: '',
};

const state = {
  _filter: {
    tv: {},
    discover: filterData,
  },
};

describe('Test the filter component', () => {
  const mockStore = configureStore();

  it('Should render without crashing', () => {
    const store = mockStore({ filter: filterData });
    const wrapper = shallow(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Should receive filterData props', () => {
    const store = mockStore({ filter: filterData });
    const wrapper = shallow(
      <Provider store={store}>
        <Filter filterData={filterData} />
      </Provider>,
    );
    expect(wrapper.find(Filter).prop('filterData')).toEqual(filterData);
  });

  it('Should trigger year filter change', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <Filter filterData={filterData} />
      </Provider>,
    );
    wrapper
      .find('#yearFilter')
      .simulate('change', { target: { value: '2020' } });

    // expect(wrapper.find(Filter).state.y).toBe('2020');
    console.log(store.getState());
    // expect(store.getState()._filter.tv.year).toBe('2020');
  });
});

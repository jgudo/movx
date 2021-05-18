import { setLoading } from '@app/redux/actions/miscActions';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// just a component for canceling/removing the progress loader
// when the user navigates to another route
const ProgressTrigger = (Component: React.ComponentType<any>) => (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      dispatch(setLoading(false));
    }
  }, [props.match.location]);

  return <Component {...props} />
};

export default ProgressTrigger;

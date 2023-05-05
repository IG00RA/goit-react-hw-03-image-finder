import { BallTriangle } from 'react-loader-spinner';
import { LoaderStyle } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderStyle>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="rgb(63, 81, 181)"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </LoaderStyle>
  );
};


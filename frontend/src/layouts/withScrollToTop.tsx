import { useEffect } from "react";

const withScrollToTop = (Component: any) => {
  return function ScrollToTopWrapper(props: any) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <Component {...props} />;
  };
};

export default withScrollToTop;
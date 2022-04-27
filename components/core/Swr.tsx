export type SwrWrapperProps = {
  swr: {
    data?: any;
    error?: any;
    isValidating: boolean;
  };
  render: () => any;
  renderError: () => any;
  renderLoading: () => any;
};

export const SwrWrapper = ({
  swr,
  render,
  renderLoading,
  renderError,
}: SwrWrapperProps) => {
  const { data, error, isValidating } = swr;

  return <>{data ? render() : error ? renderError() : renderLoading()}</>;
};

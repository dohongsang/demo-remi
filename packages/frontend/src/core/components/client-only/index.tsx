import React from "react";

interface IClientOnlyProps {
  fallback: any;
  component: any;
}

const ClientOnly: React.FC<IClientOnlyProps> = ({ fallback, component }) => {
  const [Component, setComponent] = React.useState(() => fallback);

  React.useEffect(() => {
    setComponent(() => React.lazy(component));
  }, []);

  return (
    <React.Suspense fallback={fallback}>
      <Component />
    </React.Suspense>
  );
};
export default ClientOnly;

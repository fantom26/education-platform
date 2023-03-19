import { FC } from "react";

import { useMetaData, useMetaDataProps } from "hooks";

interface MetaType extends useMetaDataProps {
  component: JSX.Element;
}

export const Meta: FC<MetaType> = (props) => {
  const { component, title, description } = props;

  useMetaData({ title, description });

  return <>{component}</>;
};

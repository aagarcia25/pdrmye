import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function CustomizedContentTooltips({ children }: Props) {
  return (
      <>
           {children}
      </>


  );
}
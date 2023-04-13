import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CustomizedContentTooltips from './CustomizedContentTooltips';

interface Props {
  children?: React.ReactNode;
  children2?: React.ReactNode;
  // contenido?: React.ReactElement;
  title: string;
  descripcion: string;

}
export const TooltipPersonalizado = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default function CustomizedTooltips({ descripcion, children, title, children2 }: Props) {
  return (

    <TooltipPersonalizado
      title={
        <>
          <React.Fragment>
            <Typography color="inherit">Tooltip with HTML</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        </>
      }
    >
      <>
        {children}
      </>
    </TooltipPersonalizado>

  );
}
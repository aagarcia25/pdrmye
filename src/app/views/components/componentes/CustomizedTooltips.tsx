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
    maxWidth: 1000,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    
    
  },
}));


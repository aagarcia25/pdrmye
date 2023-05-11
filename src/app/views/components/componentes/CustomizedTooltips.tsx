import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { COLOR } from '../../../styles/colors';


export const TooltipPersonalizado = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip className='TooltipPersonalizado' {...props} classes={{ popper: className}}  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // color: "green",
    // backgroundColor: "green",
    backgroundColor: '#ffffff',
    color:COLOR.negro,
    maxWidth: 1000,
    with:400,
    fontSize: theme.typography.pxToRem(15),
  },
}));


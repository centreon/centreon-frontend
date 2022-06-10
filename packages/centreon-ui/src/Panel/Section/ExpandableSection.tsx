import {
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  styled,
  ListItem,
  AccordionProps,
  AccordionSummaryProps,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import useMemoComponent from '../../utils/useMemoComponent';

const useStyles = makeStyles((theme) => ({
  details: {
    padding: theme.spacing(0, 2),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  fontWeight: 700,
}));

const Section = styled((props: AccordionProps) => (
  <Accordion disableGutters square elevation={0} {...props} />
))(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  border: `1px solid ${theme.palette.divider}`,
}));

const CustomizedAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1),
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(-90deg)',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0deg)',
  },
  flexDirection: 'row-reverse',
}));

interface Props {
  children: JSX.Element;
  title: string;
}

const ExpandableSection = ({ title, children }: Props): JSX.Element => {
  const classes = useStyles();

  return useMemoComponent({
    Component: (
      <Section>
        <CustomizedAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Title>{title}</Title>
        </CustomizedAccordionSummary>
        <AccordionDetails className={classes.details}>
          <ListItem>{children}</ListItem>
        </AccordionDetails>
      </Section>
    ),
    memoProps: [title],
  });
};

export default ExpandableSection;

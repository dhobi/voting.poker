import {Typography} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {Box, Theme} from '@mui/system';
import stringToColor from '@root/helpers/stringToColor';
import {groupBy} from 'lodash';
import {PieChart} from 'react-minimal-pie-chart';

const useStyle = makeStyles((theme: Theme) => ({
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(8, 0, 6),
    gap: theme.spacing(4),
  },
  resultContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  resultsChart: {
    height: theme.spacing(40),
  },
  resultValue: {
    position: 'absolute',
    top: theme.spacing(12),
  },
  resultTitle: {
    color: theme.palette.text.primary,
    minWidth: theme.spacing(6),
    textAlign: 'center',
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.shape.borderRadius,
  },
}));

interface ResultsProps {
  votes: Record<string, string>;
}

const Results = ({votes}: ResultsProps) => {
  const classes = useStyle();

  const sessionVotesResult = Object.entries(votes);

  const results = Object.entries(groupBy(sessionVotesResult, ([, vote]) => vote)).map(
    ([value, votesWithIds]) => ({
      title: value,
      value: votesWithIds.length,
      percentage: (votesWithIds.length / sessionVotesResult.length) * 100,
      color: stringToColor(votesWithIds[0][0]),
    })
  );

  return (
    <Box className={classes.content}>
      <Box className={classes.hero}>
        <Typography variant="h4">Nicely done!</Typography>
      </Box>
      <Box className={classes.resultContainer}>
        <PieChart
          startAngle={180}
          lengthAngle={180}
          lineWidth={15}
          rounded
          className={classes.resultsChart}
          data={results}
        />
        <Typography className={classes.resultValue} variant="h2">
          {sessionVotesResult.length} 🗳
        </Typography>
      </Box>
      {results.map(({title, percentage, color}) => (
        <Box
          key={title}
          gap={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={color}>
          <Typography sx={{backgroundColor: color}} variant="h6" className={classes.resultTitle}>
            {title}
          </Typography>
          <Typography variant="h6">{percentage.toFixed(2)}%</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Results;

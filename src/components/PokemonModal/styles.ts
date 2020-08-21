import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            width: '100%',
            '& h2': {
                fontSize: '1.2em'
            }
        },
        data: {
            margin: 10,
            width: '100%',
            display: 'flex',
            '& ul': {
                width: '50%'
            }
        },
        typesList: {
            width: '50%'
        },
        size: {
            margin: '10px 0',
            '& li': {
                margin: '5px 0'
            }
        },
        types: {
            textAlign: 'right'
        }
    }),
);

import { makeStyles } from '@material-ui/core/styles';

export const useClasses = makeStyles({
    list: {
        textAlign: 'right',
        '& li': {
            margin: '2px 0'
        }
    }
});
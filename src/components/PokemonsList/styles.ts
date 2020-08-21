import { makeStyles } from '@material-ui/core/styles';

export const useClasses = makeStyles({
    wrapper: {
        margin: '20px 10%'
    },
    filterBlock: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)'
    },
    pagination: {
        margin: 10,
        float: 'right'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


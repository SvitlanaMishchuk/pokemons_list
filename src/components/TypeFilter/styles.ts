import { makeStyles } from '@material-ui/core/styles';

export const useClasses = makeStyles({
    wrapper: {
        margin: '10px 20px'
    },
    label: {
        margin: '0 10px'
    },
    clear: {
        display: 'inline-block',
        fontSize: 12,
        margin: '0 5px',
        padding: '2px 8px',
        border: '1px solid black',
        borderRadius: '30%',
        cursor: 'pointer'
    },
    selectList: {
        '& .MuiSelect-select': {
            minWidth: 50
        }
    }
});
import { makeStyles } from '@material-ui/core';

export const useClasses = makeStyles({
    wrapper: {
        margin: '10px 20px',
        textAlign: 'right'
    },
    label: {
        display: 'inline-block',
        marginRight: 30
    },
    selectList: {
        '& .MuiSelect-select': {
            minWidth: 30
        }
    }
});
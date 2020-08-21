import { makeStyles } from '@material-ui/core/styles';

export const useClasses = makeStyles({
    wrapper: {
        margin: '18px 20px'
    },
    label: {
        padding: 6,
        color: '#474747',
        '&.MuiInputLabel-root': {
            display: 'inline-block'
        }
    },
    input: {
      '& .MuiOutlinedInput-input': {
          padding: 5
      }
    },
    clear: {
        display: 'inline-block',
        fontSize: 12,
        margin: '0 5px',
        padding: '2px 8px',
        border: '1px solid black',
        borderRadius: '30%',
        cursor: 'pointer'
    }
});
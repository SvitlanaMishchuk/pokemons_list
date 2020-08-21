import { makeStyles } from '@material-ui/core/styles';

export const useClasses = makeStyles({
    pokemon: {
        display: 'inline-block',
        margin: '0.5em',
    },
    image: {
        backgroundSize: 'contain',
        height: '10em'
    },
    data: {
        fontSize: '1em',
        margin: '10px 0',
        '& ul': {
            display: 'inline-block',
            width: '50%'
        }
    },
});
import { makeStyles } from '@material-ui/core/styles';
import { Stat } from '../../types';

export const useClasses = makeStyles({
    stat: {
        margin: '5px 10px'
    },
    statName: {
        display: 'inline-block',
        width: '40%'
    },
    statValue: (props: Stat) => ({
        width: (60 * props.baseStat / 100 > 60 ? 60 : 60 * props.baseStat / 100) + '%',
        display: 'inline-block',
        backgroundColor: '#99bbff',
        borderRadius: 3,
        padding: '3px 0',
        textAlign: 'center',
        fontSize: '0.8em'
    })
});
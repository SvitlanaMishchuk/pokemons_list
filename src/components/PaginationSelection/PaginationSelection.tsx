import React from 'react';
import { observer } from 'mobx-react-lite';
import { MenuItem, Select } from '@material-ui/core';

import { useClasses } from './styles';

interface PaginationSelectionProps {
    entitiesPerPage: number[],
    onEntriesPerPageChange: (_: any, test: number) => void,
    selectedEntitiesPerPage: number
}

export const PaginationSelection = observer((props: PaginationSelectionProps) => {
    const { entitiesPerPage, selectedEntitiesPerPage, onEntriesPerPageChange } = props;
    const classes = useClasses();

    return (
        <div className={classes.wrapper}>
            <span className={classes.label}>Show card per page:</span>
            <Select
                className={classes.selectList}
                defaultValue={selectedEntitiesPerPage}
                onChange={onEntriesPerPageChange}
            >
                {
                    entitiesPerPage.map((v: number) => {
                        return <MenuItem value={v} key={v}>{v}</MenuItem>
                    })
                }
            </Select>
        </div>
    )
});
import React, { useState } from 'react'
import TableSelect from '../profile/user-data/TableSelect'

function Topbar({ tables, selTable, changeTable }) {
    return (
        <div>
            <TableSelect
            tables={tables}
            table={selTable}
            changeTable={changeTable} />
        </div>
    )
}

export default Topbar

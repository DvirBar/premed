import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupFields } from '../../../redux/reducers';

function CalcBlock({ calc, values }) {
    const storedCalcs = useSelector(state => state.calcs.storedCalcs)
    const groupFields = useSelector(state => 
        getGroupFields(state.datafields.fields))
    const [storedCalc, setStoredCalc] = useState({})
    const [groupArgs, setGroupsArgs] = useState([])
    const [argsMissing, setArgsMissing] = useState([])

    useEffect(() => {
        setStoredCalc(storedCalcs?.find(storCalc => 
            storCalc.id === calc.calc))
    }, [storedCalcs, calc])

    useEffect(() => {
        setGroupsArgs(storedCalc?.args?.filter(arg => 
            arg.type === "group"))
    }, [storedCalc])

    useEffect(() => {
        let missing = storedCalc?.args?.filter(arg => {
            if(arg.type === "group" && groupArgs) {
                let roleGroupFields = groupFields.filter(field => 
                    field.group.role === arg.role);
        
                for(let field of roleGroupFields) {
                    if(!values.find(val => 
                        val.field._id === field._id)) {
                        return arg
                    }}}

            else if(!values.find(val => val.field.role === arg.role)) {
                return arg;
            }
        })

        setArgsMissing(missing?.map(arg => arg.name))
    }, [values, storedCalc, groupArgs])

    return (
        <Fragment>
            {argsMissing?.length === 0 
            ?  <div className="calc-block">Show calc</div>
            :  <div className="calc-block missing"> 
                 Missing
               </div>
            }
        </Fragment>
    )
}

export default CalcBlock

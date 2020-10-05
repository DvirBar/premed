import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeCalc } from '../../../redux/actions/userdata';
import { getGroupFields } from '../../../redux/reducers';
import ArgsMissingList from './ArgsMissingList';

function CalcBlock({ field, dataVals }) {
    const dispatch = useDispatch();

    const [values, setValues] = useState([])
    const storedCalcs = useSelector(state => state.calcs.storedCalcs)
    const groupFields = useSelector(state => 
        getGroupFields(state.datafields.fields))
    const [storedCalc, setStoredCalc] = useState({})
    const [groupArgs, setGroupsArgs] = useState([])
    const [argsMissing, setArgsMissing] = useState([])
    const [calc, setCalc] = useState({})
    const [value, setValue] = useState({})
    const [calcExecuted, setCalcExecuted] = useState(false)

    useEffect(() => {
        setCalc(field.calcOutput)
    }, [field])

    useEffect(() => {
        setValues(dataVals)
    }, [dataVals])

    useEffect(() => {
        setValue(values?.find(val => val.field._id === field._id))
    }, [values, field])

    useEffect(() => {
        setStoredCalc(storedCalcs?.find(storCalc => 
            storCalc.id === calc.calc))
    }, [storedCalcs, calc])

    // Get argument that are a part of a group
    useEffect(() => {
        setGroupsArgs(storedCalc?.args?.filter(arg => 
            arg.type === "group"))
    }, [storedCalc])

    // Find missing arguments
    useEffect(() => {
        let missing = storedCalc?.args?.filter(arg => {
            if(arg.type === "group" && groupArgs) {
                let roleGroupFields = groupFields.filter(field => 
                    field.group.role === arg.role);
        
                for(let field of roleGroupFields) {
                    if(!values?.find(val => 
                        val.field._id === field._id)) {
                        return arg
                    }}}

            else if(!values?.find(val => val.field.role === arg.role)) {
                return arg;
            }
        })

        setArgsMissing(missing?.map(arg => arg.name))
    }, [values, storedCalc, groupArgs])

    useEffect(() => {
        if(argsMissing?.length === 0 && storedCalc.id && !calcExecuted) {
            dispatch(executeCalc(storedCalc.id))
            setCalcExecuted(true)
        }
    }, [argsMissing, storedCalc, dataVals, calcExecuted])

    useEffect(() => {
        console.log(argsMissing);
    }, [argsMissing])


    return (
        <Fragment>
            {field.calcOutput && field.calcOutput.isSuggestion &&
                <fieldset className={argsMissing?.length === 0 
                ? "calc-block"
                : "calc-block missing"}>
                    <legend>הצעה</legend>
                    {argsMissing?.length === 0 
                    ?  <div>
                            {value.suggestValue}
                        </div>
                    :  <div> 
                        חסרים נתונים
                    </div>
                    }
                </fieldset>
            }
            {argsMissing && argsMissing.length !== 0 && 
                <ArgsMissingList argsMissing={argsMissing} />
            }
        </Fragment>
    )
}

export default CalcBlock

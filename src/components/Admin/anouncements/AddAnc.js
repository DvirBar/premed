import React from 'react'

function AddAnc() {
    // const [display, setDisplay] = useState(false);

    // const {
    //     handleChange,
    //     handleSubmit,
    //     values,
    //     errors
    // } = useForm(addGroup)

    // const [disabled, setDisabled] = useState(true);

    // useEffect(() => {
    //     if(values.name)
    //         setDisabled(false);
        
    //     console.log(values);
    // }, [values])

    // const [options, setOptions] = useState(
    //     props.paths.map(path => ({
    //         name: path.name,
    //         value: path._id
    //     })))

    // const [selected, setSelected] = useState(options[0])

    return (
        <button className="info">פרסם</button>
            // <Modal display={display} setDisplay={setDisplay}>
            //     <form onSubmit={handleSubmit} noValidate>
            //         <input 
            //         type="text"
            //         name="name" 
            //         placeholder="שם הקבוצה..."
            //         value={values.name || ''}
            //         onChange={handleChange}
            //         /><br />
            //         <p className="form-error">
            //             {errors.name && errors.name}
            //         </p><br />
                    
            //         <Dropdown 
            //         selected={selected}
            //         setSelected={setSelected}
            //         options={options}
            //         name={"pathId"}
            //         onChange={handleChange}
            //         />

            //         <button
            //         type="submit"
            //         disabled={disabled}>צור</button>
            //     </form>
            // </Modal>
    )
}

export default AddAnc

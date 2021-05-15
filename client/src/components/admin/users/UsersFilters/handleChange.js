const useHandleChange = () => {
    const [filters, setFilters] = useState({})
    const handleChange = event => {
        let valueObj = event
        if(event.target) {
            valueObj = event.target
        }
    
        if(typeof event.persist !== "undefined")
            event.persist();
        
        const name = valueObj.name
        const value = valueObj.value
    
        setFilters(filters => ({
            ...filters,
            [name]: value 
        })) 
    
    }

}


export default handleChange
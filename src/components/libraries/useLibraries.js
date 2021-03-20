import React, { useState } from 'react'
import { useRouteMatch } from 'react-router'

function useLibraries() {
    const { url } = useRouteMatch()
    const notFoundUrl = `${url}/notFound`
    
    return {
        notFoundUrl
    }
}

export default useLibraries

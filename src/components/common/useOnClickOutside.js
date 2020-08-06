import { useEffect } from 'react';

function useOnClickOutside(ref, callback) {
    useEffect(() => {
        const listener = event => {
            // Do nothing if clicking ref's element or descendent elements
            if(!ref.current || ref.current.contains(event.target))
                return;

            callback(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener)
        
        return () => { // cleanup
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, callback])

}


export default useOnClickOutside;

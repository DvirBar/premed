import { useEffect } from 'react'

function useFocus(className) {
     const classNameToAdd = 'focused'
     const focusListener = function() {
          this.classList.add(classNameToAdd)
     }

     const blurListener = function() {
          this.classList.remove(classNameToAdd)
     }

     useEffect(() => {
          if(className) {
               const elem = document.getElementById(className)

               elem.addEventListener('focus', focusListener)
               elem.addEventListener('blur', blurListener)

               // Cleanup 
               return () => {
                    elem.removeEventListener('focus', focusListener)
                    elem.removeEventListener('blur', blurListener)
               }
          }
     }, [className])     
}

export default useFocus

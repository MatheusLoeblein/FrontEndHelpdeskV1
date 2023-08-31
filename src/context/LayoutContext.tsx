import { createContext, useState, useEffect } from 'react'
import { parseCookies, setCookie } from 'nookies'



export const LayoutContext = createContext({});

export function LayoutProvider ({ children }) {
    
    const [menuOver, setMenuOver] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        const {'helpdeskLayout.MenuOver': over} = parseCookies()
        if(over){
            setMenuOver(over === 'true');
        }


    }, [])
    
    function handleMenuOver(value){
        setMenuOver(value);
        setCookie(undefined, 'helpdeskLayout.MenuOver', value.toString())
    }

    return(
        <LayoutContext.Provider value={{menuOver, handleMenuOver, pageLoading, setPageLoading}}>
            { children }
        </LayoutContext.Provider>
    )
}
import { createContext, useState } from 'react'


export const LayoutContext = createContext({});


export function LayoutProvider ({ children }) {
    
    const [menuOver, setMenuOver] = useState(false);


    return(
        <LayoutContext.Provider value={{menuOver, setMenuOver}}>
            { children }
        
        </LayoutContext.Provider>
    )
}
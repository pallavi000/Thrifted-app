import React, { useState } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext()

console.log('context')


// export default function Context() {

//     const [isLogedIn, setIsLogedIn] = useState(false)


//     return (
//        <AuthContext.Provider value={isLogedIn}>
//        </AuthContext.Provider>
//     )
// }


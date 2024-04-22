
// import outlet 
import React from 'react';
import { Outlet } from 'react-router-dom';


export default function Root() {

    return (
        <div>
            <main>
                {/* outlet */}
                <Outlet />

            </main>
        </div>
    )
}
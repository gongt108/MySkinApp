import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { logoutUser } from "../features/userSlice";
import { useDispatch } from 'react-redux';


const Logout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(logoutUser());
        router.push('/')
    }, [])


    return (
        <div>You have been logged out.</div>
    )
}

export default Logout
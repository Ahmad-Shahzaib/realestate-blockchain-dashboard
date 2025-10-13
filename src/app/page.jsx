"use client"
import Home from './home2/page';
import Dashboard from '../components/Dashboard';
import {useSelector,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { fetchLeads } from "@/redux/leadsSlice";

export default function HomePage() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo);
    useEffect(() => {
        if (userInfo?.user?._id) {
            dispatch(fetchLeads({ customerId: userInfo.user._id, page: 1 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userInfo?.user?._id]);
    return (
        <main>
            {/* {userInfo?.role == "customer" && (
                <> */}
                 <Dashboard />
                {/* </>
            )}
      */}
        </main>
    );
}
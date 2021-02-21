import { useEffect, useContext, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";

import { AppContext } from "./Context";

const AppActions = () => {
    const { context, setContext } = useContext(AppContext);
    const [appLaunch, setAppLaunch] = useState(true);

    /** On launch we load user's list from Async Storage */
    useEffect(() => {
        if (appLaunch) {
            console.log('Load from local');
            setAppLaunch(false);
        }
    }, [appLaunch])

    /** We load data from the API */
    useEffect(() => {
        if (context.fetch) {
            axios
                .get(`https://data.messari.io/api/v2/assets?fields=id,name,slug,symbol,metrics%2Fmarket_data&with-metrics`)
                .then((response) => {
                    setContext((prevState: any) => {
                        prevState.currencies = response.data.data;
                        prevState.fetch = false;
                        prevState.timestamp = new Date()
                        return { ...prevState };
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [context]);

    /** Every 30 seconds, we verify if there hasn't been 2 minutes since last refresh, if so we trigger a reload */
    useEffect(() => {
        const intervalId = setInterval(() => {
            let currentDate = new Date();
            let timestamp = new Date(context.timestamp);
            let diffInSeconds = (currentDate.getTime() - timestamp.getTime()) / 1000;
            if (!context.fetch && diffInSeconds > 120){
                setContext((prevState: any) => {
                    prevState.fetch = true;
                    return { ...prevState };
                });
            }
        }, 30000)

        return () => {
            clearInterval(intervalId);
        }

     }, [context])


    /** Every time user updates his/her list we save locally */
    const userCrypto = useSelector((state: any) => state.listReducer);
    useEffect(() => {
        console.log("saveLocally")
    }, [userCrypto])

    return null;
};

export default AppActions;




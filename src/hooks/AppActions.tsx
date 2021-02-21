import { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { AppContext, FetchContext } from "./Context";

const AppActions = () => {
    const { setContext } = useContext(AppContext);
    const { fetch, setFetch } = useContext(FetchContext);
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
        if (fetch) {
            axios
                .get(`https://data.messari.io/api/v2/assets?fields=id,name,slug,symbol,metrics%2Fmarket_data&with-metrics`)
                .then((response) => {
                    console.log(response.data.data);
                    setContext(response.data.data)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setFetch(false)
                });
        }
    }, [fetch]);


    /** Every time user updates his/her list we save locally */
    const userCrypto = useSelector((state: any) => state.listReducer);
    useEffect(() => {
        console.log("saveLocally")
    }, [userCrypto])


    return null;
};

export default AppActions;
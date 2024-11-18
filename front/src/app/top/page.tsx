"use client";

import { useEffect, useState } from "react";
import axios from "axios";



function Top() {
    const [apiResponse, setApiResponse] = useState();

    const helloLaravelApi = async() => {
        try {
        const response = await axios.get(
            `http://127.0.0.1:8002/api/api/`
        );
        console.log(response);
        setApiResponse(response.data.message);
    } catch (e) {
        console.log(e);
    }
    
    }

    useEffect(() => {
        helloLaravelApi();
    },[]);

    return (
        <div>
            {apiResponse}
        </div>
    );
}

export default Top;

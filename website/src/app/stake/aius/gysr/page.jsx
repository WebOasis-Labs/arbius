
import React, { useState,useEffect } from "react"

import Middleware from "./middleware";
import { getTransactions } from "../../../Utils/getActivities";
export default function GYSR() {
    const data=getTransactions()
    
    return (
      <Middleware/>
        
    )
}
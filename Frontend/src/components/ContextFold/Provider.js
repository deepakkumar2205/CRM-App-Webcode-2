import { useState } from "react";
import Context from "./Context";


export default function Provider(props){
    const [theme, setTheme] = useState("light");
    const [badge,setBadge] = useState();
    return (
      <Context.Provider value={{ theme, setTheme , badge , setBadge }}>
        {props.children}
      </Context.Provider>
    );
} 
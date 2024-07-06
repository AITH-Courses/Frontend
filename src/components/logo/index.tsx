import "./index.css";
import React from "react";

interface LogoProps{
    contrast: boolean,
}

const Logo: React.FC<LogoProps> = (props) => {
    const {contrast=false} = props;

    return(
        <div className={contrast? "logo contrast": "logo"}>
            <p className="logo__aith">Aith</p>
            <p className="logo__courses">Courses</p>
        </div>
    )
}
export default Logo;
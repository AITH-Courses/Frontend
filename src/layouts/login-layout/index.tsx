import "./index.css";
import React from "react";

export interface LayoutProps  {
    children: React.ReactNode
}

export default function LoginLayout(props: LayoutProps){
    return (
        <>
            <div className={"login-layout"}>
                <div className={"login-layout__form-side"}>
                    {props.children}
                </div>
                <div className={"login-layout__logo-side"}>
                    <div className={"logo-side__container"}>
                        <p className={"logo-side__full-name"}>
                            <label className={"logo-side__aith"}>
                                Aith
                            </label>
                            <label className={"logo-side__courses"}>
                                Courses
                            </label>
                        </p>
                        <p className={"logo-side__description"}>
                            Курсы от AI Talent Hub и ведущих <br/>
                            экспертов индустрии и науки
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}

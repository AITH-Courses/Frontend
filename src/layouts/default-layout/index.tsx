import "./index.css";
import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";


const DEFAULT_LINKS = [
    {
        name: "Главная",
        url: "/"
    },
    {
        name: "Курсы",
        url: "/courses"
    },
]
export interface LayoutProps  {
    children: React.ReactNode
}

export default function DefaultLayout(props: LayoutProps){
    return (
        <div className="default-layout">
            <div className="default-layout__header">
                <Header links={DEFAULT_LINKS}/>
            </div>
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>

    )
}

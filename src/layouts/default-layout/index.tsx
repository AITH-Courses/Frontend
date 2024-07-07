import "./index.css";
import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

export interface LayoutProps  {
    children: React.ReactNode
}

export default function DefaultLayout(props: LayoutProps){
    return (
        <div className="default-layout">
            <div className="default-layout__header">
                <Header/>
            </div>
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>

    )
}

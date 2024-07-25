import "./index.css";
import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";


const DEFAULT_LINKS = [
    {
        name: "Курсы",
        url: "/admin/courses"
    },
]
export interface LayoutProps  {
    children: React.ReactNode
}

export default function AdminLayout(props: LayoutProps){
    return (
        <div className="admin-layout">
            <div className="admin-layout__header">
                <Header mainLinks={DEFAULT_LINKS} userLinks={DEFAULT_LINKS}/>
            </div>
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>

    )
}

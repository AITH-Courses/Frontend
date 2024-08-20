import "./index.css";
import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";


const MAIN_LINKS = [
    {
        name: "Главная",
        url: "/"
    },
    {
        name: "Курсы",
        url: "/courses"
    },
]
const USER_LINKS = [
    {
        name: "Мой профиль",
        url: "/profile"
    },
]

export interface LayoutProps  {
    children: React.ReactNode
}

export default function HomeLayout(props: LayoutProps){
    return (
        <div className="home-layout">
            <div className="home-layout__header">
                <Header mainLinks={MAIN_LINKS} userLinks={USER_LINKS}/>
            </div>
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>
    )
}

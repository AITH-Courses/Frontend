import "./index.css";
import React from "react";
import Header from "../../components/header";
import {Space} from "@mantine/core";


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

export default function DefaultLayout(props: LayoutProps){
    return (
        <div className="default-layout">
            <div className="default-layout__header">
                <Header mainLinks={MAIN_LINKS} userLinks={USER_LINKS}/>
            </div>
            <main>
                {props.children}
            </main>
            <Space h={24}/>
        </div>
    )
}

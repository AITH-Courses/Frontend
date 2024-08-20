import React from "react";
import FAQSection from "./faq.tsx";
import QuestionSection from "./question.tsx";
import {Space} from "@mantine/core";
import FeaturesSection from "./features.tsx";
import WelcomeSection from "./welcome.tsx";
import HomeLayout from "../../layouts/home-layout";

const HomePage = () => {
    return <HomeLayout>
        <WelcomeSection/>
        <Space h={150}/>
        <FeaturesSection/>
        <Space h={150}/>
        <FAQSection/>
        <Space h={150}/>
        <QuestionSection/>
        <Space h={50}/>
    </HomeLayout>
}
export default HomePage;
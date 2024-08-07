import "./index.css";
import {SimpleGrid} from "@mantine/core";
import Logo from "../logo";
import {ROLES} from "../../constants";
import {NavLink} from "react-router-dom";
const Footer = () => {
    return (
        <div className={"footer"}>
            <SimpleGrid cols={{ xs: 1, md: 3, lg: 5 }} spacing="xl">
                <div>
                    <Logo contrast={true}/>
                    <p className={"footer__text"}>
                        Курсы от AI Talent Hub и ведущих экспертов индустрии и науки
                    </p>
                </div>
                <div>
                    <h3 className={"footer__subtitle"}>
                        Курсы по направлениям
                    </h3>
                    {
                        ROLES.map(role => (
                            <p>
                                <NavLink key={role} className={"footer__link"} to={`/courses?role=${role}`} end>
                                    {role}
                                </NavLink>
                            </p>
                        ))
                    }
                </div>
            </SimpleGrid>
        </div>
    )
}
export default Footer;
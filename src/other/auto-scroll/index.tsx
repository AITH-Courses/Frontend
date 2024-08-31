import {useLocation, useSearchParams} from "react-router-dom";
import React, {useEffect, useRef} from "react";
import {ScrollArea} from "@mantine/core";

export interface AutoScrollProps  {
    children: React.ReactNode
}

const AutoScrollArea: React.FC<AutoScrollProps> = (props) => {
    const viewport = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        viewport.current!.scrollTo({ top: 0, behavior: 'smooth' })
    }, [location, searchParams]);

    return (
        <ScrollArea type="scroll" scrollbarSize={8} scrollHideDelay={0} viewportRef={viewport}>
            {props.children}
        </ScrollArea>
    )
}

export default AutoScrollArea;
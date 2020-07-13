import React, {useRef, useState, useEffect, useMemo} from 'react';
import Globe from 'react-globe.gl'
import styles from './index.module.css';
import useResizeObserver from "use-resize-observer";
import * as d3 from "d3";
//import rdata from './world.topo.json'
import * as topojson from "topojson-client";
 import rdata from './countries.geo.json'

//const features = topojson.feature(rdata, 'world_countries');

const features = rdata.features;

function Component() {
    const [size, setSize] = useState([100, 100])
    const { ref } = useResizeObserver({
        onResize: ({ width, height }) => {
            console.log(width, height)
            // @ts-ignore
            setSize([width, height])
        },
    });
    const globeRef = useRef()
    const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

    // GDP per capita (avoiding countries with small pop)
    const getVal = (feat: any) => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
    const maxVal = useMemo(
        () => Math.max(...features.map(getVal)),
        []
    );
    colorScale.domain([0, maxVal]);

    useEffect(()=> {
        if (globeRef.current != undefined) {

            // @ts-ignore
            // let a = globeRef.current.camera()
            // a.position.set( 0, 20, 100 );

            // @ts-ignore
            let b = globeRef.current.controls()
            // b.update();
            b.autoRotate = true;
        }
    }, [globeRef])

    // @ts-ignore

    return (
// @ts-ignore
        <div className={[styles.component].join(' ')} ref={ref}>
            <Globe
                globeImageUrl="images/earth-blue-marble.jpg"
                width={size[0]}
                height={size[1]}
                backgroundColor={'#ffffff'}
                animateIn={true}
                ref={globeRef}

                polygonsData={features}
                polygonAltitude={0.04}
                polygonCapColor={d => colorScale(getVal(d))}
                polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
                polygonStrokeColor={() => '#111'}
                // @ts-ignore
                polygonLabel={({ properties: d }) => `
                    <b style="polygonLabel">${d.ADMIN} (${d.ISO_A2}):</b> <br />
                    GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
                    Population: <i>${d.POP_EST}</i>
                `}
            />
        </div>
    );
}

export default Component;

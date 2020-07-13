import React, {useState, useEffect} from 'react';
import styles from './index.module.css';
import { Slider, Switch } from 'antd';
import 'antd/dist/antd.css'
import { ResponsiveChoroplethCanvas } from '@nivo/geo'
import * as topojson from "topojson-client";
//import features from './world_countries.json'
import rdata from './world.topo.json'

interface Props {
    data: any[]
    [index:string]: any
}

const features = topojson.feature(rdata, 'world_countries');

function Component(props: Props) {
    let {mapkey, data, projectionScale, projectionTranslationX, projectionTranslationY, onMapChange, ...ownProps} = props
    const  [_projectionScale, setProjectionScale] = useState(projectionScale)
    const  [_projectionTranslationX, setProjectionTranslationX] = useState(projectionTranslationX)
    const  [_projectionTranslationY, setProjectionTranslationY] = useState(projectionTranslationY)

    useEffect(() => {
        if (onMapChange) {
            onMapChange({
                projectionScale: _projectionScale,
                projectionTranslationX: _projectionTranslationX,
                projectionTranslationY: _projectionTranslationY,
                key: mapkey
            })
        }
    }, [_projectionScale, _projectionTranslationX, _projectionTranslationY])

    return (
        <div className={[styles.component].join(' ')}>
            <div className={[styles.vertControl].join(' ')}>
                <Slider
                    reverse={true} vertical
                    style={{marginLeft: '0px'}}
                    value={_projectionTranslationY}
                    onChange={setProjectionTranslationY } min={-5} max={5} step={0.1}/>
            </div>
            <div className={[styles.container].join(' ')}>
                <ResponsiveChoroplethCanvas
                    data={data}
                    {...ownProps}
                    projectionScale={_projectionScale}
                    projectionTranslation={[_projectionTranslationX+0.5, _projectionTranslationY+0.5]}
                    features={features.features}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    colors="nivo"
                    domain={[ 0, 1000000 ]}
                    unknownColor="#666666"
                    label="properties.name"
                    valueFormat=".2s"
                    projectionRotation={[ 0, 0, 0 ]}
                    enableGraticule={true}
                    graticuleLineColor="#dddddd"
                    borderWidth={0.5}
                    borderColor="#152538"
                    // @ts-ignore
                    legends={[
                        {
                            anchor: 'bottom-left',
                            direction: 'column',
                            justify: true,
                            translateX: 20,
                            translateY: -100,
                            itemsSpacing: 0,
                            itemWidth: 94,
                            itemHeight: 18,
                            itemDirection: 'left-to-right',
                            itemTextColor: '#444444',
                            itemOpacity: 0.85,
                            symbolSize: 18,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000000',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
            <div className={[styles.vertControl].join(' ')} style={{position: 'absolute', top: '0px', right: '0px'}}>
                <Slider
                    vertical value={_projectionScale}
                    style={{marginLeft: '14px'}}
                    onChange={setProjectionScale }
                    min={0} max={2000}  step={0.01}/>
            </div>
            <div className={[styles.horControl].join(' ')}>
                <Slider
                    value={_projectionTranslationX}
                    style={{marginTop: '20px'}}
                    onChange={setProjectionTranslationX } min={-5} max={5} step={0.1}/>
            </div>
        </div>

    );
}

export default Component;

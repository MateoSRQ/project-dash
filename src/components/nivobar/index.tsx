import React from 'react';
import styles from './index.module.css';

import { ResponsiveBarCanvas } from '@nivo/bar'

interface Props {
    data: any[]
}


function Component(props: Props) {


    return (
        <div className={[styles.component].join(' ')}>
            <ResponsiveBarCanvas
                data={props.data}
                keys={[
                    'nombre',
                    'planificado',
                    'real'
                ]}
                indexBy="nombre"
                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                pixelRatio={1}
                padding={0.5}
                innerPadding={0}
                minValue={0}
                maxValue={100}
                groupMode="grouped"
                layout="vertical"
                reverse={false}
                colors={{ scheme: 'accent' }}
                borderWidth={0}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 36 }}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Hospitales',
                    legendPosition: 'middle',
                    legendOffset: 36
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '%',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                enableGridX={true}
                enableGridY={false}
                enableLabel={true}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                isInteractive={true}
            />
        </div>
    );
}

export default Component;

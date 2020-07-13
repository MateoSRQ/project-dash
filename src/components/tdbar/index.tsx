import React, {useRef, useEffect} from 'react';


import Graph3D from 'react-graph3d-vis'
import styles from './index.module.css';

console.log(styles)

function Component() {
    let custom = function (x: any, y: any) {
        return (Math.sin(x/50) * Math.cos(y/50) * 50 + 50)
    }

    let generateData = function() {
        let data = []
        var steps = 50;  // number of datapoints will be steps*steps
        var axisMax = 314;
        var axisStep = axisMax / steps;
        for (var x = 0; x < axisMax; x+=axisStep) {
            for (var y = 0; y < axisMax; y+=axisStep) {
                var value = custom(x, y);
                data.push({
                    x: x,
                    y: y,
                    z: value,
                    style: value
                })
            }
        }
        return data
    }
    let data = generateData();
    return (
        <div className={[styles.component].join(' ')} >
            <Graph3D data={data} options={{width: '100%', height: '100%'}}/>
        </div>
    );
}

export default Component;

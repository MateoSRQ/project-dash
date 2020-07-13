import React, {useRef, useEffect} from 'react';
import { Table, Tag, Space } from 'antd';
import Scrollable from 'react-scrollbars-custom';
import 'antd/dist/antd.css';

import Graph3D from 'react-graph3d-vis'
import styles from './index.module.css';

interface Props {
    columns: any[],
    data: any[],
    [x: string]: any
}


function Component(props: Props) {


    const {columns, data, ...ownProps} = props;

    return (
        <div className={[styles.component].join(' ')} >
            <Scrollable>
                <Table columns={columns} dataSource={data} pagination={false} {...ownProps}/>
            </Scrollable>
        </div>
    );
}

export default Component;

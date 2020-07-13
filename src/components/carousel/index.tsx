import React, {useRef, useEffect} from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.module.css';

interface Props {
    children: React.ReactElement[]
    [x: string]: any
}

function Component(props: Props) {
    const {children, childRef, style, ...ownProps} = props;
    console.log(ownProps)
    return (
        <div style={style} className={[styles.component].join(' ')}>
            <Carousel
                {...ownProps}
                className={[styles.carousel].join(' ')}
                ref={(ref: any) => {
                    console.log(childRef);
                    childRef.current = ref;
                }}
            >
                {children}
            </Carousel>
        </div>
    );
}

export default Component;

import React, {useRef, useState, useEffect, useCallback} from 'react';
import './App.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
import Scrollable from 'react-scrollbars-custom';
import { useWindowSize } from '@react-hook/window-size'
import 'react-grid-layout/css/styles.css';
import styles from './index.module.css';
import { v4 as uuidv4 } from 'uuid';
import Carousel from './components/carousel';
import {Menu, Dropdown, Button, Tag, Space} from 'antd';
import _ from 'lodash'

import {RightCircleOutlined, PauseCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import  {LockOutlined, UnlockOutlined} from "@ant-design/icons/lib";

import Table from './components/table';
import ThreeDGraph from './components/tdgraph';
import Globe from './components/globe';
import NivoMap from './components/nivomap'
import NivoBar from './components/nivobar';

import 'antd/dist/antd.css';

const ResponsiveGridLayout = WidthProvider(Responsive);
interface LayoutElement {
    i: string
    x: number
    y: number
    w: number
    h: number
    type: string
    moved?: boolean
    isResizable?: boolean
    maxH?: number
    maxW?: number
    minH?: number
    minW?: number
    static: boolean
    isDraggable: boolean
    scale?: number
    translateX?: number
    translateY?: number
}
type Layout = {
    [index : string ]: LayoutElement[];
};

function App() {
    const initialLayout = () => {
        let _api_layouts = window.localStorage.getItem('_api_layouts');
        if (_api_layouts) return JSON.parse(_api_layouts)
        return {page1: [], page2: []}
    }
    const [width, height] = useWindowSize();
    const carouselRef = useRef(null)
    const [pause, setPause] = useState(true)
    const [layouts, setLayouts] = useState<Layout>({page1: [], page2: []});
    const [page, setPage] = useState('page1');

    let icon = <PauseCircleOutlined style={{ fontSize: '24px' }}/>
    if (pause)  icon = <RightCircleOutlined style={{ fontSize: '24px' }}/>

    let  afterCarouselChange = async (item: any) => {
        await setPage((item === 0)?'page1':'page2')
    }

    useEffect(() => {
        // @ts-ignore
        carouselRef.current.slick.slickPause()
    },[carouselRef])
    useEffect(() => {
        setLayouts(initialLayout());
    }, [])
    const _setLayouts = (layout: Layout) => {
        console.log('_setLayouts')
        console.log(layouts)
        window.localStorage.setItem('_api_layouts', JSON.stringify(layouts));
        setLayouts(layout);
    }
    const changeState = () => {
        if (pause) {
            // @ts-ignore
            carouselRef.current.slick.slickPlay()
            console.log('play')
        }
        else {
            // @ts-ignore
            carouselRef.current.slick.slickPause()
            console.log('pause')
        }
        setPause(!pause)
    }
    const deleteItem = (id: string) => {
        let elem_1: LayoutElement;
        let _layouts: Layout;
        _layouts = {...layouts};
        _.remove(_layouts.page1, {i: id});
        _.remove(_layouts.page2, {i: id})
        _setLayouts(_layouts)
    }
    const createPanel = (type: string) => {
        let elem_1: LayoutElement;
        let _layouts: Layout;
        _layouts = {...layouts};
        switch (type) {
            case 'hospitalBar':
                elem_1= {
                    i: uuidv4(),
                    x: 0,
                    y: Infinity,
                    w: 2,
                    h: 12,
                    type: 'hospitalBar',
                    static: false,
                    isDraggable: true
                }
                _layouts[page].push(elem_1);
                break;
            case 'camasTable':
                elem_1 = {
                    i: uuidv4(),
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 14,
                    type: 'camasTable',
                    static: false,
                    isDraggable: true
                }
                _layouts[page].push(elem_1);
                break;
            case 'issuesTable':
                elem_1 = {
                    i: uuidv4(),
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 14,
                    type: 'issuesTable',
                    static: false,
                    isDraggable: true
                }
                _layouts[page].push(elem_1);
                break;
            case 'altasTable':
                elem_1 = {
                    i: uuidv4(),
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 14,
                    type: 'altasTable',
                    static: false,
                    isDraggable: true
                }
                _layouts[page].push(elem_1);
                break;
            case 'personalTable':
                elem_1 = {
                    i: uuidv4(),
                    x: 0,
                    y: 0,
                    w: 10,
                    h: 10,
                    type: 'personalTable',
                    static: false,
                    isDraggable: true
                }
                _layouts[page].push(elem_1);
                break;
            case 'globo':
                elem_1 = {
                    i: uuidv4(),
                    x: 0,
                    y: Infinity,
                    w: 1,
                    h: 10,
                    type: 'globo',
                    static: false,
                    isDraggable: true
                }
                _layouts[page].push(elem_1);
                break;
            case 'worldmap':
                elem_1 = {
                    i: uuidv4(),
                    x: 0,
                    y: Infinity,
                    w: 1,
                    h: 10,
                    type: 'worldmap',
                    static: false,
                    isDraggable: true,
                    scale: 100,
                    translateX: 0,
                    translateY: 0
                }
                console.log('createPanel')
                console.log(elem_1)
                _layouts[page].push(elem_1);
                break;
        }
        _setLayouts(_layouts);
    }
    const changeLock = (id: string) => {
        let elem_1: LayoutElement;
        let _layouts: Layout;
        _layouts = {...layouts};
        let index = _.findIndex(_layouts.page1, {i: id});
        if (_layouts.page1[index]) {
            _layouts.page1[index].static = !_layouts.page1[index].static
            _layouts.page1[index].isDraggable = !_layouts.page1[index].static

        }
        index = _.findIndex(_layouts.page2, {i: id});
        if (_layouts.page2[index]) {
            _layouts.page2[index].static = !_layouts.page2[index].static
            _layouts.page2[index].isDraggable = !_layouts.page2[index].static
        }
        _setLayouts(_layouts)
    }
    const onLayoutChange = (page: string, layout: any) => {
        console.log('onlayoutchange')
        let _layouts: Layout = {...layouts};
        _.merge(_layouts['page' + page], layout);
        _setLayouts(_layouts);
    }
    const onMapChange = (item: any) => {
        let _layouts: Layout = {...layouts};
        let index = _.findIndex(_layouts.page1, {i: item.key});

        if (_layouts.page1[index]) {
            _layouts.page1[index].scale = item.projectionScale
            _layouts.page1[index].translateX = item.projectionTranslationX
            _layouts.page1[index].translateY = item.projectionTranslationY
        }
        index = _.findIndex(_layouts.page2, {i: item.key});
        if (_layouts.page2[index]) {
            _layouts.page2[index].scale = item.projectionScale
            _layouts.page2[index].translateX = item.projectionTranslationX
            _layouts.page2[index].translateY = item.projectionTranslationY
        }
        _setLayouts(_layouts)
    }

    interface Panels {
        [index:string]: any
    }
    let panels: Panels = {panel1: null, panel2: null};

    for (let pp=1; pp<=2; pp++) {
        panels['panel' + pp] = layouts['page' + pp].map((item: any) => {
            console.log('item')
            console.log(item)
            let {i, type, ...props} = item;

            let lockIcon = <LockOutlined style={{fontSize: 16}}/>
            switch (type) {
                case 'hospitalBar':
                    let data_1 = [
                        {
                            'nombre': 'CLF',
                            'planificado': 97,
                            'real': 82,
                            "planificadoColor": "hsl(13, 70%, 50%)",
                            "realColor": "hsl(13, 70%, 50%)",
                        },
                        {
                            'nombre': 'HRH',
                            'planificado': 99,
                            'real': 82,
                            "planificadoColor": "hsl(13, 70%, 50%)",
                            "realColor": "hsl(13, 70%, 50%)",
                        },
                        {
                            'nombre': 'HCH',
                            'planificado': 94,
                            'real': 90,
                            "planificadoColor": "hsl(13, 70%, 50%)",
                            "realColor": "hsl(13, 70%, 50%)",
                        },
                        {
                            'nombre': 'HHU',
                            'planificado': 100,
                            'real': 99,
                            "planificadoColor": "hsl(13, 70%, 50%)",
                            "realColor": "hsl(13, 70%, 50%)",
                        },
                        {
                            'nombre': 'HSB',
                            'planificado': 91,
                            'real': 88,
                            "planificadoColor": "hsl(13, 70%, 50%)",
                            "realColor": "hsl(13, 70%, 50%)",
                        },
                        {
                            'nombre': 'HCL',
                            'planificado': 20,
                            'real': 67,
                            "planificadoColor": "hsl(13, 70%, 50%)",
                            "realColor": "hsl(13, 70%, 50%)",
                        }
                    ]
                    if (item.static) {
                        lockIcon = <UnlockOutlined style={{fontSize: 16}}/>
                    }
                    return (
                        <div className={styles.panel} key={i} data-grid={props}>
                            <div className={styles.title}>Título de la presentación</div>
                            <div className={styles.inner}>
                                <NivoBar data={data_1}/>
                            </div>
                            <div className={styles.lockIcon} onClick={() => { changeLock(item.i)}}>
                                {lockIcon}
                            </div>
                            <div className={styles.closeIcon} onClick={() => { changeLock(item.i)}}>
                                <CloseCircleOutlined style={{fontSize: 16}} onClick={() => { deleteItem(item.i)}}/>
                            </div>
                        </div>
                    )
                case 'camasTable':
                    let columns_2 = [
                        {
                            title: 'Sede',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'HT',
                            dataIndex: 'ht',
                            key: 'ht',
                        },
                        {
                            title: 'UCI',
                            dataIndex: 'uci',
                            key: 'uci',
                        },
                        {
                            title: 'Cirugía',
                            key: 'cirugia',
                            dataIndex: 'cirugia',
                        },
                        {
                            title: 'Adm.',
                            key: 'adm',
                            dataIndex: 'adm'
                        },
                    ];
                    let data_2 = [
                        {
                            key: '1',
                            name: 'CLF',
                            ht: 100,
                            uci: 0,
                            cirugia: 0,
                            adm: 0
                        },
                        {
                            key: '2',
                            name: 'HRH',
                            ht: 100,
                            uci: 0,
                            cirugia: 0,
                            adm: 0
                        },
                        {
                            key: '3',
                            name: 'HCH',
                            ht: 62,
                            uci: 40,
                            cirugia: 33,
                            adm: 17
                        },
                        {
                            key: '4',
                            name: 'HHU',
                            ht: 100,
                            uci: 0,
                            cirugia: 0,
                            adm: 0
                        },
                        {
                            key: '5',
                            name: 'HSB',
                            ht: 48,
                            uci: 0,
                            cirugia: 0,
                            adm: 0
                        },
                        {
                            key: '6',
                            name: 'HCL',
                            ht: 40,
                            uci: 0,
                            cirugia: 0,
                            adm: 0
                        },
                        {
                            key: '7',
                            name: 'TOTAL',
                            ht: 450,
                            uci: 40,
                            cirugia: 33,
                            adm: 17
                        },
                    ];
                    if (item.static) {
                        lockIcon = <UnlockOutlined style={{fontSize: 16}}/>
                    }
                    return (
                        <div className={styles.panel} key={i} data-grid={props}>
                            <div className={styles.title}>HOSPITALES - Número de camas</div>
                            <div className={styles.inner}>
                                <Table data={data_2} columns={columns_2} size='small'/>
                            </div>
                            <div className={styles.lockIcon} onClick={() => { changeLock(item.i)}}>
                                {lockIcon}
                            </div>
                            <div className={styles.closeIcon} onClick={() => { changeLock(item.i)}}>
                                <CloseCircleOutlined style={{fontSize: 16}} onClick={() => { deleteItem(item.i)}}/>
                            </div>
                        </div>
                    )
                case 'issuesTable':
                    let columns_3 = [
                        {
                            title: 'Nro',
                            dataIndex: 'nro',
                            key: 'nro',
                            width: 100,
                        },
                        {
                            title: 'Fecha',
                            dataIndex: 'fecha',
                            key: 'fecha',
                            width: 100,
                        },
                        {
                            title: 'Issue',
                            dataIndex: 'issue',
                            key: 'issue',
                        },
                        {
                            title: 'Severidad',
                            dataIndex: 'severidad',
                            key: 'severidad',
                            width: 100,
                            render: (text: string, record: any) => {
                                let color = '#ffffff'
                                let back  = '#000000'
                                if (text === 'MEDIO') { color = '#ea8405'; back = '#ffffff'}
                                if (text === 'ALTO') { color = '#740303'; back = '#ffffff'}
                                return {
                                    props: {
                                        style: {border: '8px solid white', background: color, textAlign: 'center', color: back}
                                    },
                                    children: <div>{text}</div>
                                }
                            }
                        },
                        {
                            title: 'AF Responsable',
                            key: 'responsable',
                            dataIndex: 'responsable',
                            width: 120,
                        },
                        {
                            title: 'AF Involucrada',
                            key: 'involucrada',
                            dataIndex: 'involucrada',
                            width: 120,
                        },
                        {
                            title: 'Fecha',
                            dataIndex: 'fecha2',
                            key: 'fecha2',
                            width: 100,
                        },

                        {
                            title: 'Comentario',
                            key: 'comentario',
                            dataIndex: 'comentario',

                        },
                        {
                            title: 'Estado',
                            key: 'estado',
                            dataIndex: 'estado',
                            width: 100,
                            render: (text: string, record: any) => {
                                let color = '#ffffff'
                                let back  = '#000000'
                                if (text === 'CERRADO') { color = '#196500'; back = '#ffffff'}
                                if (text === 'EN PROCESO') { color = '#ffc800'; back = '#000000'}
                                return {
                                    props: {
                                        style: {border: '8px solid white', background: color, textAlign: 'center', color: back}
                                    },
                                    children: <div>{text}</div>
                                }
                            }
                        },
                    ];
                    let data_3 = [
                        {
                            key: '1',
                            nro: '0008',
                            fecha: '05-Jun',
                            issue: 'Se evidenció falta de renovación de material de EPP, uniformes y botas para el personal desplegado en sedes de OVL',
                            severidad: 'MEDIO',
                            responsable: 'WKF',
                            involucrada: 'ADM, VICC',
                            fecha2: '23-Jun',
                            comentario: 'Se cierra el presente issue al haber informado WKF, que se cumplió con la entrega de EPP a todos los CAAT.',
                            estado: 'CERRADO'
                        },
                        {
                            key: '2',
                            nro: '0009',
                            fecha: '10-Jun',
                            issue: 'En el proceso de adjudicación del HCL, no se ha considerado la contratación de la red de oxigeno. Esto conlleva a realizar un proceso diferenciado para la contratación de este servicio de manera priorizada a fin de no incrementar riesgo de retrasos.  ',
                            severidad: 'ALTO',
                            responsable: 'VICC',
                            involucrada: 'ADM, VICC',
                            fecha2: '10-Jun',
                            comentario: 'VICC proporcionó TDR a ADM para convocatoria y estudio de mercado',
                            estado: 'EN PROCESO'
                        },
                    ];
                    if (item.static) {
                        lockIcon = <UnlockOutlined style={{fontSize: 16}}/>
                    }
                    return (
                        <div className={styles.panel} key={i} data-grid={props}>
                            <div className={styles.title}>Issues</div>
                            <div className={styles.inner}>
                                <Table data={data_3} columns={columns_3} size='small'/>
                            </div>
                            <div className={styles.lockIcon} onClick={() => { changeLock(item.i)}}>
                                {lockIcon}
                            </div>
                            <div className={styles.closeIcon} onClick={() => { changeLock(item.i)}}>
                                <CloseCircleOutlined style={{fontSize: 16}} onClick={() => { deleteItem(item.i)}}/>
                            </div>
                        </div>
                    )
                case 'altasTable':
                    let columns_4 = [
                        {
                            title: 'Nro',
                            dataIndex: 'nro',
                            key: 'nro',
                            width: 100,
                        },
                        {
                            title: 'Sede',
                            dataIndex: 'sede',
                            key: 'sede',
                        },
                        {
                            title: 'Ingresos',
                            dataIndex: 'ingresos',
                            key: 'ingresos',
                            width: 100,
                            render: (text: string, record: any) => {
                                let pabs = record.ingresos - record.pingresos;
                                let icon = ''
                                let color = '#ffffff'
                                if (pabs > 0)  {
                                    color = '#760000'
                                    icon = '🠕'
                                }
                                if (pabs < 0)  {
                                    color = '#022b68'
                                    icon = '🠗'
                                }

                                return {
                                    props: {
                                        style: { color: color}
                                    },
                                    children: <div>{text + ' (' + Math.abs(record.pingresos)})</div>
                                }
                            }
                        },
                        {
                            title: 'Altas',
                            dataIndex: 'altas',
                            key: 'altas',
                            width: 100,
                            render: (text: string, record: any) => {
                                let pabs = record.altas - record.paltas;
                                let icon = ''
                                let color = '#ffffff'
                                if (pabs > 0)  {
                                    color = '#760000'
                                    icon = '🠕'
                                }
                                if (pabs < 0)  {
                                    color = '#022b68'
                                    icon = '🠗'
                                }

                                return {
                                    props: {
                                        style: { color: color}
                                    },
                                    children: <div>{text + ' (' + Math.abs(record.paltas)})</div>
                                }
                            }
                        },
                        {
                            title: 'Bajas',
                            dataIndex: 'bajas',
                            key: 'bajas',
                            width: 100,
                            render: (text: string, record: any) => {
                                let pabs = record.bajas - record.pbajas;
                                let icon = ''
                                let color = '#ffffff'
                                if (pabs > 0)  {
                                    color = '#760000'
                                    // icon = '🠕'
                                }
                                if (pabs < 0)  {
                                    color = '#022b68'
                                    // icon = '🠗'
                                }

                                return {
                                    props: {
                                        style: { color: color}
                                    },
                                    children: <div>{text + ' (' + Math.abs(record.pbajas)})</div>
                                }
                            }
                        },
                     ];
                    let data_4 = [
                        {
                            key: '1',
                            sede: 'CLF',
                            ingresos: 10,
                            pingresos: 8,
                            altas: 3,
                            paltas: 4,
                            bajas: 10,
                            pbajas: 8
                        },
                        {
                            key: '2',
                            sede: 'HRH',
                            ingresos: 12,
                            pingresos: 15,
                            altas: 7,
                            paltas: 9,
                            bajas: 18,
                            pbajas: 20
                        },
                        {
                            key: '3',
                            sede: 'HCH',
                            ingresos: 7,
                            pingresos: 2,
                            altas: 10,
                            paltas: 12,
                            bajas: 3,
                            pbajas: 7
                        },
                        {
                            key: '4',
                            sede: 'HHU',
                            ingresos: 3,
                            pingresos: 2,
                            altas: 9,
                            paltas: 7,
                            bajas: 2,
                            pbajas: 4
                        },
                        {
                            key: '5',
                            sede: 'HSB',
                            ingresos: 7,
                            pingresos: 2,
                            altas: 10,
                            paltas: 5,
                            bajas: 7,
                            pbajas: 4
                        },
                        {
                            key: '6',
                            sede: 'HCL',
                            ingresos: 5,
                            pingresos: 0,
                            altas: 6,
                            paltas: 2,
                            bajas: 11,
                            pbajas: 5
                        },
                    ];
                    if (item.static) {
                        lockIcon = <UnlockOutlined style={{fontSize: 16}}/>
                    }
                    return (
                        <div className={styles.panel} key={i} data-grid={props}>
                            <div className={styles.title}>Issues</div>
                            <div className={styles.inner}>
                                <Table data={data_4} columns={columns_4} size='small'/>
                            </div>
                            <div className={styles.lockIcon} onClick={() => { changeLock(item.i)}}>
                                {lockIcon}
                            </div>
                            <div className={styles.closeIcon} onClick={() => { changeLock(item.i)}}>
                                <CloseCircleOutlined style={{fontSize: 16}} onClick={() => { deleteItem(item.i)}}/>
                            </div>
                        </div>
                    )
                case 'personalTable':
                    let columns_5 = [
                        {
                            title: 'Nro',
                            dataIndex: 'nro',
                            key: 'nro',
                            width: 100,
                        },
                        {
                            title: 'Sede',
                            dataIndex: 'sede',
                            key: 'sede',
                        },
                        {
                            title: 'WKF',
                            dataIndex: 'wkf',
                            key: 'wkf',
                            width: 100,
                        },
                        {
                            title: 'Contratista',
                            dataIndex: 'contratista',
                            key: 'contratista',
                            width: 100,
                        },
                        {
                            title: 'MINSA',
                            dataIndex: 'minsa',
                            key: 'minsa',
                            width: 100,
                        },
                    ];
                    let data_5 = [
                        {
                            key: '1',
                            sede: 'CLF',
                            wkf: 2,
                            contratista: 0,
                            minsa: 0,
                        },
                        {
                            key: '2',
                            sede: 'HRH',
                            wkf: 3,
                            contratista: 0,
                            minsa: 0,
                        },
                        {
                            key: '3',
                            sede: 'HCH',
                            wkf: 2,
                            contratista: 0,
                            minsa: 0,
                        },
                        {
                            key: '4',
                            sede: 'HHU',
                            wkf: 2,
                            contratista: 0,
                            minsa: 0,
                        },
                        {
                            key: '5',
                            sede: 'HSB',
                            wkf: 2,
                            contratista: 0,
                            minsa: 0,
                        },
                        {
                            key: '6',
                            sede: 'CLF',
                            wkf: 1,
                            contratista: 0,
                            minsa: 0,
                        },
                        {
                            key: '7',
                            sede: 'TOTAL',
                            wkf: 12,
                            contratista: 0,
                            minsa: 0,
                        },
                    ];
                    if (item.static) {
                        lockIcon = <UnlockOutlined style={{fontSize: 16}}/>
                    }
                    return (
                        <div className={styles.panel} key={i} data-grid={props}>
                            <div className={styles.title}>Personal en HT</div>
                            <div className={styles.inner}>
                                <Table data={data_5} columns={columns_5} size='small'/>
                            </div>
                            <div className={styles.lockIcon} onClick={() => { changeLock(item.i)}}>
                                {lockIcon}
                            </div>
                            <div className={styles.closeIcon} onClick={() => { changeLock(item.i)}}>
                                <CloseCircleOutlined style={{fontSize: 16}} onClick={() => { deleteItem(item.i)}}/>
                            </div>
                        </div>
                    )
                case 'globo':
                    if (item.static) {
                        lockIcon = <UnlockOutlined style={{fontSize: 16}}/>
                    }
                    return (
                        <div className={styles.panel} key={i} data-grid={props}>
                            <div className={styles.title}>Globo</div>
                            <div className={styles.inner}>
                                <Globe />
                            </div>
                            <div className={styles.lockIcon} onClick={() => { changeLock(item.i)}}>
                                {lockIcon}
                            </div>
                            <div className={styles.closeIcon} onClick={() => { changeLock(item.i)}}>
                                <CloseCircleOutlined style={{fontSize: 16}} onClick={() => { deleteItem(item.i)}}/>
                            </div>
                        </div>
                    )
                case 'worldmap':
                    console.log('worldmap')
                    console.log(item)
                    console.log(props)
                    console.log(type)
                    console.log(i)
                    if (item.static) {
                        lockIcon = <UnlockOutlined style={{fontSize: 16}}/>
                    }
                    return (
                        <div className={styles.panel} key={i} data-grid={props}>
                            <div className={styles.title}>Globo</div>
                            <div className={styles.inner}>
                                <NivoMap
                                    data={[
                                    {
                                        "id": "AFG",
                                        "value": 441819
                                    },
                                    {
                                        "id": "AGO",
                                        "value": 135540
                                    },
                                    {
                                        "id": "ALB",
                                        "value": 472548
                                    },
                                    {
                                        "id": "ARE",
                                        "value": 539356
                                    },
                                    {
                                        "id": "ARG",
                                        "value": 364652
                                    },
                                    {
                                        "id": "ARM",
                                        "value": 122077
                                    },
                                    {
                                        "id": "ATA",
                                        "value": 271206
                                    },
                                    {
                                        "id": "ATF",
                                        "value": 339132
                                    },
                                    {
                                        "id": "AUT",
                                        "value": 261958
                                    },
                                    {
                                        "id": "AZE",
                                        "value": 154110
                                    },
                                    {
                                        "id": "BDI",
                                        "value": 171466
                                    },
                                    {
                                        "id": "BEL",
                                        "value": 270093
                                    },
                                    {
                                        "id": "BEN",
                                        "value": 273300
                                    },
                                    {
                                        "id": "BFA",
                                        "value": 286607
                                    },
                                    {
                                        "id": "BGD",
                                        "value": 639508
                                    },
                                    {
                                        "id": "BGR",
                                        "value": 177571
                                    },
                                    {
                                        "id": "BHS",
                                        "value": 740417
                                    },
                                    {
                                        "id": "BIH",
                                        "value": 365615
                                    },
                                    {
                                        "id": "BLR",
                                        "value": 904299
                                    },
                                    {
                                        "id": "BLZ",
                                        "value": 519508
                                    },
                                    {
                                        "id": "BOL",
                                        "value": 714420
                                    },
                                    {
                                        "id": "BRN",
                                        "value": 575471
                                    },
                                    {
                                        "id": "BTN",
                                        "value": 561686
                                    },
                                    {
                                        "id": "BWA",
                                        "value": 340442
                                    },
                                    {
                                        "id": "CAF",
                                        "value": 506159
                                    },
                                    {
                                        "id": "CAN",
                                        "value": 998800
                                    },
                                    {
                                        "id": "CHE",
                                        "value": 237208
                                    },
                                    {
                                        "id": "CHL",
                                        "value": 428504
                                    },
                                    {
                                        "id": "CHN",
                                        "value": 843798
                                    },
                                    {
                                        "id": "CIV",
                                        "value": 258968
                                    },
                                    {
                                        "id": "CMR",
                                        "value": 55320
                                    },
                                    {
                                        "id": "COG",
                                        "value": 915766
                                    },
                                    {
                                        "id": "COL",
                                        "value": 376616
                                    },
                                    {
                                        "id": "CRI",
                                        "value": 595618
                                    },
                                    {
                                        "id": "CUB",
                                        "value": 830587
                                    },
                                    {
                                        "id": "-99",
                                        "value": 50464
                                    },
                                    {
                                        "id": "CYP",
                                        "value": 90253
                                    },
                                    {
                                        "id": "CZE",
                                        "value": 809180
                                    },
                                    {
                                        "id": "DEU",
                                        "value": 680535
                                    },
                                    {
                                        "id": "DJI",
                                        "value": 97539
                                    },
                                    {
                                        "id": "DNK",
                                        "value": 189324
                                    },
                                    {
                                        "id": "DOM",
                                        "value": 479794
                                    },
                                    {
                                        "id": "DZA",
                                        "value": 165255
                                    },
                                    {
                                        "id": "ECU",
                                        "value": 333756
                                    },
                                    {
                                        "id": "EGY",
                                        "value": 515604
                                    },
                                    {
                                        "id": "ERI",
                                        "value": 383690
                                    },
                                    {
                                        "id": "ESP",
                                        "value": 600498
                                    },
                                    {
                                        "id": "EST",
                                        "value": 984676
                                    },
                                    {
                                        "id": "ETH",
                                        "value": 363852
                                    },
                                    {
                                        "id": "FIN",
                                        "value": 75695
                                    },
                                    {
                                        "id": "FJI",
                                        "value": 417899
                                    },
                                    {
                                        "id": "FLK",
                                        "value": 18904
                                    },
                                    {
                                        "id": "FRA",
                                        "value": 301739
                                    },
                                    {
                                        "id": "GAB",
                                        "value": 174950
                                    },
                                    {
                                        "id": "GBR",
                                        "value": 90782
                                    },
                                    {
                                        "id": "GEO",
                                        "value": 454732
                                    },
                                    {
                                        "id": "GHA",
                                        "value": 460315
                                    },
                                    {
                                        "id": "GIN",
                                        "value": 760690
                                    },
                                    {
                                        "id": "GMB",
                                        "value": 865024
                                    },
                                    {
                                        "id": "GNB",
                                        "value": 697931
                                    },
                                    {
                                        "id": "GNQ",
                                        "value": 407273
                                    },
                                    {
                                        "id": "GRC",
                                        "value": 759775
                                    },
                                    {
                                        "id": "GTM",
                                        "value": 394585
                                    },
                                    {
                                        "id": "GUY",
                                        "value": 315226
                                    },
                                    {
                                        "id": "HND",
                                        "value": 167664
                                    },
                                    {
                                        "id": "HRV",
                                        "value": 863645
                                    },
                                    {
                                        "id": "HTI",
                                        "value": 578827
                                    },
                                    {
                                        "id": "HUN",
                                        "value": 974483
                                    },
                                    {
                                        "id": "IDN",
                                        "value": 990035
                                    },
                                    {
                                        "id": "IND",
                                        "value": 802031
                                    },
                                    {
                                        "id": "IRL",
                                        "value": 847625
                                    },
                                    {
                                        "id": "IRN",
                                        "value": 669721
                                    },
                                    {
                                        "id": "IRQ",
                                        "value": 125823
                                    },
                                    {
                                        "id": "ISL",
                                        "value": 164370
                                    },
                                    {
                                        "id": "ISR",
                                        "value": 365876
                                    },
                                    {
                                        "id": "ITA",
                                        "value": 141342
                                    },
                                    {
                                        "id": "JAM",
                                        "value": 59803
                                    },
                                    {
                                        "id": "JOR",
                                        "value": 379904
                                    },
                                    {
                                        "id": "JPN",
                                        "value": 640611
                                    },
                                    {
                                        "id": "KAZ",
                                        "value": 22600
                                    },
                                    {
                                        "id": "KEN",
                                        "value": 713406
                                    },
                                    {
                                        "id": "KGZ",
                                        "value": 640223
                                    },
                                    {
                                        "id": "KHM",
                                        "value": 566491
                                    },
                                    {
                                        "id": "OSA",
                                        "value": 556028
                                    },
                                    {
                                        "id": "KWT",
                                        "value": 486429
                                    },
                                    {
                                        "id": "LAO",
                                        "value": 410858
                                    },
                                    {
                                        "id": "LBN",
                                        "value": 302256
                                    },
                                    {
                                        "id": "LBR",
                                        "value": 373492
                                    },
                                    {
                                        "id": "LBY",
                                        "value": 60482
                                    },
                                    {
                                        "id": "LKA",
                                        "value": 255710
                                    },
                                    {
                                        "id": "LSO",
                                        "value": 232546
                                    },
                                    {
                                        "id": "LTU",
                                        "value": 186692
                                    },
                                    {
                                        "id": "LUX",
                                        "value": 315868
                                    },
                                    {
                                        "id": "LVA",
                                        "value": 521539
                                    },
                                    {
                                        "id": "MAR",
                                        "value": 735291
                                    },
                                    {
                                        "id": "MDA",
                                        "value": 812086
                                    },
                                    {
                                        "id": "MDG",
                                        "value": 550344
                                    },
                                    {
                                        "id": "MEX",
                                        "value": 942405
                                    },
                                    {
                                        "id": "MKD",
                                        "value": 750882
                                    },
                                    {
                                        "id": "MLI",
                                        "value": 367252
                                    },
                                    {
                                        "id": "MMR",
                                        "value": 941019
                                    },
                                    {
                                        "id": "MNE",
                                        "value": 485069
                                    },
                                    {
                                        "id": "MNG",
                                        "value": 518087
                                    },
                                    {
                                        "id": "MOZ",
                                        "value": 650243
                                    },
                                    {
                                        "id": "MRT",
                                        "value": 765845
                                    },
                                    {
                                        "id": "MWI",
                                        "value": 436851
                                    },
                                    {
                                        "id": "MYS",
                                        "value": 183904
                                    },
                                    {
                                        "id": "NAM",
                                        "value": 482596
                                    },
                                    {
                                        "id": "NCL",
                                        "value": 480622
                                    },
                                    {
                                        "id": "NER",
                                        "value": 347432
                                    },
                                    {
                                        "id": "NGA",
                                        "value": 352524
                                    },
                                    {
                                        "id": "NIC",
                                        "value": 829087
                                    },
                                    {
                                        "id": "NLD",
                                        "value": 485824
                                    },
                                    {
                                        "id": "NOR",
                                        "value": 119214
                                    },
                                    {
                                        "id": "NPL",
                                        "value": 486159
                                    },
                                    {
                                        "id": "NZL",
                                        "value": 503603
                                    },
                                    {
                                        "id": "OMN",
                                        "value": 121320
                                    },
                                    {
                                        "id": "PAK",
                                        "value": 230987
                                    },
                                    {
                                        "id": "PAN",
                                        "value": 825040
                                    },
                                    {
                                        "id": "PER",
                                        "value": 702421
                                    },
                                    {
                                        "id": "PHL",
                                        "value": 410068
                                    },
                                    {
                                        "id": "PNG",
                                        "value": 983719
                                    },
                                    {
                                        "id": "POL",
                                        "value": 896701
                                    },
                                    {
                                        "id": "PRI",
                                        "value": 726713
                                    },
                                    {
                                        "id": "PRT",
                                        "value": 112718
                                    },
                                    {
                                        "id": "PRY",
                                        "value": 732508
                                    },
                                    {
                                        "id": "QAT",
                                        "value": 707100
                                    },
                                    {
                                        "id": "ROU",
                                        "value": 360524
                                    },
                                    {
                                        "id": "RUS",
                                        "value": 42179
                                    },
                                    {
                                        "id": "RWA",
                                        "value": 16166
                                    },
                                    {
                                        "id": "ESH",
                                        "value": 426479
                                    },
                                    {
                                        "id": "SAU",
                                        "value": 435789
                                    },
                                    {
                                        "id": "SDN",
                                        "value": 855535
                                    },
                                    {
                                        "id": "SDS",
                                        "value": 774998
                                    },
                                    {
                                        "id": "SEN",
                                        "value": 584629
                                    },
                                    {
                                        "id": "SLB",
                                        "value": 31671
                                    },
                                    {
                                        "id": "SLE",
                                        "value": 207143
                                    },
                                    {
                                        "id": "SLV",
                                        "value": 191613
                                    },
                                    {
                                        "id": "ABV",
                                        "value": 126165
                                    },
                                    {
                                        "id": "SOM",
                                        "value": 356593
                                    },
                                    {
                                        "id": "SRB",
                                        "value": 572314
                                    },
                                    {
                                        "id": "SUR",
                                        "value": 957697
                                    },
                                    {
                                        "id": "SVK",
                                        "value": 34627
                                    },
                                    {
                                        "id": "SVN",
                                        "value": 16351
                                    },
                                    {
                                        "id": "SWZ",
                                        "value": 526024
                                    },
                                    {
                                        "id": "SYR",
                                        "value": 218171
                                    },
                                    {
                                        "id": "TCD",
                                        "value": 836783
                                    },
                                    {
                                        "id": "TGO",
                                        "value": 674700
                                    },
                                    {
                                        "id": "THA",
                                        "value": 836511
                                    },
                                    {
                                        "id": "TJK",
                                        "value": 220655
                                    },
                                    {
                                        "id": "TKM",
                                        "value": 464408
                                    },
                                    {
                                        "id": "TLS",
                                        "value": 924668
                                    },
                                    {
                                        "id": "TTO",
                                        "value": 787485
                                    },
                                    {
                                        "id": "TUN",
                                        "value": 67186
                                    },
                                    {
                                        "id": "TUR",
                                        "value": 765977
                                    },
                                    {
                                        "id": "TWN",
                                        "value": 766076
                                    },
                                    {
                                        "id": "TZA",
                                        "value": 899729
                                    },
                                    {
                                        "id": "UGA",
                                        "value": 779329
                                    },
                                    {
                                        "id": "UKR",
                                        "value": 428427
                                    },
                                    {
                                        "id": "URY",
                                        "value": 10859
                                    },
                                    {
                                        "id": "USA",
                                        "value": 248415
                                    },
                                    {
                                        "id": "UZB",
                                        "value": 332757
                                    },
                                    {
                                        "id": "VEN",
                                        "value": 778757
                                    },
                                    {
                                        "id": "VNM",
                                        "value": 734701
                                    },
                                    {
                                        "id": "VUT",
                                        "value": 855418
                                    },
                                    {
                                        "id": "PSE",
                                        "value": 285941
                                    },
                                    {
                                        "id": "YEM",
                                        "value": 56988
                                    },
                                    {
                                        "id": "ZAF",
                                        "value": 548084
                                    },
                                    {
                                        "id": "ZMB",
                                        "value": 376991
                                    },
                                    {
                                        "id": "ZWE",
                                        "value": 371854
                                    },
                                    {
                                        "id": "KOR",
                                        "value": 509011
                                    }
                                ]}
                                    projectionScale={props.scale}
                                    projectionTranslationX={props.translateX}
                                    projectionTranslationY={props.translateY}
                                    mapkey={i}
                                    onMapChange={onMapChange}
                                />
                            </div>
                            <div className={styles.lockIcon} onClick={() => { changeLock(item.i)}}>
                                {lockIcon}
                            </div>
                            <div className={styles.closeIcon} onClick={() => { changeLock(item.i)}}>
                                <CloseCircleOutlined style={{fontSize: 16}} onClick={() => { deleteItem(item.i)}}/>
                            </div>
                        </div>
                    )
                break;
            }
        })
    }
    const menu = (
        <Menu>
            <Menu.Item onClick={() => {createPanel('hospitalBar') }}>
                Avance hospitales
            </Menu.Item>
            <Menu.Item onClick={() => {createPanel('camasTable') }}>
                Número de camas
            </Menu.Item>
            <Menu.Item onClick={() => {createPanel('altasTable') }}>
                Ingresos, Altas y Bajas
            </Menu.Item>
            <Menu.Item onClick={() => {createPanel('personalTable') }}>
                Personal en HT
            </Menu.Item>
            <Menu.Item onClick={() => {createPanel('issuesTable') }}>
                Issues
            </Menu.Item>
            <Menu.Item onClick={() => {createPanel('globo') }}>
                COVID - Mundial
            </Menu.Item>
            <Menu.Item onClick={() => {createPanel('worldmap') }}>
                COVID - Mapa del Mundo
            </Menu.Item>
        </Menu>
    );
    // let page1 = layouts.page1.map((item: any) => {
    //     const {type, ..._item} = item;
    //     return _item;
    // });
    // let page2 = layouts.page2.map((item: any) => {
    //     const {type, ..._item} = item;
    //     return _item;
    // });
    return (
        <div className={styles.app}>
            <div className={styles.titleBar}>
                <span className={styles.headertitle}>Cuadro de mando</span>
                <img className={styles.logo} src='./images/logo.png' />
                <Dropdown overlay={menu} placement="bottomCenter" arrow>
                    <Button>Insertar módulo</Button>
                </Dropdown>
                <div className={styles.icon} onClick={changeState}>
                    {icon}
                </div>
            </div>
            <Carousel
                autoplay={!pause}
                autoplaySpeed={1000}
                effect='fade'
                infinite={true}
                dotPosition={'top'}
                childRef={carouselRef}
                style={{marginTop: '40px', height: 'calc(100% - 40px)'}}
                afterChange={ (item: any) => { return afterCarouselChange(item)}}
            >
                <div key="1" >
                    <div style={{height: (height-60) + 'px', marginTop: '16px'}}>
                        <Scrollable className={['App', styles.component].join(' ')}>
                            <ResponsiveGridLayout
                                className={["layout", styles.layout].join(' ')}
                                cols={{lg: 20, md: 20}}
                                margin={[6, 6]}
                                //layouts={{lg: page1, md: page1}}
                                containerPadding={[3, 3]}
                                breakpoints={{lg: 1920, md: 1080}}
                                rowHeight={20}
                                compactType='horizontal'
                                onLayoutChange={(layout: any) => { onLayoutChange('1', layout) }}
                            >
                                {panels.panel1}
                            </ResponsiveGridLayout>
                        </Scrollable>
                    </div>
                </div>
                <div key="2">
                    <div style={{height: (height-60) + 'px', marginTop: '16px'}}>
                        <Scrollable className={['App', styles.component].join(' ')}>
                            <ResponsiveGridLayout
                                className={["layout", styles.layout].join(' ')}
                                cols={{lg: 20, md: 20}}
                                margin={[6, 6]}
                                //layouts={{lg: page2, md: page2}}
                                containerPadding={[3, 3]}
                                breakpoints={{lg: 1920, md: 1080}}
                                rowHeight={20}
                                //verticalCompact={false}
                                compactType='horizontal'
                                //preventCollision={true}
                                onLayoutChange={(layout: any) => { onLayoutChange('2', layout) }}
                            >
                                {panels.panel2}
                            </ResponsiveGridLayout>
                        </Scrollable>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}

export default App;

import './App.css';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    QuestionCircleOutlined,

} from '@ant-design/icons';
import {Button, Menu, Input,} from 'antd';
import {useState, useMemo, useRef} from 'react';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('Option 3', '3', <ContainerOutlined/>),
    getItem('Navigation One', 'sub1', <MailOutlined/>, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined/>, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];
let saveContent = ""

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [collItem, setCollItem] = useState(items[0]);
    const [totalItems, setTotalItems] = useState(items);
    const [inputValue, setInputValue] = useState("");
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    console.log(totalItems)
    const changeItem = (item) => {
        setInputValue("")
        setCollItem(item)
        console.log(currentItem)
    }
    const search = () => {
        for (let i = 0; i < totalItems.length; i++) {
            if (totalItems[i].children) {
                console.log('in first')
                for (let j = 0; j < totalItems[i].children.length; j++) {
                    if (totalItems[i].children[j].key === collItem.key) {
                        return totalItems[i].children[j]
                    }

                }
            } else {
                if (totalItems[i].key === collItem.key) {
                    return totalItems[i]
                }
            }
        }
    }
    const currentItem = useMemo(() => {
        return search()
    }, [collItem])
    return (
        <div className="App">
            <div className="App-header">
                <div style={{height: "100%", display: "flex", alignItems: "center"}}><img
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/><span
                    style={{fontSize: "18px"}}>react</span>
                    <div className="line"></div>
                </div>
                <div style={{height: "100%", display: "flex", alignItems: "center"}}><QuestionCircleOutlined
                    style={{marginRight: "16px"}}/><span style={{marginRight: "16px"}}>admin</span></div>
            </div>
            <div className="App-body">
                <div
                    style={{
                        width: 256,
                        height: "100%",
                        backgroundColor: "rgb(25,28,31)"
                    }}
                >
                    <div style={{backgroundColor: "rgb(29,35,39)"}}><Button
                        type="primary"
                        onClick={toggleCollapsed}
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                    </div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={totalItems}
                        onClick={changeItem}
                    />
                </div>
                <div className="App-body-container">
                    {collItem ? <div style={{display: "flex"}}><Input value={inputValue} onChange={(evt) => {
                        saveContent = evt.target.value;
                        setInputValue(saveContent)
                    }} placeholder={currentItem.label} style={{margin: "32px"}}/><Button onClick={() => {
                        currentItem.label = saveContent;
                        console.log(totalItems);
                        setTotalItems([...totalItems])
                    }
                    } style={{margin: "32px"}} type="primary">保存</Button></div> : ""}

                </div>
            </div>
        </div>
    );
}

export default App;

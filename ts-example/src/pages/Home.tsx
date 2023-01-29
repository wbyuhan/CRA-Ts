import React,{ useState, useEffect,useMemo,useRef } from 'react';
import {io} from 'socket.io-client';
import {
  Button,
  Form,
  Input,
} from 'antd'

const Home: React.FC = () => {

	const [count, setCount] = useState<string | number | any>(0)
	const ref:any = useRef();
	const [form] = Form.useForm()
	useEffect(() => {
		ref.current = count;
		console.log("%c Line:10 🍭 ref.current", "color:#ea7e5c", ref.current);
	},[count])
	const [messages, setMessage] = useState<any>([])
  const [connect,setConnect] = useState<boolean>(false);
  const [sockets, setSockets] = useState<any>()
  useEffect(() => {
    const socket = io("http://192.168.31.85:7001/io")
    setSockets(socket)
    socket.open();
    console.log('socket',socket)
    socket.on('connect', () => {
      setConnect(socket.connected)
    })
    // if(!connect){
    //   socket.close()
    // }
    return () => {
      socket.close()
      // clearEffect
    };
  }, []);

	const add = () => {
		setCount(count + 1)
		setCount(count + 2)
		setCount(count + 3)
		setCount('aaa')
	};
	const reduceNum = () => {
		setCount(count - 1)
	}

	// 数组扁平化

	const flatTennd:any = (array:Array<number>) => {
		let result: any[] = [];
		for (let index = 0; index < array.length; index++) {
			if(Array.isArray(array[index])){
			result = result.concat(flatTennd(array[index]))
			}else{
				result.push(array[index])
			}
			
		}
	}
	const handler = () => {
		const targetEvent = new CustomEvent('mask',{detail:{url:'aaaaa'}})
		document.dispatchEvent(targetEvent);
	}

	// 接收
const getMsg = () => {
  sockets.on("gbmsg", (data:any) => {
    setMessage((msg: any) => [...msg,data])
  })
}

const onFinish = (values:any) => {
  console.log("values",values)
  console.log(connect)
  if(values?.message){
    form.setFieldValue("message",null)
    sockets.emit('message',values?.message)
  }

}

	return (
		<>
			<div>{count}</div>
			<button onClick={add}>增加</button>
			<button onClick={reduceNum}>减少</button>
			<button onClick={handler}>注册事件</button>
			{(messages || []).map((item: any) => (
				<p key={item}>{item}</p>
			))}
		<Form
			form={form}
			onFinish={onFinish}>
				<Form.Item
					label=""
					name="message"
				>
					<Input />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						发送
					</Button>
				</Form.Item>
			</Form>
		</>
	)
} 




export default Home;

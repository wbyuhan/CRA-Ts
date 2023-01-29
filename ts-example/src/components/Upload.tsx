import React,{useState,useRef,useEffect } from 'react';

function Upload() {

	const [imgages, setImgages] = useState<any>([]);
	
	const filesRef:any = useRef();
	

	const init = () => {
		filesRef.current = []
	}

	useEffect(() => {
		init()
	},[])

	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		console.log("%c Line:7 🍬 e", "color:#e41a6a", e);
		const files:any = e.target.files
		console.log("%c Line:9 🥕 files", "color:#ed9ec7", files);
		console.log("%c Line:29 🍧 files.current", "color:#33a5ff", filesRef.current);
		if([...files].length > 0){
			for (const file of files) {
			console.log(URL.createObjectURL(file))
				filesRef.current.push(URL.createObjectURL(file))
			}
			setImgages([...filesRef.current])
			}else{
				setImgages([])
			}

	}
  return (
    <>
      <input 
				type="file" 
				accept="image/*" 
				multiple={true}
				onClick={e => e.stopPropagation()}
				onChange={onChange}
				/>
				{
					imgages.length > 0 && imgages.map((item:any,index:number) => {
						return <img key={index} src={item} alt="" style={{width:'50px',height:'50px',margin:'10px'}} />
					})
				}
    </>
  );
}

export default Upload;

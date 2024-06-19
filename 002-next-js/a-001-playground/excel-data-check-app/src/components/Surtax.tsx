import { useCallback, useEffect, useState } from "react";
import * as XLSX from 'xlsx'
import axios from "axios";

interface IProps {
    token : string;
}

export default function SurtaxPage({token}:IProps) { 
  const [data, setData] = useState<any>();
  const [result , setResult] = useState<any>();
  const [excel , setExcel] = useState<any>();

  const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files;

    if(files){
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        const wb = XLSX.read(fileData, { type: 'binary' });

        const sheetNameList = wb.SheetNames;
        const sheetName = sheetNameList[0];
        const sheet = wb.Sheets[sheetName];
        const records = XLSX.utils.sheet_to_json(sheet, { raw: false });

        setData(records);
      };
      reader.readAsBinaryString(files[0]);
    }
  },[]);

  const onClick = useCallback(()=> {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excel);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');
    XLSX.writeFile(workbook, `result-${new Date().getTime()}.xlsx`);
  },[excel])

  useEffect(()=>{
    if(!data){
      return;
    }

    const api: any = [];
    data.forEach((item:any) => {
      api.push(
        axios.get(`/settlements/stores/${item.store_id}/monthly?start_month=2023-01&end_month=2023-01`)
          ,{ headers: { Authorization: `Bearer ${token}`}
        }
      )
      
    })
    
    Promise.allSettled(api).then((rslt:any) => {
      const rlt:any = {};
      rslt.forEach((res:any) => {
        const {config, data } = res.value;
        if(config?.url.indexOf("settlements/stores")){
          const { payment_price, disposable_cup_price, promotion_price } = data[0];
          const surtax = payment_price - disposable_cup_price + promotion_price;
          const storeId = config?.url.replace("/settlements/stores/","").replace("/monthly?start_month=2023-01&end_month=2023-01","");
          rlt[storeId] = surtax;
        }
      })
      setResult(rlt);
    });
  },[data, token]);

  useEffect(()=>{
    if(!data || !result){
      return;
    }
    setExcel(data.map((item :any, index: number) => ({
      ...item,
      surtax: result[item.store_id],
      different: item.price != result[item.store_id]? "O" : "X"
    })));
  },[data, result]);

  return (
    <div>
      <input type={"file"} onChange={onChange} />
      <button onClick={onClick}>export excel</button>
      <table>
        <thead>
        <tr>
          <th>count</th>
          <th>매장아이디</th>
          <th>매장명</th>
          <th>price</th>
          <th>surtax</th>
          <th>surtax == price</th>
        </tr>
        </thead>
        <tbody>
          {result && data?.map((item :any, index: number) => 
            <tr key={item.store_id}>
              <td>{index + 1}</td>
              <td>{item.store_id}</td>
              <td>{item.store_name}</td>
              <td>{item.price}</td>
              <td>{result[item.store_id]}</td>
              <td>{item.price == result[item.store_id]? "O" : "X"}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}
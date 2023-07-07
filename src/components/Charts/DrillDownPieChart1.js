import React, { Fragment, useState ,useEffect} from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "../CSS/Table5.css";
import Search from './Search';

const colors = [
  '#1f77b4', // Steel Blue
  '#ff7f0e', // Dark Orange
  '#2ca02c', // Green
  '#d62728', // Red
  '#9467bd', // Purple
  '#8c564b', // Brown
  '#e377c2', // Pink
  '#7f7f7f', // Gray
  '#bcbd22', // Olive
  '#17becf', // Light Blue
  '#8A2BE2', // Blue Violet
  '#9932CC', // Dark Orchid
  '#800080', // Purple
  '#BA55D3', // Medium Orchid
  '#DA70D6', // Orchid
  '#FF1493', // Deep Pink
  '#FF69B4', // Hot Pink
  '#FFB6C1', // Light Pink
  '#FFA07A', // Light Salmon
  '#FF8C00', // Dark Orange
  '#FF4500', // Orange Red
  '#FFD700', // Gold
  '#ADFF2F', // Green Yellow
  '#7CFC00', // Lawn Green
  '#00FFFF', // Cyan
];


const DrillDownPieChart1 = (props) => {
  let cnt = 0;
  ///
  const [myArray, setMyArray] = useState([]);
  // console.log('here first');
  const [mapdata, setMapddata] = useState([]);
  
  const MapArr = (start, end) => {
    const rangesMap = [];
    return axios.get(`http://52.42.106.142:8001/electionfinal/election/slice/${start}/${end}`).then((respo) => {
      const response = respo.data;
      for (var i of response) {
        const val = i.constname;
        rangesMap.push(val + ', ');
      }
      return rangesMap;
    }).catch(error => {
      console.error('Axios error:', error);
    });
  };
  
  useEffect(() => {
    // console.log('in useEffect');
    // setMyArray([]);
    (async () => {
      // setMyArray([]);
      for (let i = 1; i <= 201; i += 25) {
        const rangeStart = i;
        const rangeEnd = i + 24;
        let rangeKey = `Range ${rangeStart}-${rangeEnd}`;
  
        try {
          // setMyArray([]);
          const rangeValue = await MapArr(rangeStart, rangeEnd);
          if (i === 201){
            rangeKey = 'Range 201-224';
          }
          const rangeObject = { [rangeKey]: rangeValue };
          myArray.push(rangeObject);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      console.log(myArray);
      setMapddata(myArray);
    })();
  }, []);

  const uniqueArray = myArray.filter((value, index) => {
    return myArray.indexOf(value) === index;
  });
  
  // Access uniqueArray here or in other parts of your component
  // console.log(uniqueArray);

  const fetchData = (start,end) => {
    axios.get(`http://52.42.106.142:8001/electionfinal/election/slice/${start}/${end}`).then((respo) => {
      // http://52.42.106.142:8001/electionfinal/cabinet/ministers
      const response = respo.data;
      const ranges2 = [];
      for (var i of response){
        const rangeName = i.constname;
        const rangeLabel = rangeName;
        ranges2.push({
          name: rangeName,
          value: 1,
          label: rangeLabel
        });
      }
      setPreviousData(data);
      setData(ranges2);
      setSecondata(ranges2);
    }).catch(error => {
      console.error('Axios error:', error);
    })
  }

  // 3rd level data fetching
  const fetchData2 = (val) =>  {
    if (level === 2){
      axios.get(`http://52.42.106.142:8001/electionfinal/election/slicesecond/${val}`)
      .then((response) => {
        // console.log('Axios response:', response.data);
        const ranges3 = [];
        const ranges4 = [];
        const k = response.data;
        setArray(k);
        setCokey(k[0].constkey);
        for (var i of k) {
          const valuee = i.totvotes;
          const rangeLabel = i.pname;
          const rangeName = i.cname;
          if (valuee > 2000){
            ranges3.push({
              name: "Candidate Name: " + rangeName,
              label:rangeLabel,
              value: valuee
            });
          }
          else{
            cnt = cnt + valuee;
            ranges4.push({
              name: "Candidate Name: " + rangeName,
              label:rangeLabel,
              value: valuee
            });
          }
        }
        ranges3.push({
          name: "Others",
          label: "Others",
          value: cnt
        })
        setPreviousData(data);
        setData(ranges3);
        setFourdata(ranges4);
      });
    }
    else if (level === 3){
      setPreviousData(data);
      setData(fourdata);
    }
  }
  

  // 1st level data initializing dynamically
  const ranges = [];
  let startValue = 1;
  const rangeSize = 25;
  const rangeCount = Math.ceil(224/rangeSize);
  const last_ele = 224 % rangeSize;

  for (let i = 0; i < rangeCount; i++) {
    const rangeName = 'Range ' + String.fromCharCode(65 + i);
    if (i === rangeCount - 1){
      const endValue = startValue + rangeSize - 1;
      const rangeLabel = 'Range ' + startValue + '-' + '224';
      ranges.push({   // ranges.push();
        name: rangeName,
        value: 1,
        label: rangeLabel
      });
      startValue = endValue + 1;
    }
    else{
      const endValue = startValue + rangeSize - 1;
      const rangeLabel = 'Range ' + startValue + '-' + endValue;
      ranges.push({   // ranges.push();
        name: rangeName,
        value: 1,
        label: rangeLabel
      });
      startValue = endValue + 1;
    }
    // setRname('Range ' + String.fromCharCode(65 + i));
    // setRlabel('Range ' + startValue + '-' + endValue);
  }
  // ranges.push({   // ranges.push();
  //   name: rname,
  //   value: 1,
  //   label: rlabel
  // });

  // initializing the variables
  const [data, setData] = useState(ranges);
  const [previousData, setPreviousData] = useState([]);
  const [level, setLevel] = useState(1);
  const [array,setArray] = useState([]);
  const [showdata,setShowdata] = useState(false);
  const [coname,setConame] = useState("");
  const [cokey,setCokey] = useState("");
  const [secondata,setSecondata] = useState([]);
  const [fourdata,setFourdata] = useState([]);

  // 2nd and 3rd level data 
  const HandleSliceClick = (name) => {
    if (level === 1){
      // name === 'Range-A'
      let character = name.substring(6);

      function getRange(character) {
        const ranges = {
          A: { x: 1, y: 25 },
          B: { x: 26, y: 50 },
          C: { x: 51, y: 75 },
          D: { x: 76, y: 100 },
          E: { x: 101, y: 125 },
          F: { x: 126, y: 150 },
          G: { x: 151, y: 175 },
          H: { x: 176, y: 200 },
          I: { x: 201, y: 224 }
        };
        return ranges[character];
      }

      if (name === `Range ${character}`) {
        const ran = getRange(character)
        fetchData(ran.x, ran.y);
        setLevel(2);
      }
      props.handleslice();
    }

    else if (level === 2){
      fetchData2(name);
      setShowdata(true);
      setConame(name);
      setLevel(3);
    }

    else if (level === 3 && name === 'Others'){
      fetchData2(name);
      setLevel(4);
    }
  };

  const handleBackClick = () => {
    if (level === 2){
      setData(ranges); // Restore the previous data
      setPreviousData([]);
      setLevel(1);
      // console.log(level);
      props.handleback();
    }
    if (level === 3){
      setData(secondata);
      setLevel(2);
      setShowdata(false);
    }
    if (level === 4){
      setData(previousData);
      setLevel(3);
      cnt = 0;
    }
  };
  // setMapddata(myArray);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value,label}) => {
    const RADIAN = Math.PI / 180;
    // const radius = outerRadius + 10; // Distance between slice and label
    // const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const angle = midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle; // Adjust label position for slices in the left half of the pie chart

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    return (
        <>
        <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={'black'}
            fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={'black'} stroke="none" />
        <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey + (angle > 180 ? 10 : -10)}
            textAnchor={textAnchor}
            fill="#333"
          >
            {`${label}`}
        </text>
        </>
    );
  };

  // 
  const table2Style = {
    borderCollapse: 'collapse',
    width: '95%',
  };

  const table2HeaderStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
  };

  const table2CellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <>
    <div style={{marginLeft: '920px', marginRight: '25px'}}>
      <Search/>
    </div>
    {/* we don't need to have a back button in 1st level, but needed in other levels */}
    {previousData.length > 0 && (
        <button className="btn btn-secondary mx-2" onClick={handleBackClick} >
          Back
        </button>
      )}
    <Fragment>
    {/* constituency name to be shown in level 3 only */}
    {level === 3 ? 
      (<h1>{coname + " (" +cokey+")"}</h1>) : (<div></div>)}
    
      <ResponsiveContainer width="100%" height={550}>
        <PieChart>
          <Pie
            data={data}
            label={renderCustomizedLabel}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            // innerRadius={100}
            outerRadius={180}
            onClick={(data) => HandleSliceClick(data.name)}
            >
            
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            wrapperStyle={{ backgroundColor: '#DA70D6', padding: '5px' }} // Custom styles for tooltip wrapper
          />
          
          {/* {(level !== 3 && level !== 4) ? (<Legend
            align="right" // Adjust alignment as needed
            verticalAlign="middle" // Adjust vertical alignment as needed
            layout="vertical" // Set the layout to "vertical"
            iconType="circle"
            iconSize={10}
            wrapperStyle={level !== 3 ? { marginRight: '100px' } : { marginRight: '40px' }}
          />):(<div>Click on others to learn more!</div>)} */}
        </PieChart>
      </ResponsiveContainer>
    </Fragment>
    
    {/* Table display */}
    {showdata ? (
      <center>
        <table style={table2Style}>
          <thead>
            <tr>
              <th style={table2HeaderStyle}>Sno</th>
              <th style={table2HeaderStyle}>Candidate Name</th>
              <th style={table2HeaderStyle}>Party Name</th>
              <th style={table2HeaderStyle}>EVM votes</th>
              <th style={table2HeaderStyle}>Postal Votes</th>
              <th style={table2HeaderStyle}>Total Votes</th>
              <th style={table2HeaderStyle}>Percentage of Votes</th>
            </tr>
          </thead>
          <tbody>
            {array.map((data,index) => (
              <tr key={data.sno}>
                <td style={table2CellStyle}>{index+1}</td>
                <td style={table2CellStyle}>{data.cname}</td>
                <td style={table2CellStyle}>{data.pname}</td>
                <td style={table2CellStyle}>{data.evmvotes}</td>
                <td style={table2CellStyle}>{data.postalvotes}</td>
                <td style={table2CellStyle}>{data.totvotes}</td>
                <td style={table2CellStyle}>{data.percentofvotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>):(<div></div>)}

      {level === 1 ? (
        <>
          <h2>Range to Constituency mapping</h2>
          <center>
          <table style={table2Style}>
            <thead>
              <tr>
                <th style={table2HeaderStyle}>Range</th>
                <th style={table2HeaderStyle}>Constituencies</th>
              </tr>
            </thead>
            <tbody>
              {console.log(uniqueArray)}
                {uniqueArray.map((data, index) => {
                  if (index % 2 !== 1) {
                    return (
                      <tr key={data.sno}>
                        <td style={table2CellStyle}>{Object.keys(data)[0]}</td>
                        <td style={table2CellStyle}>{data[Object.keys(data)[0]]}</td>
                      </tr>
                    );
                  } else {
                    return null; // Skip odd-indexed elements
                  }
                })}
            </tbody>
          </table>
        </center>
        </>
      ):(
        <div></div>
      )}
    </>
  );
};

export default DrillDownPieChart1;
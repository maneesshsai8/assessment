
import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircle, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
function App() {
  const [name, setName] = React.useState("")
  const [state, setState] = React.useState(false);
  const [showndropDown, setShownDropdown] = React.useState([])
  const [dropdownSelected, setDropdowmSelected] = React.useState("first_name")
  let dropDownArr = [
    { label: "First Name", value: "first_name", color: "green" },
    { label: "Last Name", value: "last_name", color: "red" },
    { label: "Gender", value: "gender", color: "green" },
    { label: "Account Name", value: "account_name", color: "red" },
    { label: "City", value: "city", color: "green" },
    { label: "State", value: "state", color: "red" },
  ]
  const [dropdown, setdropDown] = React.useState([])
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  React.useEffect(() => {
    const filterList = dropDownArr.filter(each => !dropdown.some(e => each.value === e.value))
    setShownDropdown([...filterList])
  }, [dropdown])

  const Add = () => {
    const selectedObj = dropDownArr.find(each => each.value === dropdownSelected) || {}
    setdropDown([...dropdown, selectedObj])
    setShownDropdown(showndropDown.filter(each => each.value !== dropdownSelected))
  }
  const selected = (value) => {
    setDropdowmSelected(value)
  }
  const remove = (value) => {
    const remainingArr = dropdown.filter(each => each.value !== value)
    setdropDown(remainingArr)

  }
  const SegmentName = (value) => {
    setName(value)
  }
  const cancel = () => {
    setState(false)
  }

  const saveSegment = async () => {
    const arr = []
    for (let each of dropdown) {
      const obj = {}
      obj[each.value] = each.label
      arr.push(obj)
    }
    const data = {
      "segment_name": name,
      "scehma": arr
    }
    console.log(data)
    const webhookURL = ''
    try {
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Data sent successfully!");
      } else {
        console.error("Failed to send data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const list = () => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <nav style={{ height: "40px", padding: "10px", backgroundColor: "#33FFD7", display: "flex", justifyContent: "flex-start", alignItems: "center", color: "#ffffff", fontWeight: "600", fontSize: "18px" }}>
          <FontAwesomeIcon icon={faAngleLeft} style={{ padding: "10px", fontSize: "18px" }} />
          <h1>Saving Segment</h1>
        </nav>
        <h1 className='nameSegment'>Enter the Name of the segment</h1>
        <input className='nameInput' type='text' placeholder='Name of the segment' onChange={(event) => { SegmentName(event.target.value) }} />
        <p className='des'>To Save your segment, you need to add the sechemes to build the query</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "10px" }}>
          <FontAwesomeIcon icon={faCircle} style={{ color: "green", padding: "10px" }} />
          <p>- user track</p>
          <FontAwesomeIcon icon={faCircle} style={{ color: "red", padding: "10px" }} />
          <p>- group track</p>
        </div>
        <div style={{ border: "2px solid blue", margin: "10px", padding: "10px" }}>
          {dropdown?.map(e => <div style={{ display: "flex", alignItems: "center", width: "95%" }}><FontAwesomeIcon icon={faCircle} style={{ color: e.color, padding: "10px" }} />
            <select className='nameInput'>
              <option value={e.value}>{e.label}</option>
              {showndropDown.map(each => <option value={each.value}>{each.label}</option>)}
            </select>
            <FontAwesomeIcon icon={faMinus} style={{ color: "grey", padding: "10px", backgroundColor: "#E5F2F0" }} onClick={() => remove(e.value)} />
          </div>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "90%", margin: "10px" }}>
          <FontAwesomeIcon icon={faCircle} style={{ color: "gray", padding: "10px" }} />
          <select className='nameInput' onChange={(e) => selected(e.target.value)}>
            {dropDownArr?.map(each => <option value={each.value}>{each.label}</option>)}
          </select>
          <FontAwesomeIcon icon={faMinus} style={{ color: "grey", padding: "10px", backgroundColor: "#E5F2F0" }} />
        </div>
        <div>
          <button onClick={() => Add()} style={{ backgroundColor: "transparent", border: "none", textDecoration: "underline", color: "blue", margin: "10px", fontSize: "16px" }}> + Add new schema</button>
        </div>
      </div>
      <div style={{ backgroundColor: "#ECF5F4", margin: "10px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        <Button variant="contained" onClick={saveSegment}>Save the Segment</Button>
        <Button variant="contained" color="error" onClick={cancel}> Cancel </Button>
      </div>

    </Box>
  );
  return (
    <div className="App">

      <nav style={{ height: "40px", padding: "10px", backgroundColor: "#33FFD7", display: "flex", justifyContent: "flex-start", alignItems: "center", color: "#ffffff", fontWeight: "600" }}>
        <FontAwesomeIcon icon={faAngleLeft} style={{ padding: "10px", fontSize: "18px" }} />
        <h1>Veiw Audience</h1>
      </nav>
      <React.Fragment key="right">
        <button style={{ margin: "20px", backgroundColor: "transparent", border: "2px solid #E5F2F0", borderRadius: "10px", height: "30px", width: "150px" }} onClick={toggleDrawer(true)}>Save Segment</button>
        <Drawer
          anchor="right"
          open={state}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default App;

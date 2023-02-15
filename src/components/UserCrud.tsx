import axios from "axios";
import React from "react";
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
export {};
type User = {
    id: string;
    Name: string;
    Country: string;
    AnnualIncome: number;
    EmailIdLists: Array<string>;
};
 
function UserCrud() {
 
const [id, setId] = React.useState<string>("");
const [Name, setName] = React.useState<string>("");
const [Country, setCountry] = React.useState<string>("");
const [AnnualIncome, setAnnualIncome] = React.useState<number>(0);
const [EmailIdLists,setEmailIdlists] = React.useState<Array<string>>([]);
const [Users, setUsers] = React.useState<Array<User>>([]);
  React.useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {
    
    const result = await axios.get("https://localhost:7205/api/User");
    setUsers(result.data);
    console.log(result.data);
  }
  async function save(event :React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7205/api/User", {
        
        Name: Name,
        Country: Country,
        AnnualIncome: AnnualIncome,
        EmailIdLists : EmailIdLists,
      
      });
      alert("Student Registation Successfully");
          setId("");
          setName("");
          setCountry("");
          setAnnualIncome(0);
          setEmailIdlists([]);
      
    
      Load();
    } catch (err) {
      alert(err);
    }
  }
 
  async function editUser(user: User ) {
    setId(user.id);
    setName(user.Name);
    setCountry(user.Country);
    setAnnualIncome(user.AnnualIncome);
    setEmailIdlists(user.EmailIdLists);
  }
 
  async function DeleteUser(id :string) {
  await axios.delete("https://localhost:7205/api/User/" + id);
   alert("User deleted Successfully");
   setId("");
   setName("");
   setCountry("");
   setAnnualIncome(0);
   setEmailIdlists([]);
   Load();
  }
 
  async function update(event:React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
 
  await axios.patch('https://jsonplaceholder.typicode.com/posts/1',
 
 
        {
        id: id,
        Name: Name,
        Country: Country,
        AnnualIncome: AnnualIncome,
        EmailIdLists: EmailIdLists,

 
        }
      );
      alert("Registation Updateddddd");
      setId("");
      setName("");
      setCountry("");
      setAnnualIncome(0);
      setEmailIdlists([]);
    
      Load();
    } catch (err) {
      alert(err);
    }
  }
 
    return (
      <div>
        <h1>User Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
          
            <input
              type="text"
              className="form-control"
              id="_id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
 
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              value={Name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              className="form-control"
              id="Country"
              value={Country}

              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Annual Income</label>
            <input
              type="number"
              className="form-control"
              id="AnnualIncome"
              value={AnnualIncome}

              onChange={(event) => {
                setAnnualIncome(event.target.valueAsNumber);
              }}
            />
          </div>
          <div className="form-group">
            <label>EmailIdLists</label>
            <input
              type="text" 
              className="form-control"
              id="EmailIdLists"
              value={EmailIdLists}

              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
 
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">User Name</th>
            <th scope="col">Country</th>
            <th scope="col">AnnualIncome</th>
            <th scope="col">EmailIdLists</th>
        
            <th scope="col">Option</th>
          </tr>
        </thead>
        {Users.map(function fn(user:User) {
          return (
            <tbody>
              <tr>
                <th scope="row">{user.id} </th>
                <td>{user.Name}</td>
                <td>{user.Country}</td>
                <td>{user.AnnualIncome}</td>
                <td>{user.EmailIdLists}</td>
                
                
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => DeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  export default UserCrud;
  
  
  
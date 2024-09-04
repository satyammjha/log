import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/details');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}
      className="d-flex flex-column justify-content-center align-items-center vh-100"
    >
      <h1 style={{ backgroundColor: "#FFF", color: 'black', fontWeight: 'bold', padding: "6px", borderRadius: "3px" }}>User Details</h1>

      <div className="d-flex flex-wrap justify-content-center pointer">
        {data.length > 0 ? (
          data.map((d) => (
            <div className="card m-3" style={{ width: "18rem" }} key={d.id || d._id}>
              <div className="card-body">
                <div className="p-4 border rounded shadow-md">
                  <div className="mb-4">
                    <h5 className="card-title">Name: {d.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Contact: {d.contact}</h6>
                    <p className="card-text">Email: {d.email}</p>
                  </div>
                  <img
                    src={d.image}
                    alt={`${d.name}'s Image`}
                    className="img-fluid"
                    style={{ maxWidth: "10vw", borderRadius: "8px" }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No user details found</p>
        )}
      </div>

      <Link to="/login" className="btn btn-light my-5 px-5">Logout</Link>
    </div>
  );
};

export default Home;
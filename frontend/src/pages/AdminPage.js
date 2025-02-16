import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminPage.css';
import Logo from '../components/Hill Track Logo.png';

const AdminPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/driverinfo/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const downloadCSV = () => {
    const csvContent = [
      ['First Name', 'Last Name', 'Contact', 'Vehicle No.', 'Parcel Qty', 'Notes', 'Signature'],
      ...data.map(item => [
        item.first_name,
        item.last_name,
        item.contact,
        item.vehicle_no,
        item.parcel_qty,
        item.notes,
        item.signature
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-page">
      <div className="header">
        <Link to="/">
          <img src={Logo} alt="HillTrack by HDG" className="logo" />
        </Link>
        <h1 className="title">Administrator Dashboard</h1>
        <button className="download-button" onClick={downloadCSV}>Download CSV</button>
      </div>
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact</th>
              <th>Vehicle No.</th>
              <th>Parcel Qty</th>
              <th>Notes</th>
              <th>Signature</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  <td className="custom-cell">{row.first_name}</td>
                  <td className="custom-cell">{row.last_name}</td>
                  <td className="custom-cell">{row.contact}</td>
                  <td className="custom-cell">{row.vehicle_no}</td>
                  <td className="custom-cell">{row.parcel_qty}</td>
                  <td className="custom-cell">{row.notes}</td>
                  <td className="custom-cell"><img src={row.signature} alt="Signature" style={{ width: '100px' }} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="custom-cell">No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;

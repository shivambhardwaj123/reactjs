import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';

function App() {
  const [tableData, setTableData] = useState(null);

  const handleFileUpload = (data) => {
    // Process CSV data
    const updatedTableData = data.map((row) => {
      console.log('Row Data:', row);
      
      // Initialize counts
      let uCount = 0;
      let hCount = 0;
      let pCount = 0;
      let sCount = 0;
      
      // Loop through keys to count U, H, P, S
      Object.keys(row).forEach((key) => {
        if (row[key] === 'U') uCount++;
        if (row[key] === 'H') hCount++;
        if (row[key] === 'P') pCount++;
        if (row[key] === 'S') sCount++;
      });
      
      // Return the modified row with U, H, P, S counts
      return {
        ...row,
        U: uCount,
        H: hCount,
        P: pCount,
        S: sCount,
      };
    });

    // Update state with table data
    setTableData(updatedTableData);
  };

  return (
    <div>
      <h1>CSV File Upload and Display</h1>
      <CSVReader
        onFileLoaded={handleFileUpload}
        parserOptions={{ header: true }}
      />
      <hr />
    
      {tableData && (
        <table border="1">
          <thead>
            <tr>
              <th>Names</th>
              <th>Company</th>
              <th>Location</th>
              <th>Unplanned Leave(U)</th>
              <th>Holiday(H)</th>
              <th>Planned Leave(P)</th>
              <th>Sick Leave(S)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.Names}</td>
                <td>{row.Company}</td>
                <td>{row.Location}</td>
                <td>{row.U}</td>
                <td>{row.H}</td>
                <td>{row.P}</td>
                <td>{row.S}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
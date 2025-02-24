// // import logo from './logo.webp';
// import "./App.css";

// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     group: "", // Thay 'gender' thành 'group'
//     numberOfPeople: "", // Thay 'numberOfGuests' thành 'numberOfPeople'
//     attendingDinner: "", // Thay 'attendingParty' thành 'attendingDinner'
//     attending: false, // Thay 'willAttend' thành 'attending'
//   });

//   // Hàm xử lý sự kiện khi form thay đổi
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSend = {
//       ...formData,
//       numberOfPeople: Number(formData.numberOfPeople),
//     };
//     try {
//       const response = await axios.post(
//         "http://localhost:5003/api/confirmInvitation",
//         dataToSend
//       );

//       console.log(response.data);
//       alert("Lời mời đã được gửi thành công!");
//     } catch (error) {
//       console.error("Lỗi khi gửi lời mời:", error);
//       alert("Có lỗi xảy ra khi gửi lời mời");
//     }
//   };

//   return (
//     <div>
//       <h1>Form Lời Mời</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Tên:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Nhà Gái / Nhà Trai:</label>
//           <select
//             name="group"
//             value={formData.group}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Chọn</option>
//             <option value="Nhà Gái">Nhà Gái</option>
//             <option value="Nhà Trai">Nhà Trai</option>
//             <option value="None">Không</option>
//           </select>
//         </div>
//         <div>
//           <label>Số Người Tham Dự:</label>
//           <input
//             type="number"
//             name="numberOfPeople"
//             value={formData.numberOfPeople}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Tham Dự Tiệc Gì:</label>
//           <input
//             type="text"
//             name="attendingDinner"
//             value={formData.attendingDinner}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Tham Gia Không?</label>
//           <input
//             type="checkbox"
//             name="attending"
//             checked={formData.attending}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Xác Nhận</button>
//       </form>
//     </div>
//   );
// };

// export default App;
import { BrowserRouter } from "react-router-dom";
import Router from "./routers/Router.jsx";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5003/api"; // Sử dụng URL từ file .env nếu có
function App() {
  return (
    <div className="App">
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/icon1.png";

export default function Contacts({ teacherContacts, studentContacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array means this effect runs once after the initial render

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    console.log(index);
    console.log(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Mentor Mingle</h3>
          </div>
          <div className="contacts">
            {teacherContacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      margin-bottom: 0px;
      letter-spacing: 1px;
      font-size: 1.5em;
      font-weight: bold;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          margin-bottom: 0;
          text-transform: none;
          letter-spacing: 0.5px;
          font-size: 1.3em;
        }
      }
    }
    .selected {
      // background-color: #9a86f3;
      background-color: #accffe;
      .username{
        h3{
          color: black;
        }
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
        font-size: 1.5em;
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;


// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Logo from "../assets/icon1.png";

// export default function Contacts({ teachingContacts, enrolledContacts, changeChat }) {
//   const [currentUserName, setCurrentUserName] = useState(undefined);
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
//   const [currentSelected, setCurrentSelected] = useState(undefined);
//   const [selectedCategory, setSelectedCategory] = useState("teaching");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await JSON.parse(sessionStorage.getItem("user"));
//         setCurrentUserName(data.username);
//         setCurrentUserImage(data.avatarImage);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, []); // The empty dependency array means this effect runs once after the initial render

//   const changeCurrentChat = (index, contact) => {
//     setCurrentSelected(index);
//     changeChat(contact);
//     console.log(index);
//     console.log(contact);
//   };

//   return (
//     <>
//       {currentUserImage && currentUserImage && (
//         <Container>
//           <div className="brand">
//             <img src={Logo} alt="logo" />
//             <h3>Mentor Mingle</h3>
//           </div>
//           <div className="contacts">
//             {/* Add the dropdown list to switch between "Teaching" and "Enrolled" */}
//             <div className="dropdown">
//               <label htmlFor="categoryDropdown">Select Category:</label>
//               <select
//                 id="categoryDropdown"
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 value={selectedCategory}
//               >
//                 <option value="teaching">Teaching</option>
//                 <option value="enrolled">Enrolled</option>
//               </select>
//             </div>

//             {/* Display contacts based on the selected category */}
//             {selectedCategory === "teaching" ? (
//               teachingContacts.map((contact, index) => (
//                 <div
//                   key={contact._id}
//                   className={`contact ${
//                     index === currentSelected ? "selected" : ""
//                   }`}
//                   onClick={() => changeCurrentChat(index, contact)}
//                 >
//                   <div className="avatar">
//                     <img
//                       src={`data:image/svg+xml;base64,${contact.avatarImage}`}
//                       alt=""
//                     />
//                   </div>
//                   <div className="username">
//                     <h3>{contact.username}</h3>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               enrolledContacts.map((contact, index) => (
//                 <div
//                   key={contact._id}
//                   className={`contact ${
//                     index === currentSelected ? "selected" : ""
//                   }`}
//                   onClick={() => changeCurrentChat(index, contact)}
//                 >
//                   <div className="avatar">
//                     <img
//                       src={`data:image/svg+xml;base64,${contact.avatarImage}`}
//                       alt=""
//                     />
//                   </div>
//                   <div className="username">
//                     <h3>{contact.username}</h3>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//           <div className="current-user">
//             <div className="avatar">
//               <img
//                 src={`data:image/svg+xml;base64,${currentUserImage}`}
//                 alt="avatar"
//               />
//             </div>
//             <div className="username">
//               <h2>{currentUserName}</h2>
//             </div>
//           </div>
//         </Container>
//       )}
//     </>
//   );
// }


// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 75% 15%;
//   overflow: hidden;
//   background-color: #080420;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 2rem;
//     }
//     h3 {
//       color: white;
//       text-transform: uppercase;
//       margin-bottom: 0px;
//       letter-spacing: 1px;
//       font-size: 1.5em;
//       font-weight: bold;
//     }
//   }
//   .contacts {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     gap: 0.8rem;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .contact {
//       background-color: #ffffff34;
//       min-height: 5rem;
//       cursor: pointer;
//       width: 90%;
//       border-radius: 0.2rem;
//       padding: 0.4rem;
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//           margin-bottom: 0;
//           text-transform: none;
//           letter-spacing: 0.5px;
//           font-size: 1.3em;
//         }
//       }
//     }
//     .selected {
//       // background-color: #9a86f3;
//       background-color: #accffe;
//       .username{
//         h3{
//           color: black;
//         }
//       }
//     }
//   }

//   .current-user {
//     background-color: #0d0d30;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 2rem;
//     .avatar {
//       img {
//         height: 4rem;
//         max-inline-size: 100%;
//       }
//     }
//     .username {
//       h2 {
//         color: white;
//         font-size: 1.5em;
//         font-weight: bold;
//         letter-spacing: 1px;
//       }
//     }
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       gap: 0.5rem;
//       .username {
//         h2 {
//           font-size: 1rem;
//         }
//       }
//     }
//   }
//   .dropdown {
//     margin-bottom: 1rem;
//     label {
//       color: white;
//       font-size: 1.2em;
//       margin-right: 0.5rem;
//     }
//     select {
//       padding: 0.5rem;
//       font-size: 1em;
//       border-radius: 0.2rem;
//     }
//   }
// `;
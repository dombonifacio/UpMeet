import axios, { AxiosError } from "axios";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

export const TestPage = () => {
 
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const handleImageUpload = (event: any) => {
    if (selectedImage) {
      // create form data
      const formData = new FormData();

      // cloudinary key
      formData.append("upload_preset", "mystorage");
      // upload to a specific folder
      formData.append("folder", "JamCon");
      formData.append("file", selectedImage);

      // call API for cloudinary
      axios
        .post("https://api.cloudinary.com/v1_1/dpj2su9ea/upload", formData)
        .then((res: AxiosResponse) => {
          console.log(res.data);
          setUploadedImage(res.data.url);
        })
        .catch((error: AxiosError) => {
          console.log("error", error);
        });
    }
    {
      console.log("Loading...");
    }
  };

  return (
    <div>
      <input
        onChange={(event) => setSelectedImage(event.target.files[0])}
        type="file"
      />
      <button onClick={handleImageUpload}>Submit</button>
      {uploadedImage ? <img src={uploadedImage} /> : ""}
    </div>
  );
};



 // return (
  //   <>
  //     {/* <ProfileHeader /> */}
  //     <div className="mx-auto max-w-[1260px] flex justify-center md:h-screen md:w-screen md:items-center">
  //       <div className="flex flex-row">
  //         <div className="flex flex-row p-8">
  //           <div className="p-3 ">
  //             {selectedImage && (
  //               <button
  //                 className="text-white text-4xl font-bold"
  //                 onClick={handleImageUpload}
  //               >
  //                 Save
  //               </button>
  //             )}
  //           </div>

  //           <div className="pt-10 text-[20px] text-purple-300 mt-8">
  //             <div></div>

  //             <div className="relative">
  //               <div className="absolute h-full w-full flex items-end justify-center bg-gradient-to-t from-black">
  //                 <p className="text-slate-300 font-semibold text-xl top-0 left-0 mb-2">
  //                   Edit Picture
  //                 </p>
  //               </div>
  //             </div>
  //             {user.image ? (
  //               <div className="relative group">
  //                 <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
  //                   <p className="hidden group-hover:block text-slate-300 font-semibold text-xl mb-2">
  //                     Edit Picture
  //                   </p>
  //                 </div>
  //                 <input
  //                   type="file"
  //                   id="fileInput"
  //                   className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
  //                   onChange={handleImageChange}
  //                 />
  //                 <label
  //                   htmlFor="fileInput"
  //                   className="block w-full h-full cursor-pointer"
  //                   style={{ cursor: "pointer" }}
  //                 >
  //                   <img
  //                     src={
  //                       selectedImage
  //                         ? URL.createObjectURL(selectedImage as Blob)
  //                         : user?.image
  //                     }
  //                     alt="User Image"
  //                     className="w-full h-full object-cover z-10"
  //                   />
  //                 </label>
  //               </div>
  //             ) : (
  //               <>
  //                 <input
  //                   type="file"
  //                   id="fileInput"
  //                   className="hidden"
  //                   onChange={handleImageChange}
  //                 />
  //                 {/* Image icon as a label for the file input */}
  //                 <label
  //                   htmlFor="fileInput"
  //                   className="cursor-pointer block w-full h-full"
  //                 >
  //                   {selectedImage ? (
  //                     <img
  //                       src={URL.createObjectURL(selectedImage as Blob)}
  //                       alt="Selected Image"
  //                     />
  //                   ) : (
  //                     <img
  //                       className="rounded-full"
  //                       src={camera}
  //                       alt="Camera Icon"
  //                     />
  //                   )}
  //                 </label>
  //               </>
  //             )}

  //             {/* <p> Name: </p> <p>{user?.name}</p>
  //             <p> Age: </p> <p>{user?.age}</p>
  //             <p> Country: </p> <p>{user?.country}</p> */}
  //           </div>
  //         </div>

  //         {/* <div>
  //           <p> Number of events:</p>
  //           <p></p>
  //       </div> */}
  //       </div>
  //     </div>
  //   </>
  // );
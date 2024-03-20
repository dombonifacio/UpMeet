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
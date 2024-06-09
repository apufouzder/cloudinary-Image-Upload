
import { useState } from 'react'
import { uploadCloudinary } from './upload';


function App() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)

  const { name, setName } = useState("")
  const { price, setPrice } = useState("")



  const handleChanges = async (e) => {
    try {
      const files = Array.from(e.target.files); // Convert FileList to an array
      setLoading(true);
      let arr = [];

      // Upload each file to Cloudinary
      for (let i = 0; i < files.length; i++) {
        const data = await uploadCloudinary(files[i]);
        arr.push(data);
      }
      console.log(files);
      // Update the links state with the URLs of the uploaded images
      setLinks(prevLinks => [...prevLinks, ...arr]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      price,
      images: links
    }
    console.log(JSON.stringify(data));
  }
  console.log(import.meta.env.CLOUD_UPLOAD_PRESET);

  return (
    <>
      <form onSubmit={handleSubmit} className='w-1/3 mx-auto mt-10 bg-slate-300 shadow rounded-md p-5'>
        <input type="file"
          multiple
          onChange={handleChanges}
          className='p-5 w-full'
        />
        <input className='my-2 ' onChange={(e) => setName(e.target.value)} type="text" name='name' placeholder='name' /> <br />
        <input className='my-2 ' onChange={(e) => setPrice(e.target.value)} type="text" name='price' placeholder='price' />
        <br />
        <div className='flex items-center gap-2'>
        {links && links.map(link =>
          <>

            <img className='w-14' src={link.url} alt="" />

          </>
        )}
      </div>
      <button type='submit' className='btn bg-purple-500 p-2 rounded-lg'>{loading ? "Uploading.." : "Upload"}</button>
    </form >
    </>
  )
}

export default App

import { useState } from "react"

export const Qrcode = () => {
   const [img,setimg] = useState("")
   const [loading,setloading] = useState(false)
   const [qrdata,setqrdata] = useState("")
   const [qrsize,setqrsize] = useState("")

   async function generateQR(){
    setloading(true)
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
      setimg(url)
    }catch(error){
      console.error("Error generating QR code",error);
    }finally{
      setloading(false)
    }
    
   }
   function downloadQR(){
     fetch(img).then((Response)=>Response.blob()).then((blob)=>{
      const link = document.createElement("a")
      link.href=URL.createObjectURL(blob)
      link.download="qrcode.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
     }).catch((error)=>{
      console.error("Error downloading QR code",error)
     })
  }
   return (     
     <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} className="qr-codeimg" />}
        <div>
            <label htmlFor="datainput" className="input-label">
                Data for QR code:</label>
            <input type="text" value={qrdata} id="datainput" placeholder="Enter data for Qrcode" onChange={(e)=>setqrdata(e.target.value)}></input>
            <label htmlFor="sizeinput" className="input-label">
                Image size(e.g.,150)</label>
            <input type="text" value={qrsize} id="sizeinput" placeholder="Enter image size" onChange={(e)=>setqrsize(e.target.value)}></input>
            <button className="generate-btn" disabled={loading}  onClick={generateQR}>Generate QR code</button>        
            <button className="download-btn" onClick={downloadQR}>Download QR code</button>
        </div>
        <p className="footer">
              Designed by <a href="">Mani kandan</a></p> 
    </div>
  )
}


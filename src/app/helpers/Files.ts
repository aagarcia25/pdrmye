import { CatalogosServices } from "../services/catalogosServices";

export function base64ToArrayBuffer(data: string) {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
        var ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
};

export function dowloandfile(obj: any){
    CatalogosServices.obtenerDoc(obj).then((res) => {
        var bufferArray = base64ToArrayBuffer( String(res.RESPONSE.RESPONSE.FILE) );
        var blobStore = new Blob([bufferArray], { type: "application/pdf" });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = data;
        link.download = obj.NOMBRE;
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();
      });
}



// export function uploadfilevideo(obj: any){
//     let data ="";
//     const formData = new FormData();

//     formData.append("CHID", data.id);
//     formData.append("NUMOPERACION", modo === "editar" ? "2" : "1");
//     formData.append("VIDEO", newDoc);
//     formData.append("IDSOLICITUD", modo === "editar" ? String(data.id) : res.RESPONSE);
//     formData.append("COMENTARIO", modo === "editar" ? "Edicion de archivo" : "carga de archivo");
//     CatalogosServices.SaveVideoTutorial(obj).then((res) => {
//     var bufferArray = base64ToArrayBuffer( String(res.RESPONSE.RESPONSE.FILE) );
//     console.log(res.RESPONSE.RESPONSE.FILE)
//     var blobStore = new Blob([bufferArray], { type: "video/mp4" });
//     data = window.URL.createObjectURL(blobStore);
//     console.log(data)
   
//   });
//   return data;
// }
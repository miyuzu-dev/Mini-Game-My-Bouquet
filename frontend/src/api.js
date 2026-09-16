export async function fetchLetter(base,key,expectedId,signal){
 const response=await fetch(`${base.replace(/\/$/,'')}/api/letters/${key}`,{signal});
 if(!response.ok)throw new Error('Chưa lấy được lá thư. Máy chủ có thể đang khởi động; bạn thử lại sau một chút nhé.');
 const letter=await response.json();
 if(!letter||letter.id!==expectedId||typeof letter.text!=='string')throw new Error('Không tìm thấy lá thư cho bó hoa này.');
 return letter;
}

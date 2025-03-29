export const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString); 
    const day = date.getUTCDate().toString().padStart(2, '0'); 
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getUTCFullYear(); 
    const hours = date.getUTCHours().toString().padStart(2, '0'); // Lấy giờ
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Lấy phút
    return `${day}-${month}-${year} ${hours}:${minutes}`; // Định dạng ngày/tháng/năm và giờ:phút
};
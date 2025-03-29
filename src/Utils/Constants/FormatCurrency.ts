export default function formatCurrencyVND(amount: any) {
    if (amount === undefined || amount === null) {
        return '0 ₫'; // Trả về giá trị mặc định nếu amount không hợp lệ
    }
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
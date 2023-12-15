import warningImage from "../assets/images/signal/warning.png";
import failImage from "../assets/images/signal/no-wifi.png";
import successImage from "../assets/images/signal/success.png";
import constructImage from "../assets/images/signal/under-construction.png"

export const infoData = [
    {
        type: 'upload-success',
        title_EN: 'Success!!!',
        desc_EN: 'Data upload completed!!!',
        title_VN: 'Success!!!',
        desc_VN: 'Dữ liệu cập nhập thành công!!!',
        thumb: successImage
    },
    {
        type: 'error',
        title_EN: 'Error!!!',
        desc_EN: 'Update failed! Please try again later!!!',
        title_VN: 'Error!!!',
        desc_VN: 'Cập nhập thất bại! Vui lòng thử lại sau!!!',
        thumb: warningImage
    },
    {
        type: 'not-found',
        title_EN: 'Warning!!!',
        desc_EN: 'Requested data not found!!!',
        title_VN: 'Cảnh báo!!!',
        desc_VN: 'Không tìm thấy dữ liệu theo yêu cầu!!!',
        thumb: warningImage
    },
    {
        type: 'connect-failed',
        title_EN: 'Connection Failed!!!',
        title_VN: 'Connection Failed!!!',
        desc_EN: 'Please check again your Internet connection and try again later!',
        desc_VN: 'Vui lòng kiểm tra kết nối Internet và thử lại sau!',
        thumb: failImage
    },
    {
        type: 'upload-img-failed',
        title_EN: 'Error!!!',
        desc_EN: 'Upload image failed!!!',
        title_VN: 'Error!!!',
        desc_VN: 'Upload ảnh thất bại!!!',
        thumb: warningImage
    },
    {
        type: 'qr-error',
        title_EN: 'Warning!!!',
        desc_EN: 'Invalid QR code!!!',
        title_VN: 'Cảnh báo!!!',
        desc_VN: 'Mã QR không hợp lệ!!!',
        thumb: warningImage
    },
    {
        type: 'under-construct',
        title_EN: 'Warning!!!',
        desc_EN: 'Services is under construction!',
        title_VN: 'Cảnh báo!!!',
        desc_VN: 'Dịch vụ đang được phát triển!',
        thumb: constructImage
    },
    {
        type: 'invalid_user',
        title_EN: 'Warning!!!',
        desc_EN: 'Invalid User ID!!!',
        title_VN: 'Cảnh báo!!!',
        desc_VN: 'Mã nhân viên không hợp lệ!!!',
        thumb: warningImage
    },
    {
        type: 'invalid_pass',
        title_EN: 'Warning!!!',
        desc_EN: 'Invalid Password!!!',
        title_VN: 'Cảnh báo!!!',
        desc_VN: 'Mật khẩu không hợp lệ!!!',
        thumb: warningImage
    },
    {
        type: 'invalid_warehouse',
        title_EN: 'Warning!!!',
        desc_EN: 'Invalid Warehouse!!!',
        title_VN: 'Cảnh báo!!!',
        desc_VN: 'Kho hàng không hợp lệ!!!',
        thumb: warningImage
    },
    {
        type: 'error_pass',
        title_EN: 'Warning!!!',
        desc_EN: 'Input old password is incorrect!!!',
        title_VN: 'Cảnh báo!!!',
        desc_VN: 'Mật khẩu cũ đã nhập không đúng!!!',
        thumb: warningImage
    },
];

export const validData = {
    OLD_PASS: {
        validate: true,
        messageEN: 'This field data is required',
        messageVN: 'Dữ liệu không được rỗng',
    },
    NEW_PASS: {
        validate: true,
        messageEN: 'The field data is required',
        messageVN: 'Dữ liệu không được rỗng',
    },
    CONFIRM_PASS: {
        validate: true,
        messageEN: 'The field data is required',
        messageVN: 'Dữ liệu không được rỗng',
    },
}
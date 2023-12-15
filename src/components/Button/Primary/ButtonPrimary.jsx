import "./ButtonPrimary.scss";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ButtonPrimary = ({ title, handleClick, type="", name="" }) => {
    return (
        <div className={name === "cancel" ? `btn-primary btn-warn` : `btn-primary`} onClick={handleClick} type={type}>
            <div className="btn-primary-bg" />
            <div className="btn-primary-title">
                {name === "scan" && <CameraAltOutlinedIcon /> }
                {name === "pass" && <LockOutlinedIcon /> }
                {name === "key" && <KeyboardDoubleArrowRightIcon /> }
                {name === "go-back" && <ArrowBackIcon /> }
                {title}
            </div>
        </div>
    );
}

export default ButtonPrimary;
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { commonAction } from '../../redux/commonSlice';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ModalNotice, ModalLoading } from '../Modal';

const Layout = ({ children }) => {

    ////// Open Side Menu Bar]
    const openNotice = useSelector(state => state.common.openNotice);
    const typeNotice = useSelector(state => state.common.typeNotice);
    const openLoad = useSelector(state => state.common.openLoad);
    
    ///// React-Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    ////// Handle Modal Notice
    const handleCloseNotice = () => {
        dispatch(commonAction.closeNotice());
    }

    ////// Handle Check User
    const handleCheck = () => {
        let _userData = JSON.parse(sessionStorage.getItem('userDataWH'));

        if(_userData === null){
            navigate("/log-in");
        }
    }

    useEffect(() => {
        handleCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
            <Header />
            <Box className="s-content">
                {children}
            </Box>
            <Footer />
            <ModalNotice 
                open={openNotice} 
                handleClose={handleCloseNotice}
                type={typeNotice} />
            <ModalLoading open={openLoad} />
        </>
    );
}

export default Layout;
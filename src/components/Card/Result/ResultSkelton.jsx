import { Box, Skeleton, Stack } from '@mui/material';

const ResultSkelton = () => {
    return (
        <>
            <Box>
                <Stack flexDirection="row" gap={1}>
                    <Skeleton animation="wave" variant="circular" width={60} height={50} />
                    <Stack sx={{width: "100%"}} gap={1}>
                        <Skeleton animation="wave"variant="rounded" height={25} />
                        <Skeleton animation="wave" variant="rounded" height={50} />
                        <Skeleton animation="wave" variant="rounded" width={200} height={40} />
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default ResultSkelton;
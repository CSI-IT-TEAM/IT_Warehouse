export const isNullOrEmpty = (value) => {
    if(value === null || value === ""){
        return true;
    }else{
        return false;
    }
}

export const getDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let ymd = date.getFullYear().toString() + ((month > 9 ? '' : '0') + month).toString() + ((day > 9 ? '' : '0') + day).toString();

    return ymd;
}

export const getDateFormat = (date) => {
    if(isNullOrEmpty(date)) return "";
    return date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
}

//////// Get Image Base-64
export const arrayBufferToBase64 = (buffer) => {
    var base64Flag = 'data:image/jpeg;base64,';
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    
    return base64Flag + window.btoa(binary);
};

export const formatUserName = (name) => {
    const arr = name.split(' ');
    return arr[arr.length - 2].trim() + ' ' + arr[arr.length - 1].trim();
}

//////Cancel Fetch API After Timeout
const Timeout = (time) => {
    let controller = new AbortController();
    setTimeout(() => controller.abort(), time * 1000);
    return controller;
};

export const fetchData = async (url, dataConfig) => {
    try {
        const response = await fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataConfig),
                    signal: Timeout(5).signal,
                });

        if(response.ok){
            const json = await response.json();
            return json;
        }
        else{
            return false;
        }
    } catch (error) {
        return false;
    }
};

export const submitForm = (result) => {
    // Pretend it's hitting the network.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (result) {
                resolve();
            } else {
                reject();
            }
        }, 2000);
    });
}
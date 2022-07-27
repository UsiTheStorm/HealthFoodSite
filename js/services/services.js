const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: data,
    });

    const resX = await res.json();
    return resX;
};

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Couldn't Fetch ${url}, status ${res.status}`);
    }
    const resX = await res.json();
    return resX;
};

export { postData, getResource };

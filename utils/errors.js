let errorResponse = (error) => {
    let response = {
        ok: false,
        error: error
    };
    return response;
}

module.exports = {
    errorResponse: errorResponse
};
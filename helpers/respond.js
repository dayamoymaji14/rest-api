// The response should be in a constant structure
const respond = (res, statusCode, msg, data) => {
    const responseData = {
        code: statusCode == 200 ? 0 : statusCode,
        msg: msg,
        records: data || []
    };

    return res.status(statusCode).json(responseData);
};

module.exports = respond;
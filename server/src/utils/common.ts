export const getResponse = (errors: Array<string>, data: any, success = true) => {
    if (errors.length) {
        return {
            success: false,
            errors,
        };
    }

    return {
        success,
        body: data,
        errors: [] as Array<string>,
    };
};

module.exports = {
    getResponse,
};

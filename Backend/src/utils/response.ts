export const successResponse = (res: any, data: any, message = 'Success') => {
    res.status(Number(200)).json({ message, data });
};

export const errorResponse = (res: any, message = 'Error', code = 500) => {
    res.status(Number(code)).json({ message });
};

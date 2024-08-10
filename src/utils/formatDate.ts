// export const formatDate = (dateString: string) => {
//     const date = new Date(dateString)

//     if (isNaN(date.getTime())) {
//         return "Link sem tempo de expiração"
//     }

//     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
//     return date.toLocaleDateString(undefined, options)
// }

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Link sem tempo de expiração";
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
};
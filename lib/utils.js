// this function will convert the createdAt to this format : May 2024

export function formatMemberSince(dateString){
    const date = new Date(dateString);
    const month = date.toLocaleString(dateString);
    const year = date.getFullYear()
    return `${month} ${year}`
}

// this function will convert the createdAt to this format : "may 15 2023"

export function formatPublishDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", {month : "long"});
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`
}
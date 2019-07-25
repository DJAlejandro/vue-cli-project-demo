export function date(data) {
    let d = new Date()
    d.setTime(data)
    let year = d.getFullYear()
    let month = String(d.getMonth() + 1).padStart(2, '0')
    let date = String(d.getDate()).padStart(2, '0')
    let hour = d.getHours()
    let minute = d.getMinutes()
    return `${year}-${month}-${date}  ${hour}:${minute}`;
}
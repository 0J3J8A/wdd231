const myInfo = new URLSearchParams(window.location.search);

document.querySelector("#results").innerHTML = `
<p>Appointment for: ${myInfo.get("first")} ${myInfo.get("last")} </p>
<p>Proxy: ${myInfo.get("ordinance")} ${myInfo.get("date")} in the ${myInfo.get("location")} Temple</p>
<p>Your Phone Number: ${myInfo.get("phone")}</p>
<p>Your Email: ${myInfo.get("email")}</p>
`
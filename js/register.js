const successRegistration=document.querySelector( ".success-register" )
const failedToRegister = document.querySelector(".failed-to-register")


// localStorage.clear()
let isRegister = false
const usersData = []
const usersInfo = JSON.parse(localStorage.getItem("usersInfo"))
// console.log(usersInfo) 
usersInfo ? usersData.push(...usersInfo) : null
// console.log(usersData)
document.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get("name") 
    const email = formData.get("email") 
    const password = formData.get("password")
    console.log(usersData)
    if ( usersData[0] ) {
        isRegister = usersData.every( userInfo => {
            if ( userInfo.email !== email ) {
                return true
            } else {
                return false
            }
        } )

        if ( isRegister ) {
            usersData.push( {
                "name" : name ,
                "email": email,
                "password" : password
            } )

            successRegistration.classList.add( "show" )
            setTimeout( () => {
                successRegistration.classList.remove( "show" )
            }, 3000)
        } else {
            failedToRegister.classList.add("show")
            setTimeout( () => {
                failedToRegister.classList.remove( "show" )
            }, 3000)
        }

    } else {
        usersData.push( {
            "name" : name ,
            "email": email,
            "password" : password
        } )

        successRegistration.classList.add("show")
        setTimeout( () => {
            successRegistration.classList.remove( "show" )
        }, 3000)
    }

    localStorage.setItem("usersInfo" , JSON.stringify( usersData ))
})
// localStorage.clear()

const failedToLogin = document.querySelector(".failed-to-login")
const logOut = document.querySelector( ".logout" )
const userNameEle = document.querySelector( ".user-name" )
const userEmailEle = document.querySelector( ".user-email" )
const userPasswordEle = document.querySelector( ".user-password" )

const usersInfo = JSON.parse(localStorage.getItem("usersInfo"))
// console.log( usersInfo ) 

const userName = sessionStorage.getItem("userName")
const userEmail = sessionStorage.getItem("userEmail")
const userPassword = sessionStorage.getItem("userPassword")

if ( userEmail ) {
    userNameEle.textContent = userName
    userEmailEle.textContent = userEmail
    userPasswordEle.textContent = userPassword
    
    logOut.addEventListener( "click", () => {
        sessionStorage.clear()
    })
}

document.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get("email") 
    const password = formData.get("password")
    if(usersInfo) {
        const isLogin = usersInfo.some(userInfo => {
            if(userInfo.email === email && userInfo.password === password) {
                // failedToLogin.classList.remove("show")
                return true
            } else {
                return false
            }
        })

        if ( isLogin ) {
            const userInfo =usersInfo.filter( user => {
                if ( user.email === email ) {
                    return user
                }
            })
            // console.log(userInfo)
            sessionStorage.setItem("userName" , userInfo[0].name)
            sessionStorage.setItem("userEmail" , email)
            sessionStorage.setItem("userPassword" , password)
            window.location.replace("profile.html")
        } else {
            failedToLogin.classList.add("show")
            setTimeout(() => {
                failedToLogin.classList.remove("show")
            }, 3000)
            // console.log("You can't login")
        }
    } else {
        // console.log("No Data")
        failedToLogin.classList.add("show")
        setTimeout(() => {
            failedToLogin.classList.remove("show")
        }, 3000)
    }

})

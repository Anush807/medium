import Auth from "../Component/Auth"
import Quote from "../Component/Quote"

function SignUp() {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <Auth type="signup"></Auth>
                </div>
                <div className="hidden lg:block">
                    <Quote></Quote>
                </div>
            </div>
        </div>
    )
}

export default SignUp

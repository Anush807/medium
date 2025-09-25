import Auth from "../Component/Auth"
import Quote from "../Component/Quote"

function SignIn() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin"></Auth>
        </div>
        <div className="invisible lg:visible">
          <Quote></Quote>
        </div>
      </div>
    </div>
  )
}

export default SignIn

import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { SignupInput } from "@anush_codes/medium-comman"
import axios from "axios"
import { BACKEND_URL } from "../config"

function Auth({ type }: { type: "signup" | "signin" }) {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/users/${type === "signup" ? "signup" : "signin"}`,
                postInputs
                , {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (error) {
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="text-sm  text-slate-400 mt-1.5">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "sign up" : "sign in"}
                            </Link>
                        </div>
                    </div>
                    <div>
                        {type === "signup" && (
                            <div>
                                <LabelledInput
                                    label="name"
                                    placeholder="Enter username"
                                    onChange={(e) => {
                                        setPostInputs(c => ({
                                            ...c,
                                            name: (e.target as HTMLInputElement).value
                                        }))
                                    }}
                                />
                            </div>
                        )}

                        <LabelledInput label="email" placeholder="Enter email" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                email: (e.target as HTMLInputElement).value
                            }))
                        }}></LabelledInput>

                        <LabelledInput label="password" type={"password"} placeholder="Enter password" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: (e.target as HTMLInputElement).value
                            }))
                        }}></LabelledInput>
                    </div>
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2 w-full mt-8 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={sendRequest}>{type === "signup" ? "Sign Up" : "Sign In"}</button>
                </div>
            </div>
        </div>
    )
}

interface labelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent) => void,
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: labelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}

export default Auth

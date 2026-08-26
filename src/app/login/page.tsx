"use client"
import { FormEvent, useState } from "react"
import Link from "next/link"

export default function LoginPage(){
    const[form, setForm]=useState({
        email:"",
        password:""
    });
    //errors
    const[errors,setErrors]=useState({
        email:"",
        password:""
    });

    //change  handling
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} =e.target;
        setForm((prev)=>({...prev,[name]:value}))
    }

    //form validation
    const validate=(values:typeof form)=>{
        const newErrors={email:"",password:""}

        if(!values.email){
            newErrors.email="Email is required"
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if(!values.password){
            newErrors.password="Password is required"
        }else if(values.password.length<8){
            newErrors.password="Password must be at least 8 characters long"
        }

        return newErrors;
    }

    //handlesubmit funcftion
    const handleSubmit=(e: React.FormEvent) => {
        e.preventDefault();
        const newErrors=validate(form)
        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
        if (hasErrors) return;
        console.log("Submitting:", form);

    }

    return(
        <div className="min-h-screen  flex items-center justify-center bg-pesa-cream px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 rounded-xl  bg-pesa-green flex items-center justify-center text-white font-bold text-xl font-bold">
                        P
                    </div>
                    <h1 className="text-lg font-semibold text-pesa-charcoal">
                        Welcome to PesaPro
                    </h1>
                    <p className="text-sm  text-pesa-slate  mt-1  text-center">
                        Sign in to manage your transfers
                    </p>
                </div>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-pesa-charcoal mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={`w-full rounded-lg border px-3  py-2 text-sm outline-none focus:ring-2 ${
                                errors.email
                                ?"border-red-400 focus:ring-red-400"
                                :"border-pesa-slate/30 focus:ring-pesa-green"
                            }`}

                        />
                        {errors.email &&(
                            <p className="text-xs  text-red-500 mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sn font-medium text-pesa-charcoal mb-1">
                            Password
                        </label>
                        <input
                            id="password" 
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="........."
                            className={`w-full rounded-lg border px-3 py-2  outline-none focus:ring-2 ${
                                errors.password
                                ? "border-red-400 focus:ring-red-400"
                                : "border-pesa-slate/30 focus:ring-pesa-green"
                            }`}
                        />
                        {errors.password &&(
                            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pesa-green hover:bg-pesa-green-dark  transition-colors text-white font-medium rounded-lg py-2.5 text-sm cursor-pointer"
                    >Login</button>
                </form>
                <p className="text-sm text-pesa-slate text-center mt-6">
                    Don&apos;t have an account? {" "}
                    <Link
                        href="/signup"
                        className="text-pesa-green font-medium hover:underline" 
                    >Sign up</Link>
                </p>
            </div>
        </div>
    )
}
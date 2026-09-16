"use client"
import { useState } from "react"
import Link from "next/link"

export default function SignupPage(){
    const [form,setForm]=useState({
        fullname:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    //errors
    const [errors,setErrors]=useState({
        fullname:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    //handle change
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setForm((prev)=>({...prev,[name]:value}));
    }
    //validate form valiues
    const validate=(values:typeof form)=>{
        const newErrors={
            fullname:"",
            email:"",
            password:"",
            confirmPassword:""
        };
        
        if(!values.fullname.trim()){
            newErrors.fullname="Full Name is required"
        }

        if(!values.email){
            newErrors.email="Email is required."
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            newErrors.email = "Enter a valid email address";
        }
        
        if(!values.password){
            newErrors.password="Password is required"
        }else if(values.password.length<8){
            newErrors.password="Password must be at least 8 characters"
        }

        if(!values.confirmPassword){
            newErrors.confirmPassword="Confirm your Password"
        }else if(values.confirmPassword !== values.password){
            newErrors.confirmPassword="Passwords Do not match"
        }

        return newErrors;
    }

    //handlesubmit function
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        const newErrors=validate(form);
        setErrors(newErrors)

        const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
        if (hasErrors) return;

        console.log("Creating account:", form);
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-pesa-cream px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-pesa-green flex items-center justify-center text-white font-bold text-xl mb-4">
                        P
                    </div>
                    <h1 className="text-lg font-semibold text-pesa-charcoal">Create your PesaPro account</h1>
                    <p className="text-sm text-pesa-slate mt-1 text-center"> Sign up to start sending money worldwide</p>
                </div>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-pesa-charcoal mb-1">
                            Full Name
                        </label>
                        <input 
                            id="fullname"
                            name="fullname"
                            type="text"
                            value={form.fullname}
                            onChange={handleChange}
                            placeholder="Doe John"
                            className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                                errors.fullname
                                ? "border-red-400 focus:ring-red-400"
                                : "border-pesa-slate/30  focus:ring-pesa-green"
                            }`}
                        />
                        {errors.fullname && (
                            <p className="text-xs text-red-500 mt-1">{errors.fullname}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-pesa-charcoal mb-1">
                            Email
                        </label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={form.email}
                            placeholder="your@example.com"
                            className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                                errors.email
                                ? "border-red-400 focus:ring-red-400"
                                : "border-pesa-slate/30 focus:ring-pesa-green"
                            }`}
                        />
                        {errors.email &&(
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-pesa-charcoal mb-1">
                            Password
                        </label>
                        <input 
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={form.password}
                            placeholder="........."
                            className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                                errors.password
                                ? "border-red-400 focus:ring-red-400"
                                : "border-pesa-slate/30 focus:ring-pesa-green"
                            }`}
                        />
                        {errors.password &&(
                            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirmPasword" className="block text-sm font-medium text-pesa-charcoal mb-1">
                            Confirm Password
                        </label>
                        <input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            onChange={handleChange}
                            value={form.confirmPassword}
                            placeholder="........"
                            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
                                errors.confirmPassword
                                ? "border-red-400 focus:ring-red-400"
                                : "border-pesa-slate/30 focus:ring-pesa-green"
                            }`}
                        />
                        {errors.confirmPassword &&(
                            <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pesa-green hover:bg-blue-900 transition-colors text-white font-medium rounded-lg py-2.5 text-sm cursor-pointer"
                    >Create Account</button>

                </form>
                <p className="text-sm text-pesa-slate text-center mt-6">
                    Already have an account? {" "}
                    <Link
                        href="/login"
                        className="text-pesa-green font-medium hover:underline hover:text-blue-900"
                    >Login</Link>
                </p>
            </div>
        </div>
    )
}
import React from 'react';
import classNames from 'classnames';
import styles from './Loader.module.css'
import { useForm } from 'react-hook-form';
import { SignInFormSchema, SignUpData, SignUpFormSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import PInput from '../shared/input';

const SignInSection = ({ className }: { className?: string }) => {



    /**
    * Form for the prompt for the code generation.
    * Zod used for validation.
    */
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        watch
    } = useForm<Pick<SignUpData, "email" | "password" | "remember_me">>({
        resolver: zodResolver(SignInFormSchema), // Apply the zodResolver
        mode: 'onChange', // Validate on change
    });

    return (

        <div>
            <p className="text-2xl text-gray-dark">Log In</p>
            <div className="w-full mt-6">
                <form>
                    <div >
                        <PInput
                            type="text"
                            placeholder="Enter your email"
                            error={errors.email}
                            name="email"
                            register={register}
                            label="Email"
                        />
                    </div>
                    <div className="mt-4">
                        <PInput
                            type="password"
                            placeholder="Enter a new password"
                            error={errors.password}
                            name="password"
                            register={register}
                            label="Password"
                            info="It must be a combination of minimum 8 letters, numbers, and symbols."
                        />
                    </div>
                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 disabled:text-lighttext disabled:border-lighttext text-gray-dark "
                            disabled={!isValid}
                        />
                        {isValid ? <label className="ml-2 block text-sm text-gray-dark">Remember me</label> : <label className="ml-2 block text-sm text-lighttext">Remember me</label>}
                    </div>
                    <button
                        type="submit"
                        className="mt-6 w-full min-h-12 disabled:bg-normal-gray text-white py-2 rounded-md shadow-sm font-medium bg-[#FC0808]"
                        disabled={!isValid}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
            <div className="flex items-center my-4">
                <div className="w-full h-px bg-dark-gray">
                </div>
                <p className=" w-full text-center text-gray-dark">OR</p>
                <div className="w-full h-px bg-dark-gray">

                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <button className="min-h-12 w-full bg-white text-black border border-darktext py-2 rounded-md shadow-sm font-medium hover:bg-gray-100 flex items-center justify-center">
                    <img src="/images/google-logo.svg" alt="Google" className="w-5 h-5 mr-2 text-gray-dark" />
                    Sign up with Google
                </button>
            </div>
        </div>

    );
};

export default SignInSection;

import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Loader.module.css'
import { useForm } from 'react-hook-form';
import { SignUpData, SignUpFormSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pin } from 'lucide-react';
import PInput from '../shared/input';

const SignUpSection = ({ className }: { className?: string }) => {

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
    } = useForm<SignUpData>({
        resolver: zodResolver(SignUpFormSchema), // Apply the zodResolver
        mode: 'onChange', // Validate on change
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    // Watch the input value
    const password = watch('password', '');
    const endSrc = password?.trim() === '' ? "/images/eye-icon.svg" : passwordVisible ? "/images/eye-icon-open.png" : "/images/eye-icon-active.svg"
    const passwordType = passwordVisible ? "text" : "password"
    const handlePasswordVisibility = () => {
        passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true)
    }


    return (

        <div className=" ">
            <p className="text-2xl text-white">Create an account</p>
            <form className="mt-6">
                <div className="grid grid-cols-2 gap-5">
                    <PInput
                        type="text"
                        placeholder="Enter your first name"
                        error={errors.first_name}
                        name="first_name"
                        register={register}
                        label="First Name"
                        textColor="text-white"
                    />
                    <PInput
                        type="text"
                        placeholder="Enter your last name"
                        error={errors.last_name}
                        name="last_name"
                        register={register}
                        label="Last Name"
                        textColor="text-white"
                    />
                </div>
                <div className="mt-4">
                    <PInput
                        type="text"
                        placeholder="Enter your email"
                        error={errors.email}
                        name="email"
                        register={register}
                        label="Email"
                        textColor="text-white"
                    />
                </div>
                <div className="mt-4">
                    <PInput
                        type={passwordType}
                        placeholder="Enter a new password"
                        error={errors.password}
                        name="password"
                        register={register}
                        label="Password"
                        info="It must be a combination of minimum 8 letters, numbers, and symbols."
                        endIconSrc={endSrc}
                        onEndIconClicked={handlePasswordVisibility}
                        textColor="text-white"
                    />
                </div>
                <div className="mt-4 flex items-center">
                    <input
                        type="checkbox"
                        className="h-4 w-4 disabled:text-lighttext disabled:border-lighttext text-gray-dark "
                        disabled={!isValid}
                        {...register("remember_me", {
                            required: true
                        })}
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

    );
};

export default SignUpSection;

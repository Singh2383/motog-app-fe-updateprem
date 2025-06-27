'use client';

import { Input } from '@/components/ui/input';
import axios, { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { useLoginPopup } from '@/hooks/use-login-popup';
import { toast } from 'sonner';
import DetailForm from './detail-form';

const Form = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const [regNum, setRegNum] = useState("");
  const token = useAuth(state => state.token);
  const showLogin = useLoginPopup(state => state.setShow);
  const [showDetailForm, setShowDetailForm] = useState(false);

  const verifyRegNo = async () => {
    if (!token) {
      console.log("login required");
      showLogin(true);
      return;
    }

    try {
      const result = await axios.post(
        `${baseUrl}/vehicle-verify`,
        { reg_no: regNum }, { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("verify result: ", result);
      if (result.status === 200) {
        toast.success("Car verified successfully!");
        setShowDetailForm(true);
        return;
      }
    } catch (err) {
      const e = err as AxiosError;
      console.error("error verifying reg no.:", e);
      if (e?.response?.status! >= 401)
        toast.error("Authentication Failed!");
      if (e.response?.status! >= 500) toast.error("Something Went Wrong!");
    }
  }

  return (
    <section className='relative z-10 w-full'>
      <div className='w-full max-w-3xl mx-auto bg-white rounded-xl [box-shadow:0_0_10px_rgba(0,0,0,0.3)] py-8 px-32'>
        <h2 className='text-3xl font-bold mb-6'>Enter your car Registration Number</h2>
        <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4 items-center max-w-xl'>
          <Input id='reg-no' onChange={(e) => setRegNum(e.target.value)} className='w-full !text-lg font-semibold py-6' placeholder='Enter your car number' required />
          <button
            className='max-w-48 w-full bg-sky-600 disabled:bg-neutral-500 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors'
            onClick={verifyRegNo}
            disabled={!regNum}
          >
            Sell My Car
          </button>
        </div>
      </div>
      {showDetailForm && <DetailForm reg_no={regNum} setShowDetailForm={setShowDetailForm}/>}
    </section>
  )
}


export default Form;
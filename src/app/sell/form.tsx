'use client';

import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
//
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/hooks/use-auth';
import { useLoginPopup } from '@/hooks/use-login-popup';
import { toast } from 'sonner';

const Form = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const [regNum, setRegNum] = useState("");
  const token = useAuth(state => state.token);
  const showLogin = useLoginPopup(state => state.setShow);
  const [showDetaiForm, setShowDetailForm] = useState(false);

  const verifyRegNo = async () => {
    if (!token) {
      console.log("login required");
      showLogin(true);
      return;
    }

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

    if (result.status === 401) {
      toast.info("Please login again!");
    }

  }

  return (
    <section className='relative z-10 w-full'>
      <div className='w-full max-w-3xl mx-auto bg-white rounded-xl [box-shadow:0_0_10px_rgba(0,0,0,0.3)] py-8 px-32'>
        <h2 className='text-3xl font-bold mb-6'>Enter your car Registration Number</h2>
        <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4 items-center max-w-xl'>
          <Input id='reg-no' onChange={(e) => setRegNum(e.target.value)} className='w-full !text-lg font-semibold py-6' placeholder='Enter your car number' required/>
          <button
            className='max-w-48 w-full bg-sky-600 disabled:bg-neutral-500 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors'
            onClick={verifyRegNo}
            disabled={!regNum}
          >
            Sell My Car
          </button>
        </div>
      </div>
      <DetailForm show={showDetaiForm} setShow={setShowDetailForm} />
    </section>
  )
}

const DetailForm = ({ show, setShow }: { show: boolean; setShow: Dispatch<SetStateAction<boolean>> }) => {

  return (
    <Dialog open={show} onOpenChange={(b) => setShow(b)}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Provide the following details</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Kilometers Driven</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Price</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Seller Phone</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Primary Image</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default Form;